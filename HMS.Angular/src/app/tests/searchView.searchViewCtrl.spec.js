describe("searchViewCtrl", function () {
  beforeEach(module("searchView.searchViewCtrl"));
  beforeEach(module("$$UpgradeModule"));

  var $controller, $rootScope, $scope, $log, $location, dataSvc, toastrWrapperSvc, httpBackend;

  beforeEach(inject(function (_$controller_, _$rootScope_, _$log_, _$location_, _common.services.dataSvc_, _common.services.toastrWrapperSvc_, _$httpBackend_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $log = _$log_;
    $location = _$location_;
    dataSvc = _common.services.dataSvc_;
    toastrWrapperSvc = _common.services.toastrWrapperSvc_;
    httpBackend = _$httpBackend_;
  }));

  describe("initialization", function () {
    it("should populate $scope.people with data from dataSvc.getPeople()", function () {
      var mockPeopleData = { data: [{ id: 1, name: "John Doe" }, { id: 2, name: "Jane Doe" }] };
      sinon.stub(dataSvc, "getPeople").returns({
        then: function (callback) {
          callback(mockPeopleData);
        }
      });

      $controller("searchView.searchViewCtrl", { $scope: $scope });
      expect($scope.people).toEqual(mockPeopleData.data);

      dataSvc.getPeople.restore();
    });
  });

  describe("$scope.loadDetails", function () {
    it("should call toastrWrapperSvc.error when personId is 6", function () {
      sinon.stub(toastrWrapperSvc, "error");
      $scope.loadDetails(6);
      expect(toastrWrapperSvc.error.calledWith("Hannah always throws this error just to show toastr integration.", "Fake Error!")).toBe(true);
      toastrWrapperSvc.error.restore();
    });

    it("should change the path to details/personId when a valid personId is provided", function () {
      sinon.stub($location, "path");
      var validPersonId = 5;
      $scope.loadDetails(validPersonId);
      expect($location.path.calledWith("details/" + validPersonId)).toBe(true);
      $location.path.restore();
    });
  });
});