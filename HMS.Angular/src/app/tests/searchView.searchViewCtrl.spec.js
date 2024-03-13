describe("searchViewCtrl", function () {
  beforeEach(module("searchView.searchViewCtrl"));
  beforeEach(module("$$UpgradeModule"));

  var $controller, $rootScope, $scope, $log, $location, dataSvc, toastrWrapperSvc, $q;

  beforeEach(inject(function (_$controller_, _$rootScope_, _$log_, _$location_, _common_services_dataSvc_, _common_services_toastrWrapperSvc_, _$q_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $log = _$log_;
    $location = _$location_;
    dataSvc = _common_services_dataSvc_;
    toastrWrapperSvc = _common_services_toastrWrapperSvc_;
    $q = _$q_;

    sinon.stub(dataSvc, 'getPeople').returns($q.resolve({ data: [{ id: 1 }, { id: 6 }] }));
    sinon.stub(toastrWrapperSvc, 'error');
    sinon.stub($location, 'path');

    $controller('searchView.searchViewCtrl', {
      $scope: $scope,
      $log: $log,
      $location: $location,
      'common.services.dataSvc': dataSvc,
      'common.services.toastrWrapperSvc': toastrWrapperSvc
    });
  }));

  describe("initialization", function () {
    it("should populate $scope.people with the data from dataSvc.getPeople()", function () {
      $scope.$apply(); // Resolve the promise
      expect($scope.people).to.deep.equal([{ id: 1 }, { id: 6 }]);
    });
  });

  describe("$scope.loadDetails", function () {
    it("should call toastrWrapperSvc.error when personId is 6", function () {
      $scope.loadDetails(6);
      expect(toastrWrapperSvc.error.calledWith("Hannah always throws this error just to show toastr integration.", "Fake Error!")).to.be.true;
    });

    it("should change the path to details with the personId when personId is not 6", function () {
      $scope.loadDetails(1);
      expect($location.path.calledWith("details/1")).to.be.true;
    });
  });

  afterEach(function () {
    dataSvc.getPeople.restore();
    toastrWrapperSvc.error.restore();
    $location.path.restore();
  });
});