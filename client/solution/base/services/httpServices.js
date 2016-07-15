
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