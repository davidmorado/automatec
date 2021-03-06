'use strict';

// Evaluations controller
angular.module('evaluations').controller('EvaluationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Evaluations',
	function($scope, $stateParams, $location, Authentication, Evaluations) {
		$scope.authentication = Authentication;

		// Create new Evaluation
		$scope.create = function() {
			// Create new Evaluation object
			var evaluation = new Evaluations ({
				name: this.name
			});

			// Redirect after save
			evaluation.$save(function(response) {
				$location.path('evaluations/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Evaluation
		$scope.remove = function(evaluation) {
			if ( evaluation ) { 
				evaluation.$remove();

				for (var i in $scope.evaluations) {
					if ($scope.evaluations [i] === evaluation) {
						$scope.evaluations.splice(i, 1);
					}
				}
			} else {
				$scope.evaluation.$remove(function() {
					$location.path('evaluations');
				});
			}
		};

		// Update existing Evaluation
		$scope.update = function() {
			var evaluation = $scope.evaluation;

			evaluation.$update(function() {
				$location.path('evaluations/' + evaluation._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Evaluations
		$scope.find = function() {
			$scope.evaluations = Evaluations.query();
		};

		// Find existing Evaluation
		$scope.findOne = function() {
			$scope.evaluation = Evaluations.get({ 
				evaluationId: $stateParams.evaluationId
			});
		};
	}
]);