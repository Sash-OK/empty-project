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
            template: '{{_ctrl.text}}<br><component data-text="_ctrl.text"></component>',
            url: '/',
            controller: stateCtrl,
            controllerAs: '_ctrl',
            resolve: {
                stateText: () => 'test'
            }
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}

function stateCtrl(stateText) {

    const _ctrl = this;
    _ctrl.text = stateText;
}