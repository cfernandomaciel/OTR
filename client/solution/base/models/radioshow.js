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


