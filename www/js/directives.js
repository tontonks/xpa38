angular.module('app.directives', [])



/*
.directive('stopEvent', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind('click', function (e) {
                e.preventDefault(); // added for ionic
                e.stopPropagation();
            });
        }
    };
})*/

.directive('activePageHighlight', ['$rootScope', '$state', function($rootScope, $state){

   return function ($scope, $element, $attr) {
       
     function checkUISref(){
       if ($state.is($attr['uiSref'])){
             $element.addClass('active-page-highlight');
         } else {
             $element.removeClass('active-page-highlight');
         }
     }
     
     checkUISref();
       
     $rootScope.$on('$stateChangeSuccess', function(){
         checkUISref();
         
     })
   };

}]);