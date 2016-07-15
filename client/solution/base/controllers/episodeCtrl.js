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
