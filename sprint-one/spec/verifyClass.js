/* HELPER FUNCTIONS */
var extractClassConstructor = (cls) => {
  var str = cls.toString();
  var start = str.indexOf('constructor');
  var end = start;

  var inFunction = false;
  var level = 0;

  // Traverse through string until exited out of all blocks,
  // which indicates the end of the constructor function
  while (end < str.length && (level || !inFunction)) {
    if (str.charAt(end) === '{') {
      inFunction = true;
      level++;
    } else if (str.charAt(end) === '}') {
      level--;
    }
    end++;
  }

  return str.slice(start, end);
};

define(['../../lib/chai/chai.js', '../../lib/underscore/underscore.js'], function(chai) {
  var expect = chai.expect;

  return function(constructor) {
    return {followsPattern: function(pattern, options, prototypeOfInstances) {
      var patternIs = function() {
        return _(arguments).contains(pattern);
      };

      if (!patternIs(
        'functional',
        'functional-shared',
        'prototypal',
        'pseudoclassical',
        'es6'
      )) {
        throw new Error('Unrecognized class pattern');
      }

      if (patternIs('prototypal') && !prototypeOfInstances) {
        throw new Error('Testing the prototypal pattern requires you to supply the expected prototype');
      }

      var requireOption = function(optionName) {
        return option(optionName, true);
      };

      var option = function(optionName, required) {
        if (required && !options.hasOwnProperty(optionName)) {
          throw new Error('testClassPattern requires the ' + optionName + ' option');
        }
        var setting = options[optionName];
        delete options[optionName];
        return setting;
      };

      options = _({
        referencesThis:      patternIs('pseudoclassical', 'es6'),
        extendsPrototype:    patternIs('pseudoclassical', 'es6'),
        reusesMethods:       patternIs('functional-shared', 'prototypal', 'pseudoclassical', 'es6'),
        referencesReturn:    patternIs('functional', 'functional-shared', 'prototypal'),
        declaresVariables:   patternIs('functional', 'functional-shared', 'prototypal'),
        hasOwnMethods:       patternIs('functional', 'functional-shared'),
        reusesNonFunctions:  patternIs(),
        extendsConstructor:  patternIs()
      }).extend(options || {});

      prototypeOfInstances = (
        patternIs('functional') ? Object.prototype :
        patternIs('functional-shared') ? Object.prototype :
        patternIs('pseudoclassical') ? constructor.prototype :
        patternIs('es6') ? constructor.prototype :
        prototypeOfInstances
      );

      var constructionArgs = option('constructionArgs') || [];
      var instantiate = function() {
        if (patternIs('es6')) {
          return new constructor(...constructionArgs);
        } else if (patternIs('pseudoclassical')) {
          var instance = Object.create(constructor.prototype);
          var constructorReturn = constructor.prototype.constructor.apply(instance, constructionArgs);
          if (constructorReturn && constructorReturn !== instance) {
            console.warn('Psuedoclassical constructor returned something explicitly (returns `this` implicitly by default).');
          }
          return instance;
        } else {
          return constructor.apply(this, constructionArgs);
        }
      };

      var might = function(behavior, setting) {
        return 'does ' + (setting ? '' : 'not ') + behavior;
      };

      var assuming = function(condition) {
        return {expect: function() {
          var expectActual = expect.apply(null, arguments);
          return condition ? expectActual : expectActual.not;
        }};
      };

      describe(pattern + ' instantiation style', function() {
        var instance;

        beforeEach(function() {
          instance = instantiate();
        });

        it('makes new instances that delegate to appropriate prototype object', function() {
          expect(prototypeOfInstances.isPrototypeOf(instance)).to.be.true;
        });

        var constructorPrototypeProto = option('constructorPrototypeProto');
        if (constructorPrototypeProto) {
          it('makes the constructor\'s .prototype property delegate to the appropriate prototype object', function() {
            expect(constructorPrototypeProto.isPrototypeOf(constructor.prototype)).to.be.true;
          });
        }

        it('has a .prototype.constructor property that points back to the constructor itself', function() {
          expect(constructor.prototype.constructor).to.equal(constructor);
        });

        var extendsConstructor = requireOption('extendsConstructor');
        it(might('extend the constructor function', extendsConstructor), function() {
          constructorPropertyCount = Object.keys(constructor).length;
          assuming(extendsConstructor).expect(constructorPropertyCount).to.be.above(0);
        });

        var extendsPrototype = requireOption('extendsPrototype');
        it(might('extend the constructor function\'s prototype', extendsPrototype), function() {
          var prototypeObjectPropertyCount = Object.getOwnPropertyNames(constructor.prototype).length;
          assuming(extendsPrototype).expect(prototypeObjectPropertyCount).to.be.above(1);
        });

        var referencesThis = requireOption('referencesThis');
        it(might('reference the keyword this', referencesThis), function() {
          // This test could fail if the word "this" is found inside comments,
          // or if there are opening/closing braces ("{", "}") in comments inside the constructor.
          var constructorStr = patternIs('es6') ? extractClassConstructor(constructor) : constructor.toString();
          assuming(referencesThis).expect(/((?!\/\/).)*(this)/m.test(constructorStr)).to.be.true;
        });

        var referencesReturn = requireOption('referencesReturn');
        it(might('reference the return keyword', referencesReturn), function() {
          // This test could fail if there are opening/closing braces ("{", "}") in comments inside the constructor.
          var constructorStr = patternIs('es6') ? extractClassConstructor(constructor) : constructor.toString();
          assuming(referencesReturn).expect(/return/.test(constructorStr)).to.be.true;
        });

        var declaresVariables = requireOption('declaresVariables');
        it(might('declare variables', declaresVariables), function() {
          // This test could fail if there are opening/closing braces ("{", "}") in comments inside the constructor.
          var constructorStr = patternIs('es6') ? extractClassConstructor(constructor) : constructor.toString();
          assuming(declaresVariables).expect(/var |let /.test(constructorStr)).to.be.true;
        });

        it('does store properties without use of a prototype chain', function() {
          _(instance).each(function(value, key) {
            if (typeof value !== 'function') {
              expect(instance.hasOwnProperty(key)).to.be.true;
            }
          });
        });

        var hasOwnMethods = requireOption('hasOwnMethods');
        it(might('store methods without use of a prototype chain', hasOwnMethods), function() {
          _(_(instance).methods()).each(function(methodName) {
            assuming(hasOwnMethods).expect(instance.hasOwnProperty(methodName)).to.be.true;
          });
        });

        var reusesNonFunctions = requireOption('reusesNonFunctions');
        it(might('reuse non-function objects across multiple instances', reusesNonFunctions), function() {
          var otherInstance = instantiate();
          _(instance).each(function(value, key) {
            if (value && typeof value === 'object') {
              assuming(reusesNonFunctions).expect(value).to.equal(otherInstance[key]);
            }
          });
        });

        var reusesMethods = requireOption('reusesMethods');
        it(might('reuse methods across multiple instances', reusesMethods), function() {
          var otherInstance = instantiate();
          _(_(instance).methods()).each(function(methodName) {
            assuming(reusesMethods).expect(instance[methodName]).to.equal(otherInstance[methodName]);
          });
        });

      });

      if (!_(options).isEmpty()) {
        console.warn('testClassPattern is being invoked with unused options: ', options);
      }
    }};
  };
});
