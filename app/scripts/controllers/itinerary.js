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
        { id: 1, name: "Plan", active:true  },
        { id: 2, name: "Day1", active:false },
        { id: 3, name: "Workspace 2", active:false },
        { id: 4, name: "Workspace 2", active:false }
    ];
 
    $scope.addWorkspace = function () {
        setAllInactive();
        addNewWorkspace();
    };       
 
}]);

zopkyFrontendApp.controller("TabsChildController",['$scope', function ($scope){
    $scope.workspace1 = { id: 1, name: "gfgfdggg 1", active:true  };

}]);