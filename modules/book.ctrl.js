var app = angular.module('BookStore');

app.controller('BookingCtrl', function($scope, BookService, $state) {

  getData();

  /**
  * Gets the book list from the book service
  */
  function getData() {
    BookService.getData().then(function(response) {
      $scope.books = response;
    }).catch(function(err) {
      console.log(err);
    });
  }

  /**
  * Calls the book service to remove a book
  */
  $scope.remove = function(book) {
    if (confirm('Sure to delete?')) {
      BookService.remove(book._id).then(function() {
        alert('Deleted!');
        getData();
      })
      .catch(function(err) {
        console.log(err);
      })
    } else {
      alert('Wise Decision!');
    }
  }

  /**
  * Checks if the book list is empty
  */
  $scope.isBookListEmpty = function() {
    if (!$scope.books) return false;

    return $scope.books.length ? false : true;
  }

  /**
  * Routes to book update state with the book object to be updated
  */
  $scope.update = function(book) {
    $state.go('books.update', {
      book: book
    });
  }

});
