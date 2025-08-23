// Project Data
const projects = [
    {
        title: "iRise hub",
        description: "Backend development",
        image: "images/work1.jpg",
        date: "2023",
        location: "MGQ, Somalia"
    },
    {
        title: "Minbar Space",
        description: "",
        image: "images/work2.jpg",
        date: "2023",
        location: "MGQ, Somalia"
    },
    {
        title: "Raagsan",
        description: "Backend development",
        image: "images/work3.jpg",
        date: "2023",
        location: "MGQ, Somalia"
    },
    {
        title: "Rise Academy",
        description: "Backend development",
        image: "images/work4.jpg",
        date: "2023",
        location: "Mogadishu, Somalia"
    },
    
];

// Load shared menu
function loadMenu() {
    // Prevent loading menu multiple times
    if (document.querySelector('.mobile-nav')) {
        return;
    }
    
    fetch('menu.html')
        .then(response => response.text())
        .then(html => {
            // Insert menu at the beginning of body
            document.body.insertAdjacentHTML('afterbegin', html);
            
            // Initialize menu functionality after loading
            initializeMenu();
            
            // Highlight current page in menu
            highlightCurrentPage();
        })
        .catch(() => {
            // Silently handle menu loading errors
        });
}

// Initialize menu functionality
function initializeMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuFullscreen = document.querySelector('.mobile-menu-fullscreen');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');

    // Remove any existing event listeners to prevent conflicts
    if (mobileMenuToggle) {
        const newToggle = mobileMenuToggle.cloneNode(true);
        mobileMenuToggle.parentNode.replaceChild(newToggle, mobileMenuToggle);
        
        newToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            mobileMenuFullscreen.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close mobile menu
    if (mobileMenuClose) {
        const newClose = mobileMenuClose.cloneNode(true);
        mobileMenuClose.parentNode.replaceChild(newClose, mobileMenuClose);
        
        newClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            mobileMenuFullscreen.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close menu when clicking outside (only add once)
    if (!document.menuOutsideClickAdded) {
        document.addEventListener('click', (e) => {
            if (mobileMenuFullscreen && mobileMenuFullscreen.classList.contains('active')) {
                if (!mobileMenuFullscreen.contains(e.target) && !mobileMenuToggle?.contains(e.target)) {
                    mobileMenuFullscreen.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
        document.menuOutsideClickAdded = true;
    }
}

// Highlight current page in menu and set page title
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('.menu-items a, .mobile-menu-items a');
    
    // Set page title in header
    const pageTitle = document.getElementById('page-title');
    const pageHeader = document.getElementById('page-header');
    
    if (pageTitle && pageHeader) {
        const titles = {
            'biography.html': 'Biography',
            'projects.html': 'Portfolio',
            'services.html': 'Services',
            'repositories.html': 'Repositories',
            'cv.html': 'Curriculum Vitae',
            'bookshelf.html': 'Bookshelf'
        };
        
        if (titles[currentPage]) {
            pageTitle.textContent = titles[currentPage];
            pageHeader.style.display = 'flex';
        } else {
            // Hide header on home page
            pageHeader.style.display = 'none';
        }
    }
    
    menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(currentPage.replace('.html', ''))) {
            link.classList.add('active');
        }
    });
}

// DOM Elements
const projectsContainer = document.querySelector('.projects-container');

// Load menu when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Load menu with a small delay to prevent blocking the main thread
    setTimeout(() => {
        loadMenu();
    }, 10);
    
    // Initialize bookshelf navigation dots if on bookshelf page
    if (window.location.pathname.includes('bookshelf.html')) {
        initializeBookshelfNavigation();
    }
    
    // Handle GitHub avatar fallback
    const githubAvatar = document.getElementById('github-avatar');
    if (githubAvatar) {
        githubAvatar.addEventListener('error', function() {
            this.src = 'https://github.com/identicons/Abshirnoor.png';
        });
    }
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        // Clear any timeouts to prevent memory leaks
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
    });
});

// Bookshelf navigation dots functionality
function initializeBookshelfNavigation() {
    const booksContainer = document.querySelector('.books-container');
    const dots = document.querySelectorAll('.dot');
    
    if (!booksContainer || !dots.length) return;
    
    // Update active dot based on scroll position with throttling
    let scrollTimeout;
    booksContainer.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const index = Math.round(booksContainer.scrollLeft / window.innerWidth);
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[index]) {
                dots[index].classList.add('active');
            }
        }, 16); // ~60fps throttling
    });
    
    // Click dot to scroll to specific book
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            booksContainer.scrollTo({
                left: index * window.innerWidth,
                behavior: 'smooth'
            });
        });
    });
}

// Render Projects
function renderProjects() {
    if (!projectsContainer) return;
    
    try {
        projects.forEach(project => {
            if (!project || !project.title || !project.image) return;
            
            const projectElement = document.createElement('div');
            projectElement.className = 'project-item';
            
            // Create elements safely without innerHTML
            const imageContainer = document.createElement('div');
            imageContainer.className = 'project-image-container';
            
            const img = document.createElement('img');
            img.src = project.image;
            img.alt = project.title;
            img.className = 'project-image';
            imageContainer.appendChild(img);
            
            const infoContainer = document.createElement('div');
            infoContainer.className = 'project-info';
            
            const title = document.createElement('h2');
            title.className = 'project-title';
            title.textContent = project.title;
            
            const description = document.createElement('p');
            description.className = 'project-description';
            description.textContent = project.description || '';
            
            const meta = document.createElement('div');
            meta.className = 'project-meta';
            
            const date = document.createElement('span');
            date.textContent = project.date || '';
            meta.appendChild(date);
            
            infoContainer.appendChild(title);
            infoContainer.appendChild(description);
            infoContainer.appendChild(meta);
            
            projectElement.appendChild(imageContainer);
            projectElement.appendChild(infoContainer);
            projectsContainer.appendChild(projectElement);
        });
    } catch (error) {
        // Silently handle rendering errors
    }
}

// Horizontal Scroll Handling
function handleHorizontalScroll(e) {
    if (!projectsContainer || e.deltaY === 0) return;
    
    try {
        e.preventDefault();
        const scrollAmount = e.deltaY > 0 ? window.innerWidth : -window.innerWidth;
        projectsContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    } catch (error) {
        // Silently handle scroll errors
    }
}

// Arrow Key Navigation
function handleKeyNavigation(e) {
    if (!projectsContainer) return;
    
    try {
        const scrollAmount = window.innerWidth;
        
        if (e.key === 'ArrowRight') {
            projectsContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        } else if (e.key === 'ArrowLeft') {
            projectsContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    } catch (error) {
        // Silently handle key navigation errors
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (projectsContainer) {
        renderProjects();
        
        // Initialize navigation dots
        initializeProjectDots();
        
        // Event Listeners
        projectsContainer.addEventListener('wheel', handleHorizontalScroll, { passive: false });
        document.addEventListener('keydown', handleKeyNavigation);
    }
});

// Initialize project navigation dots
function initializeProjectDots() {
    const projectsContainer = document.querySelector('.projects-container');
    const dots = document.querySelectorAll('.dot');
    
    if (!projectsContainer || !dots.length) return;
    
    try {
        // Update active dot based on scroll position with throttling
        let scrollTimeout;
        projectsContainer.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                try {
                    const index = Math.round(projectsContainer.scrollLeft / window.innerWidth);
                    dots.forEach(dot => dot.classList.remove('active'));
                    if (dots[index]) {
                        dots[index].classList.add('active');
                    }
                } catch (error) {
                    // Silently handle scroll event errors
                }
            }, 16); // ~60fps throttling
        });
        
        // Click dot to scroll to specific project
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                try {
                    projectsContainer.scrollTo({
                        left: index * window.innerWidth,
                        behavior: 'smooth'
                    });
                } catch (error) {
                    // Silently handle click errors
                }
            });
        });
    } catch (error) {
        // Silently handle initialization errors
    }
}

// Handle window resize with throttling
let resizeTimeout;
let isResizing = false;
window.addEventListener('resize', () => {
    if (!isResizing) {
        isResizing = true;
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            try {
                if (projectsContainer) {
                    const currentIndex = Math.round(projectsContainer.scrollLeft / window.innerWidth);
                    projectsContainer.scrollTo({
                        left: currentIndex * window.innerWidth,
                        behavior: 'smooth'
                    });
                }
            } catch (error) {
                // Silently handle resize errors
            } finally {
                isResizing = false;
            }
        }, 150);
    }
});