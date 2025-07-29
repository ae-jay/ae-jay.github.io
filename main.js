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
                    initializeModalReadMore(); // Call the new modal initialization function
                }
            })
            .catch(error => {
                console.error('Error loading section:', error);
                document.getElementById(containerId).innerHTML = `<p style="text-align: center; color: red;">Failed to load content for ${containerId}.</p>`;
            });
    };

    // Function to initialize Modal "Read More" functionality
    const initializeModalReadMore = () => {
        const modal = document.getElementById('blogPostModal');
        const closeButton = document.querySelector('.close-button');
        const modalTitle = document.getElementById('modal-post-title');
        const modalMeta = document.getElementById('modal-post-meta');
        const modalBody = document.getElementById('modal-post-body');

        document.querySelectorAll('.read-more-btn').forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();

                const postId = this.dataset.target;
                const blogPost = document.querySelector(`.blog-post[data-post-id="${postId}"]`);

                if (blogPost) {
                    const title = blogPost.querySelector('h3').textContent;
                    const meta = blogPost.querySelector('.post-meta').innerHTML; // Get HTML for icons/date
                    const fullContentHidden = blogPost.querySelector('.full-content-hidden');
                    const shortText = blogPost.querySelector('.short-text'); // Get the short text too

                    // Populate modal content
                    modalTitle.textContent = title;
                    modalMeta.innerHTML = meta;

                    // Concatenate short and full hidden content for the modal body
                    let fullPostHtml = '';
                    if (shortText) {
                        fullPostHtml += shortText.outerHTML; // Include the short text paragraph itself
                    }
                    if (fullContentHidden) {
                        fullPostHtml += fullContentHidden.innerHTML; // Get the inner HTML of the hidden full content
                    }
                    modalBody.innerHTML = fullPostHtml;

                    modal.style.display = 'flex'; // Use flex to center the modal content
                    document.body.style.overflow = 'hidden'; // Prevent scrolling on the body
                }
            });
        });

        // When the user clicks on <span> (x), close the modal
        closeButton.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore body scrolling
        });

        // When the user clicks anywhere outside of the modal content, close it
        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
                document.body.style.overflow = ''; // Restore body scrolling
            }
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