import module from '../';

module.config(OnConfig);


function OnConfig($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise( function($injector) {
        let $state = $injector.get("$state");
        $state.go('site');
    });

    $stateProvider
    // Каркас сайта
        .state('site', {
            template: '<component data-news="_ctrl.text"></component>',
            url: '/',
            controller: ggg,
            controllerAs: '_ctrl',
            resolve: {
                test: () => {

                }
            }
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}


function ggg(oneService) {

        let _ctrl = this;
    _ctrl.text = 'test';
        oneService.test(_ctrl.text);

}