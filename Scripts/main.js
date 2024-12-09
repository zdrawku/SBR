document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const navDrawer = document.querySelector(".nav-drawer");
    const navLinks = document.getElementById("nav-links");
    const fadeIns = document.querySelectorAll('.fade-in');
    const slideUps = document.querySelectorAll('.slide-up');
    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.navigation');
    const navLinkElements = document.querySelectorAll('.nav-link');

    // Toggle the navigation drawer
    const toggleNavDrawer = () => navDrawer.classList.toggle("show");

    // Event to close nav drawer on outside click
    const handleDocumentClick = (event) => {
        if (
            !navDrawer.contains(event.target) &&
            !hamburgerMenu.contains(event.target) &&
            navDrawer.classList.contains("show")
        ) {
            navDrawer.classList.remove("show");
        }
    };

    // Create links for headings dynamically
    const createHeadingLinks = () => {
        const headings = document.querySelectorAll("h1, h2, h3");
        headings.forEach((heading, index) => {
            let id = heading.id;
            if (!id) {
                const section = heading.closest("section");
                if (section && section.id) {
                    id = section.id;
                } else {
                    id = `heading-${index}`;
                    heading.id = id;
                }
            }
    
            const listItem = document.createElement("li");
            listItem.innerHTML = `<a href="#${id}">${heading.textContent}</a>`;
            navLinks.appendChild(listItem);
        });
    };

    // Intersection Observer for fade-in and slide-up animations
    const createObserver = (elements, className) => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(className);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { root: null, threshold: 0.1, rootMargin: "0px" }
        );

        elements.forEach((el) => observer.observe(el));
    };

    // Smooth scrolling for navigation links
    const enableSmoothScroll = () => {
        navLinkElements.forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const targetId = e.target.getAttribute("href").substring(1);
                const targetElement = document.getElementById(targetId);
    
                // Custom animation logic
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 800; // Animation duration in ms
                let start = null;
    
                const animation = (currentTime) => {
                    if (!start) start = currentTime;
                    const timeElapsed = currentTime - start;
    
                    // Easing function (ease-in-out)
                    const ease = (t, b, c, d) => {
                        t /= d / 2;
                        if (t < 1) return (c / 2) * t * t + b;
                        t--;
                        return (-c / 2) * (t * (t - 2) - 1) + b;
                    };
    
                    const scrollY = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, scrollY);
    
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                };
    
                requestAnimationFrame(animation);
            });
        });
    };

    // Initialize all features
    const init = () => {
        hamburgerMenu.addEventListener("click", toggleNavDrawer);
        document.addEventListener("click", handleDocumentClick);
        createHeadingLinks();
        createObserver(fadeIns, "visible");
        createObserver(slideUps, "visible");
        // menuToggle.addEventListener("click", () => navigation.classList.toggle("active"));
        enableSmoothScroll();
    };

    init();
});
