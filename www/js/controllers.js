angular.module('app.controllers', [])
  
.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('cartCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
    debugger;
    $scope.takePicture = function() {
        var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            //targetWidth: 300,
            //targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
        navigator.camera.getPicture(successCallback, errorCallback ,options)/*.then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });*/
    }
    function successCallback(imageData){
        debugger;
        //alert(imageData);
        $scope.imgURI = "data:image/jpeg;base64," + imageData;

        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;
    }

    function errorCallback(error){
        debugger;
    }
}])
   
.controller('chatCtrl', ['$scope', '$stateParams', '$firebaseArray', '$ionicUser', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseArray, $ionicUser) {
    $scope.data = {
        message : ''
    };

    var ref = firebase.database().ref().child('messages');
    
    /*
    ref.on('child_added', function(){
        
    });
    */

    $scope.messages = $firebaseArray(ref);
    
    $scope.addMessage = function(){
        $scope.messages.$add({
          text: $scope.data.message,
          email: $ionicUser.details.email,
          name: $ionicUser.details.name
        });
        $scope.data.message = '';
        
    }
}])
   
.controller('cloudCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('menuCtrl', ['$scope', '$state', '$ionicAuth', '$ionicUser', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $ionicAuth, $ionicUser) {
    $scope.userData = $ionicUser.details;
   
    $scope.logout = function(){
        $ionicAuth.logout();
        $state.go('login');
    }

}])
   
.controller('loginCtrl', ['$scope', '$state', '$ionicAuth', '$ionicUser', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $ionicAuth, $ionicUser) {

    $scope.data = {
        email: 'antony@boyart.com',
        password: 'xpa38'
    };
    
    $scope.error = '';
    $scope.hasError = false;
    
    if($ionicAuth.isAuthenticated()){
        $ionicUser.load().then(function(){
           $state.go('menu.home'); 
        });
    }
    
    $scope.login = function(){
        $scope.error = '';
        $scope.hasError = false;
        
        $ionicAuth.login('basic', $scope.data).then(function(){
            $state.go('menu.home');
        }, function(err){
            debugger;
            $scope.hasError = true;
            $scope.error = 'Error logging in';
        });
        
    }
}])
   
.controller('signupCtrl', ['$scope', '$state', '$ionicAuth', '$ionicUser', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $ionicAuth, $ionicUser) {

    $scope.data = {
        name: '',
        email: '',
        password: ''
    };
    
    $scope.error = '';
    $scope.hasError = false;
    
    $scope.signup = function(){
        $scope.error = '';
        $scope.hasError = false;
        
        $ionicAuth.signup($scope.data).then(function(){
            $ionicAuth.login('basic', $scope.data).then(function(){
                $state.go('menu.home');
            });
            
        }, function(err){
            debugger;
            $scope.hasError = true;
            var error_lookup = {
                'required_email':'Missing email',
                'required_password': 'Missing password',
                'conflict_email': 'A user has already signed up with that email',
                'conflict_username': 'A user has already signed up with that username',
                'invalid_email': 'The email is not valid'
            };
            
            $scope.error = error_lookup[err.details[0]];
        });
        
    }
}])
 