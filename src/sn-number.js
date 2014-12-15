(function() {
    'use strict';

    angular.module('snNumber', [])
        .directive('snNumber', [
            function() {
                return {
                    restrict: 'A',
                    require: 'ngModel',
                    link: function(scope, element, attrs, ngModelController) {
                        ngModelController.$parsers.push(function(newValue) {
                            if (/^[0-9.]$/.test(newValue)) {
                                return newValue;
                            }

                            newValue = newValue.replace(/[^0-9.]*/, '');

                            // Remove all but first decimal point
                            var decimalMatches = newValue.match(/\./g);
                            if (decimalMatches && decimalMatches.length > 1) {
                                var newValueSegments = newValue.split('.');
                                newValue = newValueSegments.shift() + '.' + newValueSegments.shift();
                                if (newValueSegments.length) {
                                    newValue += newValueSegments.join();
                                }
                            }

                            // Default behaviour is a nasty "jumping" cursor
                            var selectionStart = element[0].selectionStart;
                            ngModelController.$viewValue = newValue;
                            ngModelController.$render();
                            element[0].setSelectionRange(selectionStart, selectionStart);

                            return newValue;
                        });
                    }
                };
            }
        ]);
})();
