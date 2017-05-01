angular.module('demo', ['ngRoute']).controller('DemoController',
    function($scope, $location, codeService) {

  $scope.demoList = window.demoList;//demo集合
/*@name:demo名称，也包括对应的文件夹名称*/
  $scope.viewDemo = function(name) {
      $location.path(name);//改变根路径
    var demoFolder = 'views/';
    var htmlPath = demoFolder + name + '/index.html';
    var jsPath = demoFolder + name + '/script.js';
    var cssPath = demoFolder + name + '/style.css';

    $scope.codeViewing = false;

    $scope.currentUrl = htmlPath;
    /*currentTab == 0 (html),currentTab == 1 (js),currentTab == 2(css)*/
    $scope.currentTab = 0;

    $scope.htmlCode = undefined;
    $scope.jsCode = undefined;
    $scope.cssCode = undefined;

    var renderCode = function() {
      setTimeout(function() {
        var pres = document.querySelectorAll('.code-contents pre');
        [].forEach.call(pres, function(pre) {
          Prism.highlightElement(pre);
        });
      }, 300);
    };

    codeService.getCode(htmlPath).then(function(result) {
        $scope.htmlCode = result.data;
        return codeService.getCode(jsPath);
      }, function() {
        return codeService.getCode(jsPath);
      }).then(function(result) {
        $scope.jsCode = result.data;
        return codeService.getCode(cssPath);
      }, function() {
        return codeService.getCode(cssPath);
      }).then(function(result) {
        $scope.cssCode = result.data;
        renderCode();
      }, function() {
        renderCode();
      });
  };

  $scope.toggleCodeViewer = function() {
    $scope.codeViewing = !$scope.codeViewing;
  };

  $scope.switchTab = function(index) {
    $scope.currentTab = index;
  };

  var name = $location.path().replace(/^\//, '');
  if ($scope.demoList.indexOf(name) > -1) {
    $scope.viewDemo(name);
  } else {
    $location.path('/');
    $scope.viewDemo('dialog');
  }

}).factory('codeService', function($http) {
  return {
    getCode: function(path) {
      return $http.get(path);
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  var calcHeight = function() {
    var headerHeight = 40;
    var viewerBarHeight = 50;
    var viewerTabHeight = 40;
    var bottomMargin = 20;
    var sectionHeight = window.innerHeight - headerHeight - bottomMargin;
    var pageFrameHeight = sectionHeight - viewerBarHeight;
    var codeContentsHeight = sectionHeight - viewerBarHeight - viewerTabHeight;

    var setHeight = function(selector, height) {
      document.querySelector(selector).style.height = height + 'px';
    };

    setHeight('section', sectionHeight);
    setHeight('section iframe', pageFrameHeight);
    setHeight('.code-contents', codeContentsHeight);
  };

  calcHeight();

  var delayEvent = function(func, delayTime) {
    var timer;
    return function(e) {
      clearTimeout(timer);
      timer = setTimeout(function() {
        func(e);
      }, delayTime);
    }
  };

  window.addEventListener('resize', delayEvent(calcHeight, 300));

}, false);
