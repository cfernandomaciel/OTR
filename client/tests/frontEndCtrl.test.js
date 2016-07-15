describe('frontEndCtrl unit tests' , function() {

	var scope, frontEndCtrl;

	beforeEach(module('app'));

 	beforeEach(inject(function($controller, $rootScope){
        scope = $rootScope.$new();        
        frontEndCtrl = $controller('frontEndCtrl', {
            $scope: scope
        });
    }));


	it('says Old Time Radio', function () {		
		expect(scope).toBeDefined();
		expect(scope.title).toEqual('Old Time Radio');						
	});

	

});