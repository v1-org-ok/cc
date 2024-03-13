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
    it("should populate $scope.people with the response data", function () {
      var mockPeopleData = [{id: 1, name: "John"}, {id: 2, name: "Jane"}];
      sinon.stub(dataSvc, "getPeople").returns({
        then: function (callback) {
          callback({data: mockPeopleData});
        }
      });

      $controller("searchView.searchViewCtrl", {
        $scope: $scope,
        $log: $log,
        $location: $location,
        data: dataSvc,
        tstr: toastrWrapperSvc
      });

      expect($scope.people).toEqual(mockPeopleData);
      dataSvc.getPeople.restore();
    });
  });

  describe("$scope.loadDetails", function () {
    it("should call toastr error when personId is 6", function () {
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