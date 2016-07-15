angular.module('app').controller('frontEndCtrl', frontEndCtrl);

frontEndCtrl.$inject = ['$http', '$rootScope', '$scope',  'session', 'tokenIzer', 'AppState', '$filter', '$q'];


function frontEndCtrl($http, $rootScope, $scope, session, tokenIzer, AppState, $filter, $q) {

    $scope.title = "Old Time Radio";
    $scope.allShows = [];
    $scope.setSession = function() {

        session.login({ key: AppState.authentication.key, secret: AppState.authentication.secret }, function(data) {
            AppState.authentication.token = data.token
            tokenIzer.set(data.token)
            $scope.start()
        });


    }
        

    $scope.start = function() {
        this.selectedItemChange = $scope.selectedItemChange;
        this.searchTextChange = $scope.searchTextChange;

        AppState.loading = true;



        $scope.shows = [];
        $scope.currentItem = {};
        $scope.getShows().then(function(data) {
            $scope.allshows = $scope.allShows;
            AppState.RadioShows = AppState.RadioShows;
            AppState.loading = false;
        }, function(error) {
            console.log('error: ', error)
        })

        $scope.searching = false;

    }

    //local filter
    $scope.querySearch = function(query) {

        var results = query ? $scope.allShows.filter($scope.createFilterFor(query)) : $scope.allShows,
            deferred;

        $scope.shows = results;
        $scope.searching = true;

        return results;
    }

    //retrieve the entire podekex list to be displayed at the completebox
    $scope.getShows = function() {

        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'http://ba15ed50-49bb-11e6-abd3-294a95c5b391.app.jexia.com/shows',
            headers: { 'Authorization': 'Bearer ' + AppState.authentication.token }
        }).success(function(data) {
            var rawData = data;
            rawData.forEach(function(data) {
                $scope.allShows.push({ value: data.id, display: data.name });
                AppState.RadioShows.push(data);
            })
            deferred.resolve();

        }).error(function() {
            deferred.reject();
        });
        return deferred.promise;

    }

    //finally, a pokemon's selected, do the magic baby!
    $scope.selectedItemChange = function(item) {

        if (item !== undefined) {

            $scope.currentItem = item;

            $scope.show = {};

            $scope.getShow(item.value);
        }

    }

    //gotta clean it up once the search criteria is no longer the previous one
    $scope.searchTextChange = function(text) {
        if (text === '') {
            $scope.searching = false;
            $scope.show = null;
        }
    }

    //filters alphabetically similar named pokemons
    $scope.createFilterFor = function(query) {

        var normallCaseQuery = query;
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(show) {
            return ((show.display.indexOf(lowercaseQuery) === 0) || (show.display.indexOf(normallCaseQuery) === 0));
        };
    }

    //sends requests to server
    $scope.getShow = function(id) {        
        AppState.loading = true;
        
        for(i in AppState.RadioShows) {
            
            if(id === AppState.RadioShows[i].id) {
                $scope.show.name = AppState.RadioShows[i].name;
                $scope.show.genre = AppState.RadioShows[i].genre;
                $scope.show.createdAt = AppState.RadioShows[i].createdAt;
                $scope.show.updatedAt = AppState.RadioShows[i].updatedAt;
                
                if(AppState.RadioShows[i].thumb_png != null) {
                    $scope.show.image = AppState.RadioShows[i].thumb_png;
                }

                if(AppState.RadioShows[i].thumb_jpg != null) {
                    $scope.show.image = AppState.RadioShows[i].thumb_jpg;
                }
                
                $scope.show.id = id                
            }
        }       

        if($scope.show.id != null) 
            $scope.setShow($scope.show);
        
    }

    //callback from server request
    $scope.setShow = function(show) {        
        $scope.show = show;
        $rootScope.show = show;
        $rootScope.$broadcast("dataRetrieval", $rootScope.show);
        AppState.loading = false;
    }

    $scope.setSession();

}
