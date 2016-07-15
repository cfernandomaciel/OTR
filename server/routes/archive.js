var parseString = require('xml2js').parseString;
var fs = require('fs');
var request = require('request');
var token = 'd621db0b9ac5a998921cfcbabdec22c9';
var resurl = 'http://ba15ed50-49bb-11e6-abd3-294a95c5b391.app.jexia.com/episodes/recordId';

var urls = {
    philip_marlowe : "https://ia802606.us.archive.org/23/items/OTRR_Philip_Marlowe_Singles/",
    dimension_x : "https://ia802508.us.archive.org/31/items/OTRR_Dimension_X_Singles/",
    dragnet : "https://ia802701.us.archive.org/12/items/Dragnet_OTR/",
    x_minus_one : "https://ia902608.us.archive.org/15/items/OTRR_X_Minus_One_Singles/" ,
    gunsmoke : "https://ia800304.us.archive.org/20/items/OTRR_Gunsmoke_Singles/"
  }


String.prototype.weekLize = function() {    
    return this.replace(/(Mon\,\s)+|(Tue\,\s)+|(Wed\,\s)+|(Thu\,\s)+|(Fri\,\s)+|(Sat\,\s)+|(Sun\,\s)+/g, '');
}

String.prototype.dateLize = function() {
    var date = this.substr(0, 11);
    var day = date.substr(0, 2);
    var month_str =  date.substr(3, 4).trim();
    var year = date.substr(7, 11);

    var month;
    switch(month_str) {
        case "Jan":
            month = "01";
            break;
        case "Feb":
            month = "02";
            break;
        case "Mar":
            month = "03";
            break;
        case "Apr":
            month = "04";
            break;
        case "May":
            month = "05";
            break;
        case "Jun":
            month = "06";
            break;
        case "Jul":
            month = "07";
            break;
        case "Aug":
            month = "08";
            break;
        case "Sep":
            month = "09";            
            break;
        case "Oct":
            month = "10";
            break;
        case "Nov":
            month = "11";
            break;
        case "Dec":
            month = "12";
            break;
        
    }

    return year+"-"+month+"-"+day;
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}


exports.gunsmoke = function(req, res) {

    var show_id = "5787889e4a7476d197306247";
    var url =  "https://ia800304.us.archive.org/20/items/OTRR_Gunsmoke_Singles/"
    var show = "gunsmoke";
    var file = show + ".xml";  

  
    fs.readFile('./files/' + file, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    console.log("parsing xml file");

    parseString(data, function (err, result) {  

        var episodes = [];     
       
        for(var i=0;i<result.files.file.length;i++) {
           

           var p = result.files.file[i]["$"];
           

           if(p.name.indexOf("mp3") !== -1) {

               var episode = {};

               var prefix = p.name.replace(/\-/ig, ' ').replace(".mp3", "");//removes - and .mp3 from string             

               var name = prefix.replace("Gunsmoke_", "").replace(/\d+/g).replace(/\_/g, ' ');//removes Prefix, numbers and underlines
             
               name = name.replace(/(undefined)/g, "").trim();//removes 'undefined' garbage and trims it

               var numberPattern = /\d+/g;
               var date = prefix.match(numberPattern);//retrieves only numerical value from it
               var number = result.files.file[i].album[0].replace(/(episode)|\d+\/\d+\/\d+|\,/g, '').trim();              

               episode.audiofile = p.name;
               episode.name = name;
               episode.url = url + p.name;
               var dt = "19"+date.join().substr(0, 8).replace(/\,/g, '-');
               dt = dt.replace(/(Mon)|(Tue)|(Wed)|(Thu)|(Fri)|(Sat)|(Sun)+/g, '');
               episode.date_aired = dt;
               episode.number = number;
               episode.active = "1";
               episode.show_id = "5787889e4a7476d197306247";

               episodes.push(episode);           
           }

        }

        res.send(episodes);
      
    });


    }); 
}

exports.xminusone = function(req, res) {
    var show_id = "5787886d4a7476d197306244";
    
    var url =  "https://ia902608.us.archive.org/15/items/OTRR_X_Minus_One_Singles/"
    var show = "x minus one";
    var file = show + ".xml";  

  
    fs.readFile('./files/' + file, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    console.log("parsing xml file");

    parseString(data, function (err, result) {  

        var episodes = [];     
       
        for(var i=0;i<result.files.file.length;i++) {
           

           var p = result.files.file[i]["$"];
           

           if(p.name.indexOf("mp3") !== -1) {

               var episode = {};

               var prefix = p.name.replace(/\-/ig, ' ').replace(".mp3", "");//removes - and .mp3 from string             

               var name = prefix.replace("XMinusOne", "").replace(/\d+/g).replace(/\-/g, ' ');//removes Prefix, numbers and underlines
             
               name = name.replace(/(undefined)/g, " ").trim();//removes 'undefined' garbage and trims it

               first_letters = name.match(/[A-Z]+/g);

              
               for(j in first_letters) {
                 name = name.replace(first_letters[j], " " + first_letters[j]);
               }
               name = name.trim();
               

               var numberPattern = /\d+/g;
               var date = prefix.match(numberPattern);//retrieves only numerical value from it
               var number = result.files.file[i].album[0].replace(/(episode)|\d+\/\d+\/\d+|\,/g, '').trim();              

               episode.audiofile = p.name;
               episode.name = name;
               episode.url = url + p.name;
               episode.date_aired = "19"+date.join().substr(0, 8).replace(/\,/g, '-');
               episode.number = number;
               episode.active = "1";
               episode.show_id = show_id;
               

               episodes.push(episode);           
           }

        }

        res.send(episodes);
      
    });


    }); 
}

exports.philipmarlowe = function(req, res) {
    var show_id = "5787887c4a7476d197306245";
    var url =  "https://ia802606.us.archive.org/23/items/OTRR_Philip_Marlowe_Singles/"
    var show = "philip marlowe";
    var file = show + ".xml";  

  
    fs.readFile('./files/' + file, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    console.log("parsing xml file");

    parseString(data, function (err, result) {  

        var episodes = [];     
       
        for(var i=0;i<result.files.file.length;i++) {
           

           var p = result.files.file[i]["$"];
           

           if(p.name.indexOf("mp3") !== -1) {

               var episode = {};

               var prefix = p.name.replace(/\-/ig, ' ').replace(".mp3", "");//removes - and .mp3 from string             

               var name = prefix.replace("Philip_Marlowe_", "").replace(/\d+/g).replace(/\_/g, ' ');//removes Prefix, numbers and underlines

               name = name.replace(/(ep)/g, '');
               name = name.replace(/(xxx)/g, '');
             
               name = name.replace(/(undefined)/g, " ").trim();//removes 'undefined' garbage and trims it

               //first_letters = name.match(/[A-Z]+/g);

              /*
               for(j in first_letters) {
                 name = name.replace(first_letters[j], " " + first_letters[j]);
               }*/
               name = name.trim();
               

               var numberPattern = /\d+/g;
               var date = prefix.match(numberPattern);//retrieves only numerical value from it
               var number = result.files.file[i].album[0].replace(/(episode)|\d+\/\d+\/\d+|\,/g, '').trim();              

               episode.audiofile = p.name;
               episode.name = name;
               episode.url = url + p.name;
               episode.date_aired = "19"+date.join().substr(0, 8).replace(/\,/g, '-');
               episode.number = number;
               episode.active = "1";
               episode.show_id = show_id;
               

               episodes.push(episode);           
           }

        }

        res.send(episodes);
      
    });


    }); 
}

exports.dimensionx = function(req, res) {
    var show_id = "5787888d4a7476d197306246";
    var url =  "https://ia802508.us.archive.org/31/items/OTRR_Dimension_X_Singles/";
    var show = "dimension x";
    var file = show + ".xml";  

    fs.readFile('./files/' + file, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    console.log("parsing xml file");

    parseString(data, function (err, result) {  

        var episodes = [];     
       
        for(var i=0;i<result.files.file.length;i++) {
           

           var p = result.files.file[i]["$"];
           

           if(p.name.indexOf("mp3") !== -1) {

               var episode = {};

               var prefix = p.name.replace(/\-/ig, ' ').replace(".mp3", "");//removes - and .mp3 from string             

               var name = prefix.replace("Dimension_X_", "").replace(/\d+/g).replace(/\_/g, ' ');//removes Prefix, numbers and underlines

               name = name.replace(/(ep)/g, '');
               name = name.replace(/(xxx)/g, '');
             
               name = name.replace(/(undefined)/g, " ").trim();//removes 'undefined' garbage and trims it
               
               first_letters = name.match(/[A-Z]+/g);

              
               for(j in first_letters) {
                 name = name.replace(first_letters[j], " " + first_letters[j]);
               }

               name = name.trim();
               

               var numberPattern = /\d+/g;
               var date = prefix.match(numberPattern);//retrieves only numerical value from it
               

               episode.audiofile = p.name;
               episode.name = name;
               episode.url = url + p.name;
               episode.date_aired = date[0]+"-"+date[1]+"-"+date[2];
               episode.number = date[3];
               episode.active = "1";
               episode.show_id = show_id;
               

               episodes.push(episode);           
           }

        }

        res.send(episodes);
      
    });


    }); }

exports.dragnet = function(req, res) {
    var show_id = "5787885d4a7476d197306243";
    var url =  "https://ia802701.us.archive.org/12/items/Dragnet_OTR/";
    var show = "dragnet";
    var file = show + ".xml";  
    

    fs.readFile('./files/' + file, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    console.log("parsing xml file");

    parseString(data, function (err, result) {  

        var episodes = [];     
       
        for(var i=0;i<result.files.file.length;i++) {
           

           var p = result.files.file[i]["$"];
           

           if(p.name.indexOf("mp3") !== -1) {

               var episode = {};

               var prefix = p.name.replace(/\-/ig, ' ').replace(".mp3", "");//removes - and .mp3 from string             

               var name = prefix.replace("Dragnet_", "").replace(/\d+/g).replace(/\_/g, ' ');//removes Prefix, numbers and underlines

               name = name.replace(/(ep)/g, '');
               name = name.replace(/(xxx)/g, '');
             
               name = name.replace(/(undefined)/g, " ").trim();//removes 'undefined' garbage and trims it
               
               first_letters = name.match(/[A-Z]+/g);

              
               for(j in first_letters) {
                 name = name.replace(first_letters[j], " " + first_letters[j]);
               }

               name = name.trim();
               

               var numberPattern = /\d+/g;
               var date = prefix.match(numberPattern);//retrieves only numerical value from it
               

               episode.audiofile = p.name;
               episode.name = name;
               episode.url = url + p.name;
               episode.date_aired = "19"+date[0]+"-"+date[1]+"-"+date[2];
               episode.number = date[3];
               episode.active = "1";
               episode.show_id = show_id;
               

               episodes.push(episode);           
           }

        }

        res.send(episodes);
      
    });


    });
}

exports.russianpodcast = function(req, res) {
    var show_id = "57878f730b692458990f95e3";
    var url =  "http://russianpodcast.eu/wa_files/";
    var show = "russian podcasts";
    var file = show + ".xml";  
    
    fs.readFile('./files/' + file, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    console.log("parsing xml file");

    parseString(data, function (err, result) {  

        var episodes = [];     

        for(var i=0;i<result.rss["channel"].length;i++) {
            var node = result.rss["channel"][i];
            var episodes = [];
            
            for(var j=0;j<node.item.length;j++) {
                
                var episode = {};

                episode.name = node.item[j].title[0];

                var ep_number = node.item[j].title[0].match(/\d+\./g);                

                if(ep_number != null) {                
                    var n=eval(ep_number[0])     
                    episode.number = n+"";        
                }
                
                var dt = node.item[j].pubDate[0].replace("-0000", "").replace("+0000", "").trim();
                dt = dt.weekLize().dateLize();
                
                episode.date_aired =  dt;

                episode.active = "1";
                episode.audiofile = node.item[j].enclosure[0]["$"].url.replace(url, "");    
                episode.url =  node.item[j].enclosure[0]["$"].url;    
                episode.show_id =  "57878f730b692458990f95e3";


                episodes.push(episode);
            }
            
        }

        res.send(episodes);
      
    });


    });
}




exports.retrieve = function(req, res) {

  var show = req.params["show"];

  var file = show+".xml";  

  var tmp_url_str = show.replace(/\s/g, '_');


  url = urls[tmp_url_str];

  fs.readFile('./files/' + file, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    console.log("parsing xml file");

    parseString(data, function (err, result) {

       var episodes = [];
       var thumb_png;
       var thumb_jpg;

       for(var i=0;i<result.files.file.length;i++) {
           

           var p = result.files.file[i]["$"];

           if(p.name.indexOf("jpg") !== -1) {
              thumb_jpg = p.name;
           }

           else if(p.name.indexOf("png") !== -1) {
              thumb_png = p.name;
           }  

           else if(p.name.indexOf("mp3") !== -1) {

           var episode = {};

           var name = p.name.replace(/\-/ig, ' ').replace(".mp3", "");

           episode.audiofile = p.name;
           episode.name = name;
           episode.url = url + p.name;

           episodes.push(episode);           
        }       

         if(i+1 === result.files.file.length) {

            var show = {};

            show.name = tmp_url_str.replace(/\_/g, ' ').capitalize();
            if(thumb_png != null)
              show.thumb_png = url + thumb_png;

            if(thumb_jpg != null)
              show.thumb_jpg = url + thumb_jpg;

            
            show.episodes = episodes;
            res.send(show);    
         }
       }
       

      
    });


  }); 

  
}