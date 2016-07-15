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