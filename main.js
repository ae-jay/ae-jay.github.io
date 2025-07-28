document.addEventListener('DOMContentLoaded', function() {
    
    // This function fetches HTML content from a file and puts it on the page
    const loadSection = (filePath, containerId) => {
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
                document.getElementById(containerId).innerHTML = `<p style="text-align: center; color: red;">Failed to load content.</p>`;
            });
    };

    // Load all the sections into their containers
    loadSection('sections/home.html', 'home-container');
    loadSection('sections/research.html', 'research-container');
    loadSection('sections/publications.html', 'publications-container');
    loadSection('sections/blog.html', 'blog-container');
    loadSection('sections/contact.html', 'contact-container');
});