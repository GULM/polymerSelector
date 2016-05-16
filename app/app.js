(function(){
	"use strict";

	var app = angular.module("polymer", ["firebase", "ngStorage"]);
	var notificationServer = document.querySelector("notify-server");
	var button = document.querySelector("paper-button");
	var input = document.querySelector("paper-input");
	var rand = function() {
	    return Math.random().toString(36).substr(2); // remove `0.`
	};

	var token = function() {
	    return rand();
	};

	app.controller("MainCtrl", function($scope, $firebaseArray, $localStorage) {
	  var ref = new Firebase("https://quickerpolymer.firebaseio.com/users");
		button.disabled = true;
		input.disabled = true;
		if(!$localStorage.token){
			$localStorage.token = token();
			button.disabled = false;
			input.disabled = false;
		}
		function In(token){
			for(var i = 0; i < $scope.users.length; i++){
				if($scope.users[i].token === token){
					return i;
				}
			}
			return false
		}

		$scope.users = $firebaseArray(ref);

		$scope.subscribe = function(){
			if(!input.value){
				alert("digite seu nome");
			}
			else{
				if(In($localStorage.token) === false){
					$scope.users.$add({
						token: $localStorage.token,
						name: input.value,
						selected: false
					})
					button.disabled = true;
					input.disabled = true;
				}
			}
		}

		$scope.$watch('users', function(){
			if($scope.users[In($localStorage.token)].selected){
				if(!$localStorage.selected){
					$scope.isMe = true;
					notificationServer.alert("YOU WIN!", "Você acaba de ganahr o brinde no sorteio :D", "yes.jpg", 5000, [500, 200, 500, 200, 500, 200, 500])
					$localStorage.selected = true;
				}
			}
			else{
				$scope.isMe = false;
			}
		}, true);



	});
	app.controller("SorterCtrl", function($scope, $firebaseObject, $firebaseArray, $localStorage) {
	  var ref = new Firebase("https://quickerpolymer.firebaseio.com/users");
		var syncObject = $firebaseObject(ref);
		$scope._users_ = $firebaseArray(ref);

		$scope.get = function(){
			var random = parseInt(Math.random() * 100);
			var selected = random %	$scope._users_.length;
			var p = 0;
			for(var i in $scope.users){
				if(i.indexOf("$") == -1){
					if(p == selected){
						$scope.users[i].selected = true;
						$scope.winner = $scope.users[i].name;
					}
					p++;
				}
			}
		}

		syncObject.$bindTo($scope, "users");

	});

}())
