import module from '../../';

export default module.controller('componentCtrl', componentCtrl).name;


function componentCtrl($state, oneService) {

    oneService.test('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
}