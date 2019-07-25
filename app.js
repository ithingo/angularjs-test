var myApp = angular.module('main', ['ui.router'], function($rootScopeProvider) {
  $rootScopeProvider.digestTtl(15); // increase timer for checking
});

// controller (mvC)
myApp.controller('mainController', function($scope) {
  $scope.routeClickHandler = function() {
    console.log(window.location.pathname);
  }
});

// service
myApp.factory('ItemsService', function() {
  var service = {
    getList: function() {
      return new Promise(function(resolve, reject) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'data/items.json', true);
        xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            resolve(JSON.parse(xobj.response));
          }
        };
        xobj.send(null);
      });
    },
    getItem: function(id) {
      return this.getList().then(function(list) {
        return list.find(function(item) {
          item.id === id;
        })
      });
    }
  };
  return service;
});


// components
angular.module('main').component('itemDetails', {
  bindings: {
    itemDetails: '<'
  },
  templateUrl: 'partials/itemDetails.html'
});

angular.module('main').component('newItemComponent', {
  templateUrl: 'partials/newItemComponent.html',
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
      $location.path('/items')
    }
  }
});

angular.module('main').component('listComponent', {
  templateUrl: 'partials/listComponent.html',
  bindings: { allItems: '<' },
  controller: function($scope, $location) {
    $scope.goTo = function(animal) {
      $location.path('/item/' + animal.id); // navigation by hand, works but with no data passing
    }
  }
});


// routing
myApp.config(function($stateProvider, $urlRouterProvider) {
  var states = [
    homePageState = {
      name: 'home',
      url: '/',
      template: '<h3>Home page works</h3>'
    },
    listPageState = {
      name: 'list',
      url: '/items',
      component: 'listComponent',
      resolve: {
        allItems: function(ItemsService) {
          return ItemsService.getList();
        }
      }
    },
    listPageState = {
      name: 'item',
      url: '/item/{id}',
      component: 'itemDetails',
      resolve: {
        itemDetails: function(ItemsService, $transition$) {
          return ItemsService.getItem($transition$.params().id);
        }
      }
    },
    newPageState = {
      name: 'new',
      url: '/new',
      component: 'newItemComponent'
    }
  ];
  
  states.forEach(function(state) {
    $stateProvider.state(state);
  });

  $urlRouterProvider.otherwise('/');
});