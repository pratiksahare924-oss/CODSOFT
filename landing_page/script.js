// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'var(--white)';
        navbar.style.boxShadow = 'var(--shadow-medium)';
    } else {
        navbar.style.backgroundColor = 'rgba(245, 245, 245, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Scroll Reveal Animation (Simple Implementation)
const revealElements = document.querySelectorAll('.drink-card, .section-header, .hero-content');

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.8;
    
    revealElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        
        if (elTop < triggerBottom) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
};

// Initial setup for reveal elements
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'var(--transition-smooth)';
});

// Run on load and scroll
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Adjust for navbar height
                behavior: 'smooth'
            });
        }
    });
});
