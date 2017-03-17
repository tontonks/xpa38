angular.module('app.controllers', [])
  
.controller('generalCtrl', ['$scope', '$stateParams', '$firebaseArray', '$ionicUser', '$ionicLoading', 'awlert', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseArray, $ionicUser, $ionicLoading, awlert) {
    //  var temp = $ionicUser.details; 
    //  debugger;
    //  $scope.usrData = temp;
    //$ionicLoading.show({ template: 'Loading...' });
   $ionicLoading.show({ template: 'Loading...' });
    
    
    init();
    $scope.quest = [];
 
    function init(){
        
        var cRef = firebase.database().ref('questions/');
        var uRef = firebase.database().ref('users/' + $ionicUser.id);
       //var tdRef = firebase.database().ref('users/' + $ionicUser.id + '/todoList');


        cRef.on('value', function(snapshot){
            //debugger;
            snapshot.forEach(function(snapShotItem) {
            $scope.quest.push(snapShotItem);             
        });
        //$ionicLoading.hide(); 
            
        });

        uRef.on('value', function(snapshot){
            $scope.currUser = snapshot; 

            $scope.td = Object.keys(snapshot.val().todoList).length; 

            $scope.acts = snapshot.val().recentActivity;
            
            $scope.startDate =  moment.unix($scope.currUser.val().assignmentStartDate).format("DD-MM-YYYY");
            $scope.endDate =  moment.unix($scope.currUser.val().projectedEndDate).format("DD-MM-YYYY");
            $ionicLoading.hide();
        });

      /* tdRef.on('value', function(snapshot){
            snapshot.forEach(function(snapShotItem) {
            $scope.tdList.push(snapShotItem);             
            });
        }); */
    } 
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
           $state.go('menu.general'); 
        });
    }
    
    $scope.login = function(){
        $scope.error = '';
        $scope.hasError = false;
        
        $ionicAuth.login('basic', $scope.data).then(function(){
            $state.go('menu.general');
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
                $state.go('menu.general');
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
    $ionicLoading.show({ template: 'Loading...' });
    
    var contactId = $stateParams.id;
    
    init();
    
    
    
    function init(){
        var contactRef = firebase.database().ref('contacts/' + contactId);
        
        //$scope.contacts = $firebaseArray(contactRef);
        
        
        
        
        firebase.database().ref('/contacts/' + contactId).once('value').then(function(snapshot) {
          $scope.currentContact = snapshot;
          $scope.phoneNumber = "tel:" + $scope.currentContact.val().phoneNumber;
          $ionicLoading.hide();
          // ...
        })
    }
    
    
    $scope.sendMessageToContact = function(){
        
        $state.go('menu.questions' , {contactId : $scope.currentContact.key, contactName : $scope.currentContact.val().name})
    }

}])
   
.controller('detailsCtrl', ['$scope', '$stateParams', '$ionicLoading', '$state', '$timeout', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicLoading, $state, $timeout, $ionicPopup) {
    var todoId = $stateParams.id;

    init();

    function init() {
        $ionicLoading.show({ template: 'Loading...' });
        $scope.todoContacts = {};

        firebase.database().ref('/todoList/' + todoId).once('value').then(function (snapshot) {
            
            $scope.currentTodo = snapshot.val();
            $scope.dueDate = moment.unix($scope.currentTodo.dueDate).format("DD-MM-YYYY");

            // Fetch contact
            for (var contactKey in $scope.currentTodo.contacts) {
                var contactRef = firebase.database().ref('contacts/' + contactKey);
                firebase.database().ref('/contacts/' + contactKey).once('value').then(function (snapshot) {
                    $scope.todoContacts[snapshot.key] = snapshot;

                    // ...
                });
            }

            $ionicLoading.hide();
        }, function (err) {
            $ionicLoading.hide();
        });
    }

    $scope.doRefresh = function () {
        $scope.todoContacts = {};

        firebase.database().ref('/todoList/' + todoId).once('value').then(function (snapshot) {
            $scope.currentTodo = snapshot.val();
            $scope.dueDate = moment.unix($scope.currentTodo.dueDate).format("DD-MM-YYYY");

            for (var contactKey in $scope.currentTodo.contacts) {
                var contactRef = firebase.database().ref('contacts/' + contactKey);
                firebase.database().ref('/contacts/' + contactKey).once('value').then(function (snapshot) {
                    $scope.todoContacts[snapshot.key] = snapshot;
                    $scope.$broadcast('scroll.refreshComplete');
                });
            }
        });
    }

    $scope.editTodo = function () {
        $state.go('menu.Title', { id: todoId });
    }

    $scope.showContact = function (contact) {
        $state.go('menu.contactDetails', { id: contact.key });
    }

    $scope.takePicture = function () {
        
        
        
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
        
        navigator.camera.getPicture(successCallback, errorCallback ,options);
    }
    
        function successCallback(imageData){
        //$scope.showConfirm = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Confirm',
            template: 'Do you want to attach this picture to the task ?'
        });

        confirmPopup.then(function(res) {
            if(res) {
                $ionicLoading.show({ template: 'Attaching picture...' });

                savePicture("data:image/jpeg;base64," + imageData);
            } 
            else {
            // ...
            }
        });
    }
    
    function errorCallback(err){
        console.log('error: ', err);
    }

    function savePicture(imgURI) {
        $timeout(function () {
            $ionicLoading.hide();
        }, 300);
    }
}])
   
.controller('todosCtrl', ['$scope', '$state', '$stateParams', '$firebaseArray', '$ionicUser', '$ionicLoading', '$ionicListDelegate', 'awlert', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams, $firebaseArray, $ionicUser, $ionicLoading, $ionicListDelegate, awlert) {
    $ionicLoading.show({ template: 'Loading...' });
    var ref = firebase.database().ref('users/' + $ionicUser.id + '/todoList');

    ref.on('value', function (snapshot) {
        $scope.todoList = [];
        snapshot.forEach(function (snapShotItem) {

            firebase.database().ref('todoList/' + snapShotItem.key).on('value', function (childSnapShot) {
                $scope.todoList.push(childSnapShot);

                $ionicLoading.hide();
            });
        });
    });


    $scope.viewTodoDetails = function (todo) {
        $state.go('menu.details', { id: todo.key });
    }
    
    $scope.deleteTodo = function (todo) {
        var todoVal = todo.val();
        ref.child(todo.key).remove().then(_ => console.log('The todo ' + todoVal.name + ' was successfully deleted!'));
    }

    $scope.pendingTodo = function (todo) {
        var todoVal = todo.val();

        if (todoVal.status !== "Pending") {
            todoVal.status = "Pending";

            var updates = {};
            updates['/todoList/' + todo.key] = todoVal;

            firebase.database().ref().update(updates).then(function () {
                console.log(todoVal.name + 'has been set as done');
            });

            $ionicListDelegate.closeOptionButtons();
        }
    }
    
    $scope.completeTodo = function (todo) {
        var todoVal = todo.val();

        if (todoVal.status !== "Done") {
            todoVal.status = "Done";

            var updates = {};
            updates['/todoList/' + todo.key] = todoVal;

            firebase.database().ref().update(updates).then(function () {
                console.log(todoVal.name + 'has been set as done');
            });

            $ionicListDelegate.closeOptionButtons();
        } else {
            console.log('The todo status is already done');
        }
    }

    $scope.addTodo = function (newTodo) {
        $state.go('menu.Title', { id: -1 });
    }

    $scope.doRefresh = function () {
        $scope.todoList = [];
        ref.on('value', function (snapshot) {
            snapshot.forEach(function (snapShotItem) {
                firebase.database().ref('todoList/' + snapShotItem.key).on('value', function (childSnapShot) {
                    $scope.todoList.push(childSnapShot);
                    $scope.$broadcast('scroll.refreshComplete');
                });
            });
        });
    }

}])
   
.controller('contactsCtrl', ['$scope', '$stateParams', '$firebaseArray', '$ionicUser', '$ionicLoading', 'awlert', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseArray, $ionicUser, $ionicLoading, awlert, $state) {
    $ionicLoading.show({ template: 'Loading...' });
    
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
    
    
    firebase.database().ref('users/' + $ionicUser.id + '/contacts').orderByChild('name').on('value', function(snapshot){
        
        $scope.contacts = [];
        
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
   
.controller('questionsCtrl', ['$scope', '$stateParams', '$state', '$ionicLoading', '$ionicPopup', '$ionicUser', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicLoading, $ionicPopup, $ionicUser) {
    var contactRef;
    var addQuestionsRef;
    var addMessageRef;
    
    init();
    //$scope.questions = [];
    $scope.model = {
        title:'',
        messageText : ''
    };
 
    function init(){
        
        $ionicLoading.show({ template: 'Loading...' });
        
      addQuestionsRef = firebase.database().ref().child('questions');
      addMessageRef = firebase.database().ref().child('messages');
      /*
      questionMessageRef =  firebase.database().ref('users/' + $ionicUser.id + '/questions');
            
        questionMessageRef.on('value', function(snapshot){
            questionsSnapshot =   snapshot; 
            var questionRef = firebase.database().ref('questions').orderByChild('contact').equalTo($stateParams.contactId);
            
            $scope.questions = []; 
            snapshot.forEach(function(snapShotItem) {
            
              firebase.database().ref('questions/' + snapShotItem.key).on('value', function(childSnapShot){
                  $scope.questions.push(childSnapShot);
                  console.log(childSnapShot.val());
                  debugger;
                  
              });
                //
            
            });
        });
        */
      
         questionMessageRef = firebase.database().ref('questions/').orderByChild('contact').equalTo($stateParams.contactId);
        
        questionMessageRef.on('value', function(snapshot){
            //debugger;
            $scope.questions = [];
            snapshot.forEach(function(snapShotItem) {
          
                  $scope.questions.push(snapShotItem);
                  
              
            });
            $ionicLoading.hide();
        });
        
        
        
    }
    
    $scope.reopenQuestion = function(currentQuestion){
        var update ={};
        update['questions/' + currentQuestion.key + '/status'] = 'Pending';
        firebase.database().ref().update(update);
        
    }
    
    $scope.closeQuestion = function(currentQuestion){
        var update ={};
        update['questions/' + currentQuestion.key + '/status'] = 'Done';
        firebase.database().ref().update(update);
        
    }
    
    $scope.viewMessages = function(questionId){
        $state.go('menu.messages', {questionId: questionId});
    }
    
    
    $scope.addQuestion = function(){
        var myPopup = $ionicPopup.show({
        template: '<div class="add-message">\
                    <div class="form-items">\
                        <label>Subject</label>\
                    </div>\
                    <div class="form-items">\
                        <input type="text" required ng-model="model.title" />\
                    </div>\
                    <div class="form-items">\
                        <label>Message</label>\
                    </div>\
                    <div class="form-items">\
                        <textarea type="text" required ng-model="model.messageText" ></textarea>\
                    </div>\
                   </div>',
        title: 'New Question',
        //subTitle: 'Please use normal things',
        scope: $scope,
        buttons: [
          { text: 'Cancel',
          type:'button-assertive',
            onTap: function(e){
                return false;
            }
          },
          {
            text: '<b>Validate</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.model.title) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } 
              else {
                return $scope.model;
              }
            }
          }
        ]
      });
 

      myPopup.then(function(res) {
          
          if(!res){
              return;
          }
        //console.log('Tapped!', res);
        //debugger;
        /*$scope.model = {
            title:'',
            messageText : ''
        };*/
        
        var newQuestion = addQuestionsRef.push({
            title: $scope.model.title,
            contact : $stateParams.contactId,
            contactName : $stateParams.contactName,
            status : 'Pending',
            //sender: $ionicUser.details.name,
            //fromExpat : true,
            timestamp: Date.now()
        });
        
        var item = addMessageRef.push({
            message: $scope.model.messageText,
            sender: $ionicUser.details.name,
            fromExpat : true,
            timestamp: Date.now()
        });
        
        var update ={};
        update['questions/' + newQuestion.key + '/messages/' + item.key] = true;
        update['users/' + $ionicUser.id + '/questions/' + newQuestionRef.key] = true;
        
        firebase.database().ref().update(update);
        
        
        $scope.model = {
            title:'',
            messageText : ''
        };
        $state.go('menu.messages', {questionId: newQuestion.key});
        
      });
    }
    
}])
   
.controller('messagesCtrl', ['$scope', '$stateParams', '$firebaseArray', 'awlert', '$ionicUser', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseArray, awlert, $ionicUser) {
    var questionsSnapshot;
    var addMessageRef;
    var syncMessage;
    var initialDataLoaded = false;
    var questionMessageRef;
    
    $scope.messages = [];
    $scope.data = {
        message: ''
    };
    

    init();
    
    function init(){
        
      addMessageRef = firebase.database().ref().child('messages');
      syncMessage = $firebaseArray(addMessageRef); 
        
        questionMessageRef =  firebase.database().ref('questions/' + $stateParams.questionId + '/messages');
        questionMessageRef.orderByChild('timestamp');
        
        questionMessageRef.on('value', function(snapshot){
        questionsSnapshot =   snapshot; 
        var messageRef = firebase.database().ref('messages');
        
        
        messageRef.on('child_added', function(data){
              
          if(initialDataLoaded){
              //debugger;
              //var newItem = data.key
              
             // questionMessageRef.push({newItem: true});
              
              //awlert.neutral('you received a message', 1000);
          }
      });
            
            $scope.messages.length = 0;  
        snapshot.forEach(function(snapShotItem) {
          
          
          
          
         var myMessageRef = firebase.database().ref('messages/' + snapShotItem.key);
         
         //$scope.messages = $firebaseArray(myMessageRef);
         //debugger;
              
          firebase.database().ref('messages/' + snapShotItem.key).on('value', function(childSnapShot){
            // debugger;
              
              var test = $scope;
              
              $scope.messages.push(childSnapShot);
              
              //$ionicLoading.hide();
              });
            });
            
        });
        
        initialDataLoaded = true;
    }
    
    
    addMessageRef.on('child_added', function(newData){
        /*if(initialDataLoaded){
            console.log(newData);
            
            var newObject = {};
            newObject[newData.key] = true;
            questionMessageRef.push(newObject);
        }*/
    });
     
    
    $scope.sendMessage = function(){
        //debugger;
        var item = addMessageRef.push({
            message: $scope.data.message,
            sender: $ionicUser.details.name,
            fromExpat : true,
            timestamp: Date.now()
        });
        
        console.log(item.key);
        
        var key = item.key;
        
        
        var update ={};
        update['questions/' + $stateParams.questionId + '/messages/' + item.key] = true;
        firebase.database().ref().update(update);
        
        $scope.data.message = '';
        //var newObject   = questionMessageRef; //[item.key] = true;
        //newObject[item.key] = true;
        //questionMessageRef.set(newObject);
            
            //questionMessageRef.push().update(item);
        
        item.then(function(itemAdd){
            //debugger;
            //questionMessageRef.push().update(item);
        });
        //syncMessage.$add();
    }
}])
   
.controller('allQuestionsCtrl', ['$scope', '$stateParams', '$state', '$ionicLoading', '$ionicPopup', '$ionicUser', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicLoading, $ionicPopup, $ionicUser, $timeout) {

var contactRef;
    var addQuestionsRef;
    var addMessageRef;
    
    init();
    
    //$scope.questions = [];
    $scope.model = {
        title:'',
        messageText : ''
    };
 
    function init(){
        $ionicLoading.show({ template: 'Loading...' });
       console.log('init'); 
      addQuestionsRef = firebase.database().ref().child('questions');
      addMessageRef = firebase.database().ref().child('messages');
      
      questionMessageRef =  firebase.database().ref('users/' + $ionicUser.id + '/questions');
        
        questionMessageRef.on('value', function(snapshot){
            //questionsSnapshot =   snapshot; 
            var questionRef = firebase.database().ref('questions');//.orderByChild('contact').equalTo($stateParams.contactId);
            
            $scope.questions = []; 
            
            snapshot.forEach(function(snapShotItem) {
            
              firebase.database().ref('questions/' + snapShotItem.key).on('value', function(childSnapShot){
                  $scope.questions.push(childSnapShot);
                  console.log(childSnapShot.val());
                  //debugger;
                  
              });
                //
                $ionicLoading.hide();
            });
            
            $timeout(function(){
                debugger;
                $scope.$apply();
            }, 2000);
        });
        
        
        firebase.database().ref('users/' + $ionicUser.id + '/contacts').on('value', function(snapshot){
        
            $scope.contacts = [];
            
            snapshot.forEach(function(snapShotItem) {
              
              firebase.database().ref('contacts/' + snapShotItem.key).on('value', function(childSnapShot){
                  $scope.contacts.push(childSnapShot);
                  
                  $ionicLoading.hide();
              });
            });
            
        });
        
        
        
      /*
         contactRef = firebase.database().ref('users/' + $ionicUser.id + '/questions/').orderByChild('contact').equalTo($stateParams.contactId);
        
        contactRef.on('value', function(snapshot){
            //debugger;
            $scope.questions = [];
            snapshot.forEach(function(snapShotItem) {
          
                  $scope.questions.push(snapShotItem);
                  
                  $ionicLoading.hide();
              
            });
            
        });
        
        */
        
    }
    
    $scope.reopenQuestion = function(currentQuestion){
        var update ={};
        update['questions/' + currentQuestion.key + '/status'] = 'Pending';
        firebase.database().ref().update(update);
        
    }
    
    $scope.closeQuestion = function(currentQuestion){
        var update ={};
        update['questions/' + currentQuestion.key + '/status'] = 'Done';
        firebase.database().ref().update(update);
        
    }
    
    $scope.viewMessages = function(questionId){
        $state.go('menu.messages', {questionId: questionId});
    }
    
    
    $scope.addQuestion = function(){
        var myPopup = $ionicPopup.show({
        template: '<div class="add-message">\
                    <div class="form-items">\
                        <label>Subject</label>\
                    </div>\
                    <div class="form-items">\
                        <input type="text" required ng-model="model.title" />\
                    </div>\
                    <div class="form-items">\
                        <label>Message</label>\
                    </div>\
                    <div class="form-items">\
                        <textarea ng-model="model.messageText"></textarea>\
                    </div>\
                    <div class="form-items">\
                        <label>Contact</label>\
                    </div>\
                    <div class="form-items">\
                        <select ng-options="contact as contact.val().name for contact in contacts" ng-model="model.contact"></select>\
                    </div>\
                   </div>',
        title: 'New Question',
        //subTitle: 'Please use normal things',
        scope: $scope,
        buttons: [
          { text: 'Cancel',
          type:'button-assertive',
            onTap: function(e){
                return false;
            }
          },
          {
            text: '<b>Validate</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.model.title) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } 
              else {
                return $scope.model;
              }
            }
          }
        ]
      });
 

      myPopup.then(function(res) {
        //console.log('Tapped!', res);
        debugger;
        var newQuestion = {
            title: $scope.model.title,
            //contact : $stateParams.contactId,
            contactName: '',
            status : 'Pending',
            timestamp: Date.now()
        };
        
        if($scope.model.contact !== null){
            newQuestion.contact = $scope.model.contact.key;
            newQuestion.contactName = $scope.model.contact.val().name;
        }
        
        var newQuestionRef = addQuestionsRef.push(newQuestion);
        
        var item = addMessageRef.push({
            message: $scope.model.messageText,
            sender: $ionicUser.details.name,
            fromExpat : true,
            timestamp: Date.now()
        });
        
        var update ={};
        update['questions/' + newQuestionRef.key + '/messages/' + item.key] = true;
        update['users/' + $ionicUser.id + '/questions/' + newQuestionRef.key] = true;
        
        firebase.database().ref().update(update);
        
        
        $scope.model = {
            title:'',
            messageText : '',
            contact : null
        };
        $state.go('menu.messages', {questionId: newQuestionRef.key});
        
      });
    }
}])
   
.controller('TitleCtrl', ['$scope', '$stateParams', 'awlert', '$ionicUser', '$ionicLoading', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, awlert, $ionicUser, $ionicLoading, $ionicPopup) {
    var todoId = $stateParams.id;

    init();

    function init() {
        $scope.booleanValues = ['Yes', 'No'];
        $scope.isNew = todoId === -1 ? true : false;
        
        if ($scope.isNew) {
            initNewTodo();
        } else {
            $scope.title = "Edit Todo";
            getTodo(todoId);
        }

        getContacts();
    }

    function getContacts() {
        var ref = firebase.database().ref('users/' + $ionicUser.id + '/contacts');
        ref.on('value', function (snapshot) {
            $scope.popupContacts = [];
            snapshot.forEach(function (snapShotItem) {
                firebase.database().ref('contacts/' + snapShotItem.key).on('value', function (childSnapShot) {
                    $scope.popupContacts.push(childSnapShot);
                });
            });
        });
    }

    function getTodo(id) {
        $ionicLoading.show({ template: 'Loading...' });
        var todoRef = firebase.database().ref('todoList/' + id);
        $scope.editContacts = {};

        firebase.database().ref('/todoList/' + id).once('value').then(function (snapshot) {
            $scope.todo = snapshot.val();
            $scope.dueDate = moment.unix($scope.todo.dueDate).format("DD-MM-YYYY");

            // Fetch contact
            for (var contactKey in $scope.todo.contacts) {
                var contactRef = firebase.database().ref('contacts/' + contactKey);
                firebase.database().ref('/contacts/' + contactKey).once('value').then(function (snapshot) {
                    $scope.editContacts[snapshot.key] = snapshot;
                });
            }

            $ionicLoading.hide();
        }, function (err) {
            $ionicLoading.hide();
        });
    }

    $scope.update = function () {
        // manipulate dueDate
        $scope.todo.dueDate = moment($scope.dueDate, "DD-MM-YYYY").unix();

        var updates = {};
        updates['/todoList/' + todoId] = $scope.todo;

        firebase.database().ref().update(updates).then(function (res) {
            awlert.neutral($scope.todo.name + ' is updated', 2000);
        });
    }

    $scope.save = function () {
        // manipulate dueDate
        $scope.todo.dueDate = moment($scope.dueDate, "DD-MM-YYYY").unix();
        var element = {
            name: $scope.todo.name,
            status: $scope.todo.status,
            privacy: $scope.todo.privacy,
            description: $scope.todo.description,
            dueDate: $scope.todo.dueDate
        };

        if ($scope.todo.contacts !== undefined) {
            element.contacts = $scope.todo.contacts;
        }
        var item = firebase.database().ref().child('todoList').push(element);

        $ionicLoading.show({ template: 'Adding new todo...' });

        var update = {};
        update['users/' + $ionicUser.id + '/todoList/' + item.key] = true;
        firebase.database().ref().update(update).then(function () {
            initNewTodo();
            $ionicLoading.hide();
        });
    }

    $scope.removeContact = function (contact) {
        delete $scope.todo.contacts[contact.key];
        delete $scope.editContacts[contact.key];
    }

    $scope.addContact = function () {
        var contactPopup = $ionicPopup.show({
            template: '<div class="add-contact">\
                        <div class="form-items">\
                            <label>Contact</label>\
                        </div>\
                        <div class="form-items">\
                            <select ng-options="contact as contact.val().name for contact in popupContacts | orderBy: \'name\'" ng-model="$parent.selectedContact"></select>\
                        </div>\
                    </div>',
            title: 'Add Contact',
            scope: $scope,
            buttons: [
              {
                  text: 'Cancel',
                  type: 'button-assertive',
                  onTap: function (e) {
                      return false;
                  }
              },
              {
                  text: '<b>Ok</b>',
                  type: 'button-positive',
                  onTap: function (e) {
                      return $scope.selectedContact;
                  }
              }
            ]
        });


        contactPopup.then(function (newContact) {
            if (newContact) {
                if ($scope.todo.contacts === undefined) {
                    $scope.todo.contacts = {};
                }

                if ($scope.editContacts === undefined) {
                    $scope.editContacts = {};
                }

                $scope.todo.contacts[newContact.key] = true;
                $scope.editContacts[newContact.key] = newContact;

                $scope.selectedContact = null;
            }
        });
    }

    function initNewTodo() {
        $scope.title = "Add Todo";
        $scope.todo = {
            status: "Pending",
        };
        $scope.editContacts = {};
        $scope.dueDate = moment().format("DD-MM-YYYY");
    }
}])
 