// Shared content for header
const SITE_CONFIG = {
  name: "Revanth Gundala",
  tagline: "Trying to figure out how to win"
};

// Function to update header content
function initializeHeader() {
  const nameElement = document.querySelector('header h1');
  const taglineElement = document.querySelector('header .tagline');
  
  if (nameElement) {
    nameElement.textContent = SITE_CONFIG.name;
  }
  
  if (taglineElement) {
    taglineElement.textContent = SITE_CONFIG.tagline;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeHeader); 