//Module
var myApp = angular.module('myApp', []);

//Controller
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");
    
    //shows the list
    var refresh = function () {
	    $http.get("/tasks").success(function(response) {
	    	console.log("I got the data I requested");
	    	$scope.tasks = response;
	    	$scope.task = "";
	    });
    };

    refresh();

    //add to the database
    $scope.add = function () {
    	console.log($scope.task);
    	$http.post('/tasks', $scope.task)
    	.success(function(response) {
    		console.log(response);
    		refresh();
    	});
    }

    //removes from the db
    $scope.remove = function(id){
    	console.log(id);
    	$http.delete('/tasks/'+id)
    	.success(function (response) {
    		refresh();
    	});
    };

    //edit
    $scope.edit = function (id) {
    	console.log(id);
    	$http.get('/tasks/'+id)
    	.success(function (response) {
    		$scope.task = response;
    	});
    };

    //update
    $scope.update = function(){
    	console.log($scope.task._id);
    	$http.put('/tasks/'+$scope.task._id, $scope.task)
    	.success(function(response){
    		refresh();
    	})
    };

    //deselect
    $scope.deselect = function () {
    	$scope.task = "";
    };

}]);