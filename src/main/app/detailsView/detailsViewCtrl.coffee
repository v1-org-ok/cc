angular.module('detailsView.detailsViewCtrl', []).controller('detailsView.detailsViewCtrl', [
	'$scope'
	'$log'
	'$routeParams'
	'common.services.dataSvc'
	($scope, $log, $routeParams, data) ->

		personId = parseInt($routeParams.id)

		data.getPerson(personId).then (resp)->
			$scope.person = resp.data
	])