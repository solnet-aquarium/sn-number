angular.module('snNumberApp', ['snNumber']);

describe('Solnet Angular Number Directive', function() {

    var element, input, scope, form;

    beforeEach(module('snNumberApp'));

    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope.$new();
        scope.model = {
            number: ''
        };

        element = '<form name="form"><input sn-number ng-model="model.number" name="number" /></form>';
        element = $compile(element)(scope);

        input = element.find('input');

        scope.$digest();
        form = scope.form;
    }));

    it('restricts user-entered input to be numeric', inject(function() {
        form.number.$setViewValue('abc');
        scope.$digest();
        expect(scope.model.number).toEqual('');
    }));

    it('allows decimals', inject(function() {
        form.number.$setViewValue('123.4');
        scope.$digest();
        expect(scope.model.number).toEqual('123.4');
    }));

    it('does not allow multiple decimal points', inject(function() {
        form.number.$setViewValue('123.4.5');
        scope.$digest();
        expect(scope.model.number).toEqual('123.45');
    }));

    // There is a bug in PhantomJS blocking this test https://github.com/ariya/phantomjs/issues/12493
    // it('returns the cursor to the same position after modification', inject(function() {
    //     form.number.$setViewValue('123');
    //     scope.$digest();

    //     form.number.$setViewValue('321');
    //     input[0].setSelectionRange(1, 2);
    //     scope.$digest();

    //     expect(input[0].selectionStart).toEqual(1);
    // }));

});
