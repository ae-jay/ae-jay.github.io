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
                // After loading blog.html, initialize the read more functionality
                if (containerId === 'blog-container') {
                    initializeReadMore();
                }
            })
            .catch(error => {
                console.error('Error loading section:', error);
                document.getElementById(containerId).innerHTML = `<p style="text-align: center; color: red;">Failed to load content for ${containerId}.</p>`;
            });
    };

    // Function to initialize "Read More" functionality
    const initializeReadMore = () => {
        const readMoreButtons = document.querySelectorAll('.read-more-btn');

        readMoreButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent default link behavior

                const postId = this.dataset.target;
                const blogPost = document.querySelector(`.blog-post[data-post-id="${postId}"]`);

                if (blogPost) {
                    const shortText = blogPost.querySelector('.short-text');
                    const fullText = blogPost.querySelector('.full-text');

                    if (shortText && fullText) {
                        if (fullText.style.display === 'none') {
                            shortText.style.display = 'none';
                            fullText.style.display = 'block';
                            this.textContent = 'Read Less';
                        } else {
                            shortText.style.display = 'block';
                            fullText.style.display = 'none';
                            this.textContent = 'Read More';
                        }
                    }
                }
            });
        });
    };

    // Load all the sections into their respective containers
    loadSection('home-container', 'sections/home.html');
    loadSection('cv-container', 'sections/cv.html');
    loadSection('research-container', 'sections/research.html');
    loadSection('publications-container', 'sections/publications.html');
    loadSection('blog-container', 'sections/blog.html'); // This will trigger initializeReadMore
    loadSection('contact-container', 'sections/contact.html');
});