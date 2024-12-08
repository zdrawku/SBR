document.addEventListener('DOMContentLoaded', () => {
    const fadeIns = document.querySelectorAll('.fade-in');
    const slideUps = document.querySelectorAll('.slide-up');

    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const slideUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                slideUpObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeIns.forEach(element => fadeInObserver.observe(element));
    slideUps.forEach(element => slideUpObserver.observe(element));
    
});

document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.navigation').classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});