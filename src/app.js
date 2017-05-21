'use strict';

import 'angular';
import '@uirouter/angularjs';
import 'angular-sanitize';
import 'angular-animate';

import './styles/app';
import 'ngstorage/ngStorage';

const requireComponent = require.context('./modules/', true, /^\.\//);

requireComponent.keys().forEach(function (componentPath) {
    try {
        requireComponent(componentPath);
    } catch (errorInsideComponent) {
        console.info('Ошибка при подключении компонента ' + componentPath);
        console.error(errorInsideComponent);
    }
});