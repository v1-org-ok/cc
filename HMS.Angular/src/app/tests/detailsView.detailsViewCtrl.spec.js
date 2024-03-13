describe("detailsView.detailsViewCtrl", function () {
  beforeEach(module("FullstackGeneratedApp"));
  beforeEach(module("$$UpgradeModule"));

  var $controller, $rootScope, $scope, $log, $routeParams, dataSvc, deferred, $q;

  beforeEach(inject(function (_$controller_, _$rootScope_, _$log_, _$routeParams_, _common.services.dataSvc_, _$q_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $log = _$log_;
    $routeParams = _$routeParams_;
    dataSvc = _common.services.dataSvc_;
    $q = _$q_;

    $scope = $rootScope.$new();
    deferred = $q.defer();

    sinon.stub($routeParams, 'id').value('123');
    sinon.stub(dataSvc, 'getPerson').returns(deferred.promise);
  }));

  afterEach(function () {
    $routeParams.id.restore();
    dataSvc.getPerson.restore();
  });

  describe("initialization", function () {
    it("should set $scope.person with the data received from dataSvc.getPerson", function () {
      var personId = parseInt($routeParams.id);
      var mockPersonData = { name: "John Doe", age: 30 };
      deferred.resolve({ data: mockPersonData });
      $controller('detailsView.detailsViewCtrl', { $scope: $scope, $log: $log, $routeParams: $routeParams, data: dataSvc });

      $scope.$apply(); // Resolve the promise

      expect($scope.person).to.deep.equal(mockPersonData);
    });
  });
});