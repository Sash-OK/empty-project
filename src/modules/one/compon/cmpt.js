import module from '../../';
import View from '../one.html';

module.component('component', component());

function component() {
    return {
        templateUrl: View,
        controller: 'componentCtrl',
        controllerAs: '_ctrl',
        bindings: {
            news: '<'
        }
    }
}


