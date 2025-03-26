// Function to navbar scroll hide/show
let lastScrollTop = 0; 
const navbar = document.getElementById('mainNav');

window.addEventListener("scroll", function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Scrolling Down - Smoothly Hide Navbar
        gsap.to(navbar, { y: "-100%", duration: 0.8, ease: "power3.out" });
    } else if (currentScroll === 0) {
        // Reached Top - Smoothly Show Navbar
        gsap.to(navbar, { y: "0%", duration: 1.2, ease: "power3.out" });
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);

// Function to toggle the sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const isOpen = sidebar.classList.contains('active');
    
    if (!isOpen) {
        // Show the sidebar first to allow animation
        sidebar.style.display = 'flex';
        
        // Animate sidebar opening
        gsap.fromTo(sidebar, 
            { x: '100%' }, 
            { 
                x: '0%', 
                duration: 0.5, 
                ease: "power2.out",
                onComplete: function() {
                    sidebar.classList.add('active');
                }
            }
        );
        
        // Animate sidebar content
        gsap.from('#sidebar p, #sidebar .social-icons a', {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.6,
            delay: 0.3,
            ease: "power1.out"
        });
    } else {
        // Animate sidebar closing
        gsap.to(sidebar, {
            x: '100%',
            duration: 0.5,
            ease: "power2.in",
            onComplete: function() {
                sidebar.classList.remove('active');
                sidebar.style.display = 'none';
            }
        });
    }
}

// Close sidebar when clicking outside of it
function setupEventListeners() {
    document.addEventListener('click', function(event) {
        const sidebar = document.getElementById('sidebar');
        const hamburger = document.querySelector('.hamburger');
        
        // If clicking outside sidebar and hamburger, close the sidebar
        if (!sidebar.contains(event.target) && !hamburger.contains(event.target) && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
    
    // Animate mobile menu items when opened
    const navbarToggler = document.querySelector('.navbar-toggler');
    const mobileMenu = document.getElementById('mobileMenu');
    
    navbarToggler.addEventListener('click', function() {
        // Check if the menu is being opened
        setTimeout(() => {
            if (mobileMenu.classList.contains('show')) {
                gsap.from('#mobileMenu .nav-item', {
                    opacity: 0,
                    y: 20,
                    stagger: 0.1,
                    duration: 0.5,
                    ease: "back.out(1.7)"
                });
            }
        }, 100); // Small delay to ensure the class change has happened
    });
}

// Navbar animation function
function initNavbarAnimations() {
    // Make sure navbar is visible before animating
    gsap.set("#mainNav, .navbar-brand, .navbar-nav .nav-item, .hamburger", { 
        autoAlpha: 1 
    });
    
    // Navbar animation
    gsap.from("#mainNav", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
    
    // Logo animation
    gsap.from('.navbar-brand', {
        duration: 1.2,
        opacity: 0,
        x: -50,
        ease: "power3.out"
    });
    
    // Desktop nav items animation - staggered effect
    gsap.from('.navbar-nav .nav-item', {
        duration: 0.8,
        opacity: 0,
        y: -20,
        stagger: 0.1,
        ease: "back.out(1.7)"
    });
    
    // Hamburger menu animation
    gsap.from('.hamburger', {
        duration: 1,
        opacity: 0,
        scale: 0.5,
        ease: "elastic.out(1, 0.3)",
        delay: 0.5
    });
}

// Hero Section GSAP Animations
function initHeroAnimations() {
    // Create a main timeline for coordinated animations
    const heroTL = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => console.log("Hero animations complete")
    });
    
    // Initialize with elements hidden
    gsap.set([".bg-image", ".web-line", ".hero-image", ".digital-marketer h2", ".cta-btn", ".left-text", ".right-text"], { 
        autoAlpha: 0 
    });
    
    // First layer: Background fade in
    heroTL.to(".bg-image", {
        duration: 1.2,
        autoAlpha: 1,
        scale: 1.05,
        ease: "power2.inOut"
    });
    
    // Second layer: Web line appears with drawing effect
    heroTL.fromTo(".web-line", 
        { autoAlpha: 0, scaleX: 0, transformOrigin: "center top" }, 
        { duration: 1, autoAlpha: 1, scaleX: 1, ease: "power2.out" },
        "-=0.7" // Start slightly before previous animation ends
    );
    
    // Third layer: Hero image enters with slight float effect
    heroTL.fromTo(".hero-image", 
        { autoAlpha: 0, y: 30 }, 
        { 
            duration: 1.4,
            autoAlpha: 1,
            y: 0,
            ease: "power3.out"
        },
        "-=0.6"
    );
    
    // Setup perpetual subtle floating animation for hero image
    heroTL.add(() => {
        gsap.to(".hero-image", {
            y: "-10",
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });

    gsap.to(".web-icon", {
        y: 30,  // Move up/down 10px
        duration: 3,  
        repeat: -1,  // Infinite loop
        yoyo: true,  // Move back to original position
        ease: "power1.inOut"
    });
    
    
    // Fourth layer: Digital marketer text with character reveal
    heroTL.fromTo(".digital-marketer h2", 
        { autoAlpha: 0 },
        {
            duration: 0.8,
            autoAlpha: 1,
            onStart: function() {
                // Text reveal character by character
                const textElement = document.querySelector(".digital-marketer h2");
                const text = textElement.textContent;
                const chars = text.split("");
                
                textElement.textContent = "";
                
                chars.forEach(char => {
                    const span = document.createElement("span");
                    span.textContent = char === " " ? " " : char;
                    span.style.opacity = 0;
                    textElement.appendChild(span);
                });
                
                gsap.to(".digital-marketer h2 span", {
                    opacity: 1,
                    duration: 0.05,
                    stagger: 0.05,
                    ease: "power1.out"
                });
            }
        },
        "-=1"
    );
    
    // Fifth layer: CTA button with glow effect
    heroTL.fromTo(".cta-btn", 
        { autoAlpha: 0, scale: 0.8 }, 
        { 
            duration: 0.7, 
            autoAlpha: 1, 
            scale: 1,
            ease: "back.out(1.7)"
        },
        "-=0.5"
    );
    
    // Add pulse effect to button
    heroTL.add(() => {
        gsap.to(".cta-btn", {
            boxShadow: "0 0 15px rgba(255, 204, 0, 0.7)",
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });
    
    // Sixth layer: Side text elements slide in from sides
    heroTL.fromTo(".left-text", 
        { autoAlpha: 0, x: -50 }, 
        { duration: 0.8, autoAlpha: 1, x: 0 },
        "-=0.8"
    );
    
    heroTL.fromTo(".right-text", 
        { autoAlpha: 0, x: 50 }, 
        { duration: 0.8, autoAlpha: 1, x: 0 },
        "-=0.8"
    );
    
    return heroTL;
}

// Add parallax effect for a more modern feel
function initParallaxEffects() {
    document.addEventListener('mousemove', e => {
        const xValue = e.clientX - window.innerWidth / 2;
        const yValue = e.clientY - window.innerHeight / 2;
        
        // Subtle movement for hero image
        gsap.to(".hero-image", {
            x: xValue * 0.01,
            y: yValue * 0.01,
            duration: 1,
            ease: "power1.out"
        });
        
        // More subtle movement for web line
        gsap.to(".web-line", {
            x: xValue * 0.005,
            y: yValue * 0.005,
            duration: 1.2,
            ease: "power1.out"
        });
    });
}

// About me section Text animation
document.addEventListener("DOMContentLoaded", function() {
    animation_text_1("#text-anim");
  });
  
  function animation_text_1(element) {
    let theText = document.querySelector(element);
    let newText = "";
  
    theText.innerHTML.split("").forEach((char) => {
      newText += `<div>${char === " " ? "&nbsp;" : char}</div>`;
    });
  
    theText.innerHTML = newText;
  
    gsap.fromTo(`${element} div`, 
      { opacity: 0, y: 10 }, 
      { 
        duration: 2, 
        opacity: 1, 
        y: 0, 
        stagger: 0.03, 
        ease: "elastic(1.2, 0.5)", 
        scrollTrigger: {
          trigger: element,
          start: "top 80%", 
          toggleActions: "play none none reverse",
        }
      }
    );
  }


  // Brand section Image animation
  function brandAnimations() {
    // Register ScrollTrigger plugin if not already registered
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    // Get logo elements
    const logoSlide = document.querySelector('.logos-slide');
    const logoImages = document.querySelectorAll('.logos-slide img');
    
    // Exit if elements don't exist
    if (!logoSlide || logoImages.length === 0) return;
    
    // Clone the logos and append them to create the infinite effect
    logoImages.forEach(img => {
        const clone = img.cloneNode(true);
        logoSlide.appendChild(clone);
    });
    
     
    
    // Create an infinite scrolling animation
    const loopAnimation = gsap.to(logoSlide, {
        x: `-50%`,
        ease: "none",
        duration: 35,
        repeat: -1,
        paused: false
    });
    
    // Enhanced hover effects for individual logos
    logoImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            // Individual logo hover animation
            gsap.to(img, {
                scale: 1.15,
                filter: 'grayscale(0%)',
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Slow down the carousel on hover
            gsap.to(loopAnimation, { timeScale: 0.2, duration: 0.5 });
        });
        
        img.addEventListener('mouseleave', () => {
            // Reset logo to original state
            gsap.to(img, {
                scale: 1,
                filter: 'grayscale(100%)',
                opacity: 0.7,
                duration: 0.3,
                ease: "power2.in"
            });
            
            // Resume normal carousel speed
            gsap.to(loopAnimation, { timeScale: 1, duration: 0.5 });
        });
    });
    
}

// Start Case study section swiper carousel

var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 3,
      slideShadows: true
    },
    keyboard: {
      enabled: true
    },
    mousewheel: {
      thresholdDelta: 70
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    breakpoints: {
      640: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 1
      },
      1024: {
        slidesPerView: 2
      },
      1560: {
        slidesPerView: 3
      }
    }
  });
// END Case study section swiper carousel
function casestudiesAnimations() {
    gsap.from("#text-anim", {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out",
    });
  
    gsap.from(".case-studies-section p", {
      duration: 1.2,
      y: 50,
      opacity: 0,
      ease: "power3.out",
      delay: 0.2,
    });
  
    gsap.from(".case-studies-section a", {
      duration: 1,
      scale: 0.8,
      opacity: 0,
      ease: "elastic.out(1, 0.5)",
      delay: 0.4,
    });
  
    gsap.utils.toArray(".swiper-slide").forEach((slide, index) => {
      gsap.from(slide, {
        scrollTrigger: {
          trigger: slide,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power2.out",
        delay: index * 0.2, // Stagger effect for each slide
      });
    });
  
    // Floating effect for background images
    gsap.to(".bg", {
      y: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  
    gsap.to(".bg2", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
}
  
 

 // MAIN INITIALIZATION - SINGLE ENTRY POINT
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navbar animations first
    initNavbarAnimations();
    
    // Then initialize other animations
    initHeroAnimations();

    // Initialize brand animations
    brandAnimations();

    casestudiesAnimations();
    
    // Setup all event listeners
    setupEventListeners();
    
    // Initialize parallax effects
    initParallaxEffects();
    
    // Initialize AOS animations
    AOS.init({
        duration: 800,  // Animation duration in milliseconds
        once: true      // Animations only play once
    });

    // Add page load transition
    gsap.from("body", {
        opacity: 0,
        duration: 1,
        ease: "power2.in"
    });
});

