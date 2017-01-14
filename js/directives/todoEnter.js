/*global todomvc */
'use strict';

todomvc.directive('todoEnter', function () {
    var ENTER_KEY = 13;
    return function (scope, elem, attrs) {
        elem.bind('keyup', function (event) {
            console.log('keydown: ' + event.keyCode);
            if (event.keyCode === ENTER_KEY) {
                scope.addTodo(elem[0].value);
                elem[0].value = '';
                return false;
            }
        });
    };
});
