var myApp = angular.module('main', ['ui.router']);

// controller (mvC)
myApp.controller('mainController', function($scope) {
  var data = 'Hello from the other side!'; // not accessable in template!
  $scope.data = 'some data'; // accessable in template!
});

// routing
myApp.config(function($stateProvider) {
  var homePage = {
    name: 'home',
    url: '/',
    template: '<h3>Home page works</h3>'
  };
  var listPageState = {
    name: 'list',
    url: '/list',
    template: '<h3>List of images works</h3>'
  };
  var newPageState = {
    name: 'new',
    url: '/new',
    template: '<h3>Page for new item workd</h3>'
  };

  $stateProvider.state(homePage);
  $stateProvider.state(listPageState);
  $stateProvider.state(newPageState);
});