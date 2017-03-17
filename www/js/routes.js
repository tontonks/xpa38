angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.general', {
    url: '/myProfile',
    views: {
      'side-menu21': {
        templateUrl: 'templates/general.html',
        controller: 'generalCtrl'
      }
    }
  })

  .state('picture', {
    url: '/picture',
    templateUrl: 'templates/picture.html',
    controller: 'pictureCtrl'
  })

  .state('chat', {
    url: '/chat',
    templateUrl: 'templates/chat.html',
    controller: 'chatCtrl'
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
	params: {
		id: ""		
},
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

  .state('menu.details', {
    url: '/todoDetails',
	params: {
		id: ""		
},
    views: {
      'side-menu21': {
        templateUrl: 'templates/details.html',
        controller: 'detailsCtrl'
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

  .state('menu.questions', {
    url: '/questions',
	params: {
		contactId: "",
		contactName: ""		
},
    views: {
      'side-menu21': {
        templateUrl: 'templates/questions.html',
        controller: 'questionsCtrl'
      }
    }
  })

  .state('menu.messages', {
    url: '/page9',
	params: {
		questionId: ""		
},
    views: {
      'side-menu21': {
        templateUrl: 'templates/messages.html',
        controller: 'messagesCtrl'
      }
    }
  })

  .state('menu.allQuestions', {
    url: '/page14',
    views: {
      'side-menu21': {
        templateUrl: 'templates/allQuestions.html',
        controller: 'allQuestionsCtrl'
      }
    }
  })

  .state('menu.Title', {
    url: '/todoEdit',
	params: {
		id: ""		
},
    views: {
      'side-menu21': {
        templateUrl: 'templates/Title.html',
        controller: 'TitleCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/login')

  

});