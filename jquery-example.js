(
  $(document).ready(function() {
    
    $().ajax({method: 'get', url: '/some/url'}).
      success(function() {
        alert('got here');
      });

    // code goes here
  }
)();
