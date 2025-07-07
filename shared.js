// Shared content for header
const SITE_CONFIG = {
  name: "Revanth Gundala",
  tagline: "Trying to figure out how to win",
  lastUpdated: "July 7, 2025"
};

// Function to update header content
function initializeHeader() {
  const isPostPage = window.location.pathname.endsWith('post.html');
  if (isPostPage) return;

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
    const isAboutPage = window.location.pathname.endsWith('about.html');
    if (isAboutPage) {
      footerElement.textContent = `Last updated: ${SITE_CONFIG.lastUpdated}`;
    } else {
      footerElement.style.display = 'none';
    }
  }
}

// A list of all blog posts
const POSTS = [
  'hello-world.md'
];

// Function to load and render a list of blog posts
async function loadPostList() {
  const mainElement = document.querySelector('main');
  const loadingElement = document.querySelector('.loading');

  if (mainElement) {
    if (loadingElement) {
      loadingElement.remove();
    }

    const postList = document.createElement('ul');
    postList.style.listStyle = 'none';
    postList.style.padding = '0';

    for (const postFile of POSTS) {
      try {
        const response = await fetch(`posts/${postFile}`);
        if (!response.ok) continue;
        
        const markdown = await response.text();
        const converter = new showdown.Converter({ metadata: true });
        converter.makeHtml(markdown);
        const metadata = converter.getMetadata();

        const title = metadata.title;
        const description = metadata.description;
        const postName = postFile.replace('.md', '');

        const listItem = document.createElement('li');
        listItem.style.marginBottom = '30px';

        const date = new Date(metadata.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
        const dateElement = document.createElement('p');
        dateElement.textContent = date;
        dateElement.style.fontSize = '0.9rem';
        dateElement.style.color = '#666';
        dateElement.style.margin = '0';

        const titleElement = document.createElement('a');
        titleElement.href = `post.html?post=${postName}`;
        titleElement.textContent = title;
        titleElement.style.fontSize = '1.4rem';
        titleElement.style.fontWeight = 'bold';
        titleElement.style.textDecoration = 'none';
        titleElement.style.color = '#000';

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = description;
        descriptionElement.style.fontSize = '1rem';
        descriptionElement.style.color = '#333';
        descriptionElement.style.margin = '5px 0 0 0';

        listItem.appendChild(dateElement);
        listItem.appendChild(titleElement);
        listItem.appendChild(descriptionElement);
        postList.appendChild(listItem);
      } catch (error) {
        console.error('Error fetching or processing post:', error);
      }
    }
    mainElement.appendChild(postList);
  }
}

// Function to load a single post
async function loadSinglePost() {
  const mainElement = document.querySelector('main');
  const loadingElement = document.querySelector('.loading');
  
  const urlParams = new URLSearchParams(window.location.search);
  const postName = urlParams.get('post');

  if (mainElement && postName) {
    try {
      const response = await fetch(`posts/${postName}.md`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const markdown = await response.text();
      const converter = new showdown.Converter({ metadata: true });
      const bodyHtml = converter.makeHtml(markdown);
      const metadata = converter.getMetadata();

      if (loadingElement) {
        loadingElement.remove();
      }

      document.title = `${metadata.title} | ${SITE_CONFIG.name}`;

      const titleElement = document.createElement('h1');
      titleElement.textContent = metadata.title;
      titleElement.style.fontSize = '2rem';
      titleElement.style.marginBottom = '0.25rem';

      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = metadata.description;
      descriptionElement.style.fontStyle = 'italic';
      descriptionElement.style.fontSize = '1.1rem';
      descriptionElement.style.color = '#666';
      descriptionElement.style.marginTop = '0';

      const date = new Date(metadata.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      const dateElement = document.createElement('p');
      dateElement.textContent = date;
      dateElement.style.fontSize = '0.8rem';
      dateElement.style.color = '#666';
      dateElement.style.margin = '10px 0 20px 0';
      dateElement.style.borderBottom = '1px solid #eee';
      dateElement.style.paddingBottom = '20px';

      const bodyContainer = document.createElement('div');
      bodyContainer.innerHTML = bodyHtml;
      bodyContainer.style.fontSize = '1.1rem';

      mainElement.appendChild(titleElement);
      mainElement.appendChild(descriptionElement);
      mainElement.appendChild(dateElement);
      mainElement.appendChild(bodyContainer);

    } catch (error) {
      if (loadingElement) {
        loadingElement.textContent = 'Failed to load post.';
      }
      console.error('There has been a problem with your fetch operation:', error);
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeHeader();
  initializeFooter();

  const isIndexPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
  const isPostPage = window.location.pathname.endsWith('post.html');

  if (isIndexPage) {
    loadPostList();
  } else if (isPostPage) {
    loadSinglePost();
  }
}); 