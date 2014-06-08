angular.module('demo', ['angular-svg-round-progress'])
    .controller('demoCtrl', ['$scope', '$timeout', '$rootScope', function($scope, $timeout, $rootScope){

        $scope.current =        27,
        $scope.max =            50,
        $scope.uploadCurrent =  0,
        $scope.stroke =         15,
        $scope.radius =         100,
        $scope.isSemi =         false,
        $scope.currentColor =   '#45ccce',
        $scope.bgColor =        '#eaeaea'

        var random = function(min, max){
            return Math.round(Math.floor(Math.random()*(max-min+1)+min));
        },
        timeout;

        $scope.increment = function(amount){
            $scope.current+=(amount || 1);
        };

        $scope.$watchCollection('[max, stroke, radius, isSemi, currentColor, bgColor]', function(newValue, oldValue){
            $rootScope.$broadcast('renderCircle');
        });

        $scope.decrement = function(amount){
            $scope.current-=(amount || 1);
        };

        $scope.start = function(){
            $scope.stop();
            timeout = $timeout(function(){
                $scope.uploadCurrent+=random(1, 5);

                if($scope.uploadCurrent < 100){
                    $scope.start();
                }
            }, random(300, 500));
        };

        $scope.stop = function(){
            $timeout.cancel(timeout);
        };

        $scope.reset = function(){
            $scope.stop();
            $scope.uploadCurrent = 0;
        };

    }]);
