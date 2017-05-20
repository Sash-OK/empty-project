'use strict';

import 'angular';
//import 'script!jquery/dist/jquery.min.js';
import './styles/app';
/*import 'angular-file-upload/dist/angular-file-upload.min';
import 'angular-filesize-filter/angular-filesize-filter';

import 'angular-sanitize';
import 'angular-animate';
import 'ngstorage/ngStorage';*/

const requireComponent = require.context('./modules/', true, /^\.\//);

requireComponent.keys().forEach(function (componentPath) {
    try {
        requireComponent(componentPath);
    } catch (errorInsideComponent) {
        console.info('Ошибка при подключении компонента ' + componentPath);
        console.error(errorInsideComponent);
    }
});