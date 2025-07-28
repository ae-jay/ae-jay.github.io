document.addEventListener('DOMContentLoaded', function() {
    
    const loadSection = (containerId, filePath) => {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Could not load ${filePath}. Status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                document.getElementById(containerId).innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading section:', error);
                document.getElementById(containerId).innerHTML = `<p style="text-align: center; color: red;">Failed to load content for ${containerId}.</p>`;
            });
    };

    // Load all the sections into their respective containers
    loadSection('home-container', 'sections/home.html');
    loadSection('cv-container', 'sections/cv.html');
    loadSection('research-container', 'sections/research.html');
    loadSection('publications-container', 'sections/publications.html');
    loadSection('blog-container', 'sections/blog.html');
    loadSection('contact-container', 'sections/contact.html');
});