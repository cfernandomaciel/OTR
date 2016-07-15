module.exports = function(grunt) {
   
    grunt.initConfig(
	{
        pkg: grunt.file.readJSON('package.json'),        			
        concat : {
        		vendor : {
        			src: ['bower_components/jquery/dist/jquery.min.js', 'bower_components/musique/musique-min.js',
        			'bower_components/angular/angular.min.js', 'bower_components/angular-animate/angular-animate.min.js', 
        			'bower_components/angular-messages/angular-messages.min.js', 'bower_components/angular-aria/angular-aria.min.js', 
        			'bower_components/angular-material/angular-material.min.js', 'bower_components/angular-route/angular-route.min.js', 
        			'bower_components/angular-resource/angular-resource.min.js', 'bower_components/angular-sanitize/angular-sanitize.min.js'],
        			dest : 'vendor/vendorscripts.concat.js',
        		},
        		solution : {
					src : ['solution/app.js', 'solution/base/services/appStateService.js',
        			'solution/base/models/radioshow.js', 'solution/base/models/episode.js',
        			'solution/base/services/httpServices.js', 'solution/base/controllers/episodeCtrl.js', 
                    'solution/base/controllers/radioCtrl.js', 'solution/base/controllers/frontEndCtrl.js'],
        			dest : 'scripts/solution-otr-concat.js',
        		},            		
        },
		uglify : {
		  min : {
		    files : { 'scripts/solution-otr-1.0.0.js' : 
		    	['scripts/solution-otr-concat.js'] },
		 }
		},
		copy : {
			main : {
				src : ['bower_components/angular-material/angular-material.min.css'],
				dest : 'assets/styles/angular-material.min.css',
			},
		},

		
    });

    // concat related tasks        
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');    
    grunt.loadNpmTasks('grunt-contrib-copy');    

    grunt.registerTask('default', ['concat', 'copy']);

};
