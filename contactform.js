document.addEventListener("DOMContentLoaded", function() {
    // Grab the form element
    const form = document.querySelector(".contact-form");
  
    // Attach a submit event listener
    form.addEventListener("submit", function(event) {
      event.preventDefault(); // Stop the default form submission
  
      // Optionally do any validation or data processing here
  
      // Redirect to thankyou.html
      window.location.href = "thankyou.html";
    });
  });
  

  