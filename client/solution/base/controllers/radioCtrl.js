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