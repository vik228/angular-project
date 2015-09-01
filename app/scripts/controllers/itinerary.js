'use strict';
zopkyFrontendApp.controller("itineraryController", ['$scope', function ($scope) {
 
    var setAllInactive = function() {
        angular.forEach($scope.workspaces,  function(workspace) {
            workspace.active = false;
        });
    };
 
    var addNewWorkspace = function() {
        var id = $scope.workspaces.length + 1;
        $scope.workspaces.push({
            id: id,
            name: "Workspace " + id,
            active: true
        });
    };
 
    $scope.workspaces =
    [
        { id: 1, name: "Day 1", active:true  },
        { id: 2, name: "Day 2", active:false },
        { id: 3, name: "Day 3", active:false },
        { id: 4, name: "Day 4", active:false },
        { id: 4, name: "Day 5", active:false },
        { id: 4, name: "Hotel Booking", active:false },
        { id: 4, name: "Description", active:false },
    ];
 
    $scope.addWorkspace = function () {
        setAllInactive();
        addNewWorkspace();
    };       
 
}]);

zopkyFrontendApp.controller("idaysController",['$scope', function ($scope){
    $scope.workspace = { id: 1, name: "gfgfdggg 1", active:true  };
    $scope.cities = [
        {id:1, city:'Mumbai'},
        {id:2, city:'Delhi'},
        {id:3, city:'Bangalore' }
        ]; 

}]);
zopkyFrontendApp.controller("ihotelController",['$scope', function ($scope){
    $scope.workspace = { id: 1, name: "gfgfdggg 1", active:true  };

}]);
zopkyFrontendApp.controller("idescriptionController",['$scope', function ($scope){
    $scope.workspace1 = { id: 1, name: "gfgfdggg 1", active:true  };

}]);