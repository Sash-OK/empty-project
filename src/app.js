'use strict';

import 'angular';
import '@uirouter/angularjs';
import 'angular-sanitize';
import 'angular-animate';
import 'ngstorage/ngStorage';
import 'angular-permission';
import 'restangular';

import './styles/app';

const requireComponent = require.context('./modules/', true, /^\.\//);

requireComponent.keys().forEach(function (componentPath) {
    try {
        requireComponent(componentPath);
    } catch (errorInsideComponent) {
        console.info('Ошибка при подключении компонента ' + componentPath);
        console.error(errorInsideComponent);
    }
});