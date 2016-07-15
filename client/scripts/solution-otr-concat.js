angular.module('app', [        
    'app.appState',    
    'app.models',
    'app.httpRequest',        
    'ngResource',
    'ngRoute',    
    'ngMaterial',    
    'ngMessages',

])

.config(['$mdThemingProvider', '$mdIconProvider', '$httpProvider', '$routeProvider', '$locationProvider',
    function($mdThemingProvider, $mdIconProvider, $httpProvider, $routeProvider, $locationProvider) {   

       //built a simple color palette theme
       $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('purple')
            .warnPalette('red')            

        $mdThemingProvider.theme('secondary')
            .primaryPalette('blue-grey')
            .accentPalette('amber')
            .warnPalette('red')
     
	
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];     
 
    //simple app, it contains just one route
    $routeProvider.
        when('/home', {templateUrl: 'views/home.tpl.html', controller: 'frontEndCtrl'}).
        otherwise({redirectTo: '/home'});
}])
.run(function($http, AppState, $rootScope, session) {
        AppState.authentication = {};
        AppState.authentication.key = "d621db0b9ac5a998921cfcbabdec22c9";
        AppState.authentication.secret = "10e69e702a76fe21c6d0b4886a1c56ff0ef29211b88d29d2";
        AppState.authentication.token = "";

        AppState.RadioShows = [];
})

angular.module('app.appState', []).factory('AppState', AppState);

AppState.$inject = [];

function AppState() {
  return {}
}
angular.module('app.models', []).factory('RadioShow', RadioShow);

function RadioShow() {

  function RadioShow() {

  };

  RadioShow.prototype =  {

    search: function(id, cb) {   
      var show = new RadioShow();

      show.name = AppState.RadioShows[0].name;
      show.genre = AppState.RadioShows[0].genre;
      show.createdAt = AppState.RadioShows[0].createdAt;
      show.updatedAt = AppState.RadioShows[0].updatedAt;
      show.thumb_png = AppState.RadioShows[0].thumb_png;
      show.thumb_jpg = AppState.RadioShows[0].thumb_jpg;
      show.id = id

      cb(show);
    }

    
  };

  return RadioShow;
}



angular.module('app.models', []).factory('Episode', Episode);

function Episode() {
  function Episode(rel_shows, audiofile, name, url, date_aired, number, active, show_id, createdAt, updatedAt) {
    this.rel_shows = rel_shows;
    this.audiofile = audiofile;    
    this.name = name;
    this.url = url;
    this.date_aired = date_aired;
    this.number = number;    
    this.active = active;
    this.show_id = show_id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;    
    this.id = id;
  };

  Episode.prototype =  {

    getRelShows: function() {
        return this.rel_shows;
    },
    getAudioFile: function() {
        return this.audiofile;
    }, 
    getName: function() {
        return this.name;
    },
    getUrl: function() {
        return this.url;
    },
    getDateAired: function() {
        return this.date_aired;
    },
    getNumber: function() {
        return this.number;
    },
    getActive: function() {
      return this.active;
    },
    getShowId: function() {
        return this.show_id;
    },
    getCreatedAt: function() {
      return this.createdAt;
    },
    getUpdatedAt: function() {
      return this.updatedAt;
    },    
    getId: function() {
      return this.id;
    }

    
  };

  return Episode;
}

angular.module('app.httpRequest', []).factory('tokenIzer', tokenIzer);


tokenIzer.$inject = ['AppState', '$http'];
function tokenIzer( AppState, $http ) {
    return {
            get : function() {
                return AppState.authentication.secret
            },
            set : function(token) {                               
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + token
                AppState.authentication.secret = token

            }
        }
}

angular.module('app.httpRequest').factory('session', session);
session.$inject = ['$resource'];
function session( $resource ) {
    
    return $resource("http://ba15ed50-49bb-11e6-abd3-294a95c5b391.app.jexia.com",
        {}, { 'login': {method: 'POST'}}
    )
}

angular.module('app.httpRequest').factory('shows', shows);
shows.$inject = ['AppState', '$http', '$q'];
function shows( AppState, $http, $q ) {
    return {
        get : function(callback) {            
            $http({
                method: 'GET',
                url: 'http://ba15ed50-49bb-11e6-abd3-294a95c5b391.app.jexia.com/shows',
                headers : { 'Authorization': 'Bearer ' + AppState.authentication.token }
            }).success(function(data) {
                callback(data);              
            }).error(function() {
                
            });
          
        }
    }
}

angular.module('app.httpRequest').factory('episodes', episodes);

episodes.$inject = ['AppState', '$http'];
function episodes( AppState, $http ) {
    return {
        get : function(callback) {
            return $http.get('http://ba15ed50-49bb-11e6-abd3-294a95c5b391.app.jexia.com/episodes', {
                headers : {
                    'Authorization': 'Bearer ' + AppState.authentication.token 
                }
            }).success(callback)//.catch(callback)
          
        }
    }
}

/*

angular.module('app.httpRequest').factory('shows', shows);

shows.$inject = ['$resource', 'AppState'];
function shows( $resource, AppState ) {
    
    //return $resource("http://ba15ed50-49bb-11e6-abd3-294a95c5b391.app.jexia.com/shows");
    return $resource('http://ba15ed50-49bb-11e6-abd3-294a95c5b391.app.jexia.com/shows', {}, {
        get: {
            method: 'GET',
            headers: { 
                'Authorization' : 'Bearer ' + getToken()
            }
        }
    });
}


angular.module('app.httpRequest').factory('episodes', episodes);

episodes.$inject = ['$resource', 'AppState'];
function episodes( $resource, AppState ) {
    
    //return $resource("http://ba15ed50-49bb-11e6-abd3-294a95c5b391.app.jexia.com/episodes");
    return $resource('http://ba15ed50-49bb-11e6-abd3-294a95c5b391.app.jexia.com/episodes', {}, {
        get: {
            method: 'GET',
            headers: { 
                'Authorization' : 'Bearer ' + AppState.authentication.token               
            }
        }
    });
}


*/
angular.module('app').controller('episodeCtrl', episodeCtrl);

episodeCtrl.$inject = ['$rootScope', '$scope', 'AppState', 'episodes', '$mdDialog', '$filter', '$q', '$http'];

function episodeCtrl($rootScope, $scope, AppState, episodes, $mdDialog, $filter, $q, $http) {

	$scope.episodes = [];
	$scope.currentId;

	$scope.turnRadioOn = function(ep) {		
		$rootScope.$broadcast("turnRadioOnSingleEp", ep);
	}

     $scope.getEpisodes = function() {

        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'http://ba15ed50-49bb-11e6-abd3-294a95c5b391.app.jexia.com/episodes',
            headers: { 'Authorization': 'Bearer ' + AppState.authentication.token },
            params: { 'show_id' : $scope.currentId }
        }).success(function(data) {
        	$scope.episodes = [];

            data.forEach(function(data) {
            	var episode = {};

            	episode.id = data.id;
            	episode.audiofile = data.audiofile;    
			    episode.name = data.name;
			    episode.url = data.url;
			    episode.date_aired = data.date_aired;
			    episode.number = parseInt(data.number);    
			    episode.active = data.active;
			    episode.show_id = data.show_id;
			    episode.createdAt = data.createdAt;
			    episode.updatedAt = data.updatedAt;    

                $scope.episodes.push(episode);                
            })
            deferred.resolve();

        }).error(function() {
            deferred.reject();
        });
        return deferred.promise;

    }


    //Asynchronous callback for the comment data retrieval
    $rootScope.$on("dataRetrieval", function(evt, data) {    	
        console.log('data: ', data.id);
        $scope.currentId = data.id;
        $scope.getEpisodes().then(function(res) {
            $scope.episodes = $scope.episodes;
        }, function(error) {
            console.log('error: ', error)
        })


       /*

		$scope.openCommentaryDialog = function(ev) {    
		AppState.pokemon = $scope.pokemon; 	
		$mdDialog.show({
		  controller: DialogController,
		  templateUrl: 'views/dialog.tpl.html',
		  parent: angular.element(document.body),
		  targetEvent: ev,
		  clickOutsideToClose:true
		})
		.then(function(answer) {
			//stub -> no data is necessary so far once the dialog's closed  
		}, function() {
		  	//same applies here
		});
    };
		

   
		
	*/
        });

     //$scope.start();
    }

    /*angular.module('app').controller('DialogController', DialogController);
    function DialogController($scope, $mdDialog, AppState, Comment, Comments) {
    	
    	$scope.start = function() {

    		$scope.pokemon = AppState.pokemon;
    		$scope.comment = {};
    		$scope.comment.pokemonId = AppState.pokemon.pokemonId;	

    		Comments.start();
    	}
    	

    	$scope.hide = function() {
    		$mdDialog.hide();
    	};

    	$scope.cancel = function() {
    		$mdDialog.cancel();
    	};

    	$scope.save = function() {	
    	
    		var comment = new Comment(
    			$scope.comment.name, 
    			$scope.comment.email,
    			$scope.comment.pokemonId,
    			$scope.comment.message);

    		Comments.push(comment);

    		$mdDialog.hide('');		
    		
    	};

    	$scope.start();
    }*/

angular.module('app').controller('radioCtrl', radioCtrl);

radioCtrl.$inject = ['$rootScope', '$scope', 'AppState',  '$filter', '$q', '$http'];

function radioCtrl($rootScope, $scope, AppState, $filter, $q, $http) {

  $scope.program = {}
  $scope.musique = null;
  

  $rootScope.$on("turnRadioOnSingleEp", function(evt, data) {
    $scope.program = data;

    if($scope.musique != null) {
      $scope.musique.stop();
    }
    $scope.playEpisode();
  });

  $scope.playEpisode = function() {
    $scope.musique = new Musique({
    'volume': 75,
    'autoplay': false,
    'playlist': [{
        'title': $scope.program.name,
        'artist': 'Artist Track 01',
        'album': 'Album Track 01',        
        'src': $scope.program.url
      }]
    });

    $scope.musique.play();
  }
}
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
