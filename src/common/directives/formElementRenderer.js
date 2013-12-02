angular.module('directives.formElementRenderer', [])

.directive('formElementRenderer', function() {
  return {
    require: '?ngModel',
    scope: {
      ngModel: '='
    },
    template: function(element, attrs) {
      return '<div class="form-element form-element-{{ngModel.type}}" ng-class="ngModel.classes" ng-include="ngModel.templateUrl"></div>';
    },
    controller: function($scope, $element, $attrs) {
      $scope.select = function() {
        $scope.$emit('element.select');
      };

      $scope.check = function(value) {
        var index = $scope.ngModel.value.indexOf(value);
        if (index > -1) {
          $scope.ngModel.value.splice(index, 1);
        } else {
          $scope.ngModel.value.push(value);
        }
      };

      $scope.range = function(n) {
        return new Array(parseInt(n, 10));
      };

      $scope.$watch('ngModel.controller', function(controller) {
        if (controller) {
          controller($scope, $element, $attrs);
        }
      });
    },
    link: function(scope, element, attrs) {
      scope.editable = 'editable' in attrs;
    }
  };
})

;
