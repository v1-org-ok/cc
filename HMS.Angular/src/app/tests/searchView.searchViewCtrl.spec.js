describe("searchView.searchViewCtrl", function () {
  beforeEach(module("FullstackGeneratedApp"));
  beforeEach(module("$$UpgradeModule"));

  var $controller, $rootScope, $scope, $log, $location, dataSvc, toastrWrapperSvc, httpBackend;

  beforeEach(inject(function (_$controller_, _$rootScope_, _$log_, _$location_, _common_services_dataSvc_, _common_services_toastrWrapperSvc_, _$httpBackend_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $log = _$log_;
    $location = _$location_;
    dataSvc = _common_services_dataSvc_;
    toastrWrapperSvc = _common_services_toastrWrapperSvc_;
    httpBackend = _$httpBackend_;
  }));

  describe("initialization", function () {
    it("should populate $scope.people with data from dataSvc.getPeople", function () {
      var mockPeopleData = [{ id: 1, name: "John Doe" }, { id: 2, name: "Jane Doe" }];
      sinon.stub(dataSvc, "getPeople").returns({
        then: function (callback) {
          callback({ data: mockPeopleData });
        }
      });

      $controller("searchView.searchViewCtrl", { $scope: $scope });
      expect($scope.people).toEqual(mockPeopleData);
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

    it("should change the path to details with the personId", function () {
      sinon.stub($location, "path");
      var personId = 5;
      $scope.loadDetails(personId);
      expect($location.path.calledWith("details/" + personId)).toBe(true);
      $location.path.restore();
    });
  });
});