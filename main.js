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
                        // Current state: fullText is hidden, shortText is visible (initial state or after "Read Less")
                        if (fullText.style.display === 'none') {
                            shortText.style.display = 'none'; // Hide short text
                            fullText.style.display = 'block'; // Show full text
                            this.textContent = 'Read Less'; // Change button to "Read Less"
                        } else { // Current state: fullText is visible, shortText is hidden (after "Read More")
                            shortText.style.display = 'block'; // Show short text
                            fullText.style.display = 'none'; // Hide full text
                            this.textContent = 'Read More'; // Change button to "Read More"
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