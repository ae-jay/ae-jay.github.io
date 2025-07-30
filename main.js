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
                // After loading blog.html, initialize the read more and carousel functionality
                if (containerId === 'blog-container') {
                    initializeModalReadMore(); // Existing modal logic
                    initializeBlogCarousel(); // NEW: Carousel logic
                }
            })
            .catch(error => {
                console.error('Error loading section:', error);
                document.getElementById(containerId).innerHTML = `<p style="text-align: center; color: red;">Failed to load content for ${containerId}.</p>`;
            });
    };

    // Existing Function to initialize Modal "Read More" functionality (no changes needed here)
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
                    const meta = blogPost.querySelector('.post-meta').innerHTML;
                    const fullContentHidden = blogPost.querySelector('.full-content-hidden');
                    const shortText = blogPost.querySelector('.short-text');

                    modalTitle.textContent = title;
                    modalMeta.innerHTML = meta;

                    let fullPostHtml = '';
                    if (shortText) {
                        fullPostHtml += shortText.outerHTML;
                    }
                    if (fullContentHidden) {
                        fullPostHtml += fullContentHidden.innerHTML;
                    }
                    modalBody.innerHTML = fullPostHtml;

                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        closeButton.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });

        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    };

    // NEW Function for Blog Carousel Arrows
    const initializeBlogCarousel = () => {
        const blogGrid = document.getElementById('blogGrid');
        const leftArrow = document.getElementById('leftArrow');
        const rightArrow = document.getElementById('rightArrow');

        if (!blogGrid || !leftArrow || !rightArrow) {
            console.warn('Blog carousel elements not found. Skipping carousel initialization.');
            return;
        }

        const scrollAmount = 350; // Adjust this value based on your blog-post width + gap

        // Function to check and update arrow visibility
        const updateArrowVisibility = () => {
            // Check if at the very beginning of the scroll
            leftArrow.disabled = blogGrid.scrollLeft <= 0;
            
            // Check if at the very end of the scroll
            // Use Math.ceil to account for fractional pixel scrolling and prevent premature disabling
            rightArrow.disabled = Math.ceil(blogGrid.scrollLeft) + blogGrid.clientWidth >= blogGrid.scrollWidth;
        };

        // Scroll Left
        leftArrow.addEventListener('click', () => {
            blogGrid.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        // Scroll Right
        rightArrow.addEventListener('click', () => {
            blogGrid.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Update arrow visibility when the grid is scrolled
        blogGrid.addEventListener('scroll', updateArrowVisibility);

        // Initial check when the page loads (after content is loaded)
        // Use a slight delay to ensure all content is rendered and scrollWidth is accurate
        setTimeout(updateArrowVisibility, 100); 
    };

    // Load all the sections into their respective containers
    loadSection('home-container', 'sections/home.html');
    loadSection('cv-container', 'sections/cv.html');
    loadSection('research-container', 'sections/research.html');
    loadSection('publications-container', 'sections/publications.html');
    loadSection('blog-container', 'sections/blog.html'); // This will trigger initialization
    loadSection('resources-container', 'sections/resources.html'); // ADDED
    loadSection('contact-container', 'sections/contact.html');
});