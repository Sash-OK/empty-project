import module from '../../';

export default module.controller('componentCtrl', componentCtrl).name;

function componentCtrl($state, oneService) {
    const _ctrl = this;

    _ctrl.$onInit = () => {
        this.text = 'SSSS';
    }
}