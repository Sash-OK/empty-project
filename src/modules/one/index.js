import module from '../';

import view from './one.html';

module.config(OnConfig);

/* @ngInject */
function OnConfig($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise( function($injector) {
        let $state = $injector.get("$state");
        $state.go('site');
    });

    $stateProvider
    // Каркас сайта
        .state('site', {
            templateUrl: view,
            url: '/',
            controller: function () {

            },
            controllerAs: '_ctrl'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}