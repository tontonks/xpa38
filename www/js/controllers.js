angular.module('app.controllers', [])
  
.controller('myProfileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('pictureCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
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
   
.controller('chatCtrl', ['$scope', '$stateParams', '$firebaseArray', '$ionicUser', '$ionicLoading', 'awlert', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseArray, $ionicUser, $ionicLoading, awlert) {
    $ionicLoading.show({ template: 'Chargement...' });
    
    $scope.data = {
        message : ''
    };
    $scope.glued = true;

    var initialDataLoaded = false;
    var ref = firebase.database().ref().child('messages');
    
    ref.on('child_added', function(data){
        if(initialDataLoaded){
            
            $scope.glued = true;
            awlert.neutral('Awesome neutral message for your user', 1000);
        }
    });
    
    ref.once('value', function(snapshot) {
      initialDataLoaded = true;
      $ionicLoading.hide();
    });
    
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
            
            console.log($ionicUser);
           $state.go('menu.myProfile'); 
        });
    }
    
    $scope.login = function(){
        $scope.error = '';
        $scope.hasError = false;
        
        $ionicAuth.login('basic', $scope.data).then(function(){
            $state.go('menu.myProfile');
        }, function(err){
            
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
                $state.go('menu.myProfile');
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
   
.controller('contactDetailsCtrl', ['$scope', '$state', '$stateParams', '$firebaseArray', '$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state,$stateParams, $firebaseArray, $ionicLoading ){
    $ionicLoading.show({ template: 'Chargement...' });
    
    var contactId = $stateParams.id;
    
    init();
    
    
    
    function init(){
        var contactRef = firebase.database().ref('contacts/' + contactId);
        
        //$scope.contacts = $firebaseArray(contactRef);
        
        
        
        
        firebase.database().ref('/contacts/' + contactId).once('value').then(function(snapshot) {
          $scope.currentContact = snapshot;
          
          $ionicLoading.hide();
          // ...
        })
    }
    
    
    $scope.sendMessageToContact = function(){
        
        $state.go('menu.questions' , {contactId : $scope.currentContact.key})
    }

}])
   
.controller('todoDetailsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

var todoId = $stateParams.id;

    init();

    function init() {
        debugger;
        var todoRef = firebase.database().ref('todoList/' + todoId);

        firebase.database().ref('/todoList/' + todoId).once('value').then(function (snapshot) {
            $scope.currentTodo = snapshot.val();
            // ...
        })
    }

    $scope.updateTodo = function (todo) {
        firebase.database().ref('todo/' + todo.id).set({
            username: name,
            email: email,
            profile_picture: imageUrl
        });

        firebase.database().ref('todo/' + todo.id).update();
    }

}])
   
.controller('todosCtrl', ['$scope', '$state', '$stateParams', '$firebaseArray', '$ionicUser', '$ionicLoading', '$ionicListDelegate', 'awlert', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams, $firebaseArray, $ionicUser, $ionicLoading, $ionicListDelegate, awlert) {
    $ionicLoading.show({ template: 'Chargement...' });
    var ref = firebase.database().ref('users/' + $ionicUser.id + '/todoList');

    $scope.todoList = [];

    ref.on('value', function (snapshot) {
        snapshot.forEach(function (snapShotItem) {

            firebase.database().ref('todoList/' + snapShotItem.key).on('value', function (childSnapShot) {
                $scope.todoList.push(childSnapShot);

                $ionicLoading.hide();
            });
        });
    });


    $scope.viewTodoDetails = function (todo) {
        $state.go('menu.todoDetails', { id: todo.key });
    }
    
    $scope.deleteTodo = function (todo) {
        var todoVal = todo.val();

        var todoName = todoVal.name;
        ref.child(todoVal.key).remove().then(_ => console.log('The todo ' + todoName + ' was successfully deleted!'));
    }

    $scope.pendingTodo = function (todo) {
        var todoVal = todo.val();

        if (todoVal.status !== "Pending") {
            var todoUpdate = {
                status: "Pending",
                contacts: todoVal.contacts,
                description: todoVal.description,
                name: todoVal.name,
                tags: todoVal.tags
            };

            ref.child(todoVal.key).update(todoUpdate).then(_ => console.log(todoVal.name + 'has been set as pending'));

            $ionicListDelegate.closeOptionButtons();
        }
    }
    
    $scope.completeTodo = function (todo) {
        var todoVal = todo.val();

        if (todoVal.status !== "Done") {
            var todoUpdate = {
                status: "Done",
                contacts: todoVal.contacts,
                description: todoVal.description,
                name: todoVal.name,
                tags: todoVal.tags
            };

            ref.child(todoVal.key).update(todoUpdate).then(_ => console.log(todoVal.name + 'has been set as done'));

            $ionicListDelegate.closeOptionButtons();
        } else {
            console.log('The todo status is already done');
        }
    }

    $scope.addTodo = function (newTodo) {
        $scope.todoList.$add({
            name: newTodo.name,
            description: newTodo.title,
            status: "New"
        });
    }

}])
   
.controller('contactsCtrl', ['$scope', '$stateParams', '$firebaseArray', '$ionicUser', '$ionicLoading', 'awlert', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseArray, $ionicUser, $ionicLoading, awlert, $state) {
    $ionicLoading.show({ template: 'Chargement...' });
    
    //var ref = firebase.database().ref().child('contacts');
    
    $scope.contacts = []; //$firebaseArray(ref);
    
    
    //ref.once('value', function(snapshot) {
    //  $ionicLoading.hide();
    //});
    /*debugger;
    var ref = firebase.database().ref('users/' + $ionicUser.id + '/contacts');
    ref.on('value', function(snapshot) {
        debugger;
      //updateStarCount(postElement, snapshot.val());
    });
    
    
    return;
    */
    
    
    firebase.database().ref('users/' + $ionicUser.id + '/contacts').on('value', function(snapshot){
        
        
        
        snapshot.forEach(function(snapShotItem) {
          
          firebase.database().ref('contacts/' + snapShotItem.key).on('value', function(childSnapShot){
              $scope.contacts.push(childSnapShot);
              
              $ionicLoading.hide();
          });
        });
        
    });
    
    
    
      /*.then(function(snapshot) {
         debugger;
        
        
        
        snapshot.val()[$ionicUser.id].contacts.forEach(function(childSnapshot) {
            //debugger;
          // key will be "ada" the first time and "alan" the second time
          var key = childSnapshot.key;
          // childData will be the actual contents of the child
          var childData = childSnapshot.val();
          
          //child.id = key;
          $scope.contacts.push(childData);
          console.log(childData);
      });
    });*/
    
    
    $scope.viewContactDetails = function(contact){
       
        $state.go('menu.contactDetails', { id : contact.key});
        
    }
}])
   
.controller('pageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('testCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('questionsCtrl', ['$scope', '$stateParams', '$state', '$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state, $ionicLoading) {
    init();
    $scope.questions = [];
 
    function init(){
        
        var contactRef = firebase.database().ref('questions/').orderByChild('contact').equalTo($stateParams.contactId);
        
        contactRef.on('value', function(snapshot){
            //debugger;
            snapshot.forEach(function(snapShotItem) {
          
             // debugger;
              //firebase.database().ref('ques/' + snapShotItem.key).on('value', function(childSnapShot){
                  $scope.questions.push(snapShotItem);
                  
                  $ionicLoading.hide();
              //});
              
              
             /* groupRef.child(childSnapshot.key).once(function(){
                  
                  
              });*/
            });
            
        });
        
    }
    
    $scope.viewMessages = function(questionId){
        $state.go('menu.messages', {questionId: questionId});
    }
    
}])
   
.controller('messagesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
    $scope.messages = [];

    init();
    
    function init(){
        
        firebase.database().ref('questions/' + $stateParams.questionId + '/messages').on('value', function(snapshot){
        
        
        
        snapshot.forEach(function(snapShotItem) {
          
          firebase.database().ref('messages/' + snapShotItem.key).on('value', function(childSnapShot){
              $scope.messages.push(childSnapShot);
              
              //$ionicLoading.hide();
          });
        });
        
    });
    }
}])
 