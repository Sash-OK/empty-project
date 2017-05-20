import module from '../';

module.config(OnConfig);

/* @ngInject */
function OnConfig($stateProvider, $urlRouterProvider, $locationProvider) {

    //$urlRouterProvider.otherwise('/');
    $urlRouterProvider.otherwise( function($injector) {
        let $state = $injector.get("$state");
        $state.go('site.public.main');
    });

    $stateProvider
    // Каркас сайта
        .state('site', {
            template: '<h1>ROUTER</h1>',
            url: '/',
            abstract: false,
            controller: function () {
                debugger;
            },
            controllerAs: '_ctrl'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}