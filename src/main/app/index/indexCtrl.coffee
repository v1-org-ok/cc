angular.module('index.indexCtrl', []).controller('index.indexCtrl', [
	'$log',
	'$scope',
	'common.services.env'
	($log, $scope, envSvc) ->

		$scope.env = "HELLO"
		# $scope.env = envSvc.env
		
	])