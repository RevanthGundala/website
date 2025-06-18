// Shared content for header
const SITE_CONFIG = {
  name: "Revanth Gundala",
  tagline: "Trying to figure out how to win",
  lastUpdated: "June 18, 2025"
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

// Function to initialize footer
function initializeFooter() {
  const footerElement = document.querySelector('footer');
  
  if (footerElement) {
    footerElement.textContent = `Last updated: ${SITE_CONFIG.lastUpdated}`;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeHeader();
  initializeFooter();
}); 