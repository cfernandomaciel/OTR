var express = require('express'),
    http = require('http'),
    path = require('path'),
   // config = require('./config'),
    archive = require('./routes/archive');

var app = express.createServer();


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');


    next();
}


app.configure(function() {
    app.set('port', process.env.PORT || 4000);
    app.set('views', __dirname + '/views');
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(allowCrossDomain);
    app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(app.router);
    
    
   // database.initialize(config.mongo.host, config.mongo.port, config.mongo.dbName)

});

app.configure('development', function(){
  app.use(express.errorHandler());  
});


app.options('*' , function(req,res) {res.send({});})


app.get('/retrieve/:show', archive.retrieve);
app.get('/gunsmoke', archive.gunsmoke);
app.get('/xminusone', archive.xminusone);
app.get('/dimensionx', archive.dimensionx);
app.get('/philipmarlowe', archive.philipmarlowe);
app.get('/dragnet', archive.dragnet);
app.get('/russianpodcast', archive.russianpodcast);

//app.put('/teste/:id', teste.update);
//app.post('/teste', teste.insert);

/*setInterval(function() {
    player.pidFinder();
}, 2000)*/



app.listen(3000, function(){
    console.log("Express server listening on port 3000");
});
