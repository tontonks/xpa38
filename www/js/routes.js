angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.myProfile', {
    url: '/myProfile',
    views: {
      'side-menu21': {
        templateUrl: 'templates/myProfile.html',
        controller: 'myProfileCtrl'
      }
    }
  })

  .state('menu.picture', {
    url: '/picture',
    views: {
      'side-menu21': {
        templateUrl: 'templates/picture.html',
        controller: 'pictureCtrl'
      }
    }
  })

  .state('menu.chat', {
    url: '/chat',
    views: {
      'side-menu21': {
        templateUrl: 'templates/chat.html',
        controller: 'chatCtrl'
      }
    }
  })

  .state('cloud', {
    url: '/page3',
    templateUrl: 'templates/cloud.html',
    controller: 'cloudCtrl'
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('menu.contactDetails', {
    url: '/contactDetails',
	params: {
		id: ""		
},
    views: {
      'side-menu21': {
        templateUrl: 'templates/contactDetails.html',
        controller: 'contactDetailsCtrl'
      }
    }
  })

  .state('menu.todoDetails', {
    url: '/page13',
    views: {
      'side-menu21': {
        templateUrl: 'templates/todoDetails.html',
        controller: 'todoDetailsCtrl'
      }
    }
  })

  .state('menu.todos', {
    url: '/todos',
    views: {
      'side-menu21': {
        templateUrl: 'templates/todos.html',
        controller: 'todosCtrl'
      }
    }
  })

  .state('menu.contacts', {
    url: '/contacts',
    views: {
      'side-menu21': {
        templateUrl: 'templates/contacts.html',
        controller: 'contactsCtrl'
      }
    }
  })

  .state('page', {
    url: '/page16',
    templateUrl: 'templates/page.html',
    controller: 'pageCtrl'
  })

  .state('test', {
    url: '/page17',
    templateUrl: 'templates/test.html',
    controller: 'testCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});