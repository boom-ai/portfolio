document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    // Navigation Menu Toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle')
    });

    // Skill Bars Animation
    const skillsBars = document.querySelectorAll('.progress');
    skillsBars.forEach(bar => {
        const percent = bar.dataset.percent;
        bar.style.width = percent + '%';
    });

    // Smooth Scrolling
    const navLinksA = document.querySelectorAll('.nav-links a, .hero .btn');
    navLinksA.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if(targetElement){
                window.scrollTo({
                   top: targetElement.offsetTop,
                   behavior: 'smooth'
               });
                if (navLinks.classList.contains('nav-active')){
                  navLinks.classList.remove('nav-active')
                  burger.classList.remove('toggle')
                }
            }
        });
    });

    // Form submission
    const form = document.querySelector('.contact-form form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        alert('Message Sent Succesfully!')
        form.reset()
    })

    // Scroll Zoom Animations
    const scrollZoomElements = document.querySelectorAll('.scroll-zoom');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    scrollZoomElements.forEach(element => {
        observer.observe(element);
    });

    // Skills section movement
    gsap.registerPlugin(ScrollTrigger);
    const skillsSection = document.querySelector('#skills .skills-grid');
    gsap.to(skillsSection, {
        x: () => -(skillsSection.scrollWidth - document.documentElement.clientWidth) + 'px',
        ease: 'none',
        scrollTrigger: {
            trigger: '#skills',
            start: 'top top',
            end: () =>  '+=' + skillsSection.scrollWidth ,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
        }
    });
    // Typewriter Effect with 10-Second Change
     const typewriterElement = document.querySelector('.typewriter');
    const phrases = ["Hi, I'm Sanket.", "A Software Dev.", "A Chess Player."];
    let phraseIndex = 0;

    function typeWriterEffect(text, element, speed = 50){
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
               setTimeout(type, speed)
           }
        }
        type();
    }

    function changeTypewriterText() {
      typewriterElement.innerHTML = ""
       typeWriterEffect(phrases[phraseIndex], typewriterElement);
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    changeTypewriterText()
    setInterval(changeTypewriterText, 5000); // Change every 10 seconds
});