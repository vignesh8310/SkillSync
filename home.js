// Wait for the DOM to fully load before running this script
document.addEventListener("DOMContentLoaded", () => {
  
  // Select the "Get Started" button using its class
  const getStartedBtn = document.querySelector(".get-started");

  // If the button exists, add a click event listener
  if (getStartedBtn) {
    getStartedBtn.addEventListener("click", () => {
      
      // Redirect the user to the second page when clicked
      window.location.href = "secondpage.html";
    });
  }

});
