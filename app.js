var myApp = angular.module('main', ['ui.router']);

// controller (mvC)
myApp.controller('mainController', function($scope) {
  var data = 'Hello from the other side!'; // not accessable in template!
  $scope.data = 'some data'; // accessable in template!
  $scope.routeClickHandler = function() {
    console.log($scope.$$watchers);
  }
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
    component: 'listComponent'
  };
  var newPageState = {
    name: 'new',
    url: '/new',
    component: 'newItemComponent'
  };

  $stateProvider.state(homePage);
  $stateProvider.state(listPageState);
  $stateProvider.state(newPageState);
});

// components
myApp.component('listComponent', {
  template: '<ul>' +
            '<li ng-repeat="animal in testAnimalList">' +
            '<p>' +
            '<span>{{animal.name + ", " + animal.dob + ", from " + animal.country}}</span>' +
            '</p>' +
            '</li>' +
            '</ul>',
  controller: function($scope) {
    $scope.testAnimalList = [
      {
        name: 'Doddy',
        dob: '26/2/2018',
        country: 'US'
      },
      {
        name: 'Kitty',
        dob: '27/2/2018',
        country: 'UK'
      },
      {
        name: 'Fluffy',
        dob: '24/1/2018',
        country: 'France'
      },
    ];

  }
});

myApp.component('newItemComponent', {
  template: '<form ng-submit="supmitForm(formValue)">' +
            '   <label>Name: </label>' +
            '   <input type="text" ng-model="formValue.name">' +
            '   <br>' +
            '   <label>Date of birth: </label>' +
            '   <input type="text" ng-model="formValue.dob">' +
            '   <br>' +
            '   <label>Country: </label>' +
            '   <input type="text" ng-model="formValue.country">' +
            '   <br>' +
            '   <button type="submit">Submit</button>' +
            '<form>',
  controller: function($scope, $location) {
    $scope.master = {
      name: '',
      dob: '',
      country: '',
    };

    $scope.reset = function() {
      $scope.formValue = angular.copy($scope.master);
    };

    $scope.supmitForm = function(formValue) {
      console.log(formValue);
      $scope.master = angular.copy(formValue);
      // add new item
      $location.path('/list')
    }
  }
});