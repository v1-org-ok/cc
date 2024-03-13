describe("detailsView.detailsViewCtrl", function () {
  beforeEach(module("FullstackGeneratedApp"));
  beforeEach(module("$$UpgradeModule"));

  var $controller, $rootScope, $scope, $log, $routeParams, dataSvc, deferred, $q;

  beforeEach(inject(function (_$controller_, _$rootScope_, _$log_, _$routeParams_, _common.services.dataSvc_, _$q_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $log = _$log_;
    $routeParams = _$routeParams_;
    dataSvc = _common.services.dataSvc_;
    $q = _$q_;

    deferred = $q.defer();
    sinon.stub(dataSvc, 'getPerson').returns(deferred.promise);
  }));

  afterEach(function () {
    dataSvc.getPerson.restore();
  });

  describe("initialization", function () {
    it("should fetch person data based on routeParams id", function () {
      var testPersonId = 123;
      $routeParams.id = testPersonId.toString();
      var testPersonData = { name: "John Doe", id: testPersonId };

      $controller('detailsView.detailsViewCtrl', {
        $scope: $scope,
        $log: $log,
        $routeParams: $routeParams,
        data: dataSvc
      });

      deferred.resolve({ data: testPersonData });
      $scope.$apply();

      expect(dataSvc.getPerson.calledWith(testPersonId)).toBe(true);
      expect($scope.person).toEqual(testPersonData);
    });
  });
});