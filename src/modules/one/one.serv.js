import module from '../';

export default module.factory('oneService', oneService);

function oneService() {

    return {
        test: text => {
            console.log('oneService - ' + text)
        }
    }
}