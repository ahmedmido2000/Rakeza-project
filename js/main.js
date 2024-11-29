const videoIcon = document.querySelector('.video-icon');
const videoElement = document.getElementById('video');
    
videoIcon.addEventListener('click', function() {
    if (videoElement.paused) {
        var videoSrc = document.getElementById('video').getAttribute('src');
  document.getElementById('modalVideo').setAttribute('src', videoSrc);
  var videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
  videoModal.show();
    } 
});
videoElement.addEventListener('click', function() {
    if (videoElement.played) {
        videoElement.pause();
    }
});
const videoModalElement = document.getElementById('videoModal');

videoModalElement.addEventListener('hidden.bs.modal', function () {
    document.body.style.overflowX = 'hidden';  // Ensure scroll is disabled
});


// Function to animate the counter
function animateCounter(el, start, end, duration) {
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const current = Math.min(Math.floor((progress / duration) * (end - start) + start), end);
        el.innerText = current;
        if (current < end) {
            window.requestAnimationFrame(step);
        }
    }
    
    window.requestAnimationFrame(step);
}

// Observer callback to animate counters when section is in view
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.analytics h2');
            counters.forEach(counter => {
                const targetNumber = parseInt(counter.innerText);
                counter.innerText = 0; // Start from 0
                animateCounter(counter, 0, targetNumber, 3000); // 2000ms = 2 seconds
            });
            // Stop observing the section once the counters start
            observer.unobserve(entry.target);
        }
    });
}

// Create an IntersectionObserver
const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.5 // Trigger when 50% of the section is visible
});

// Observe the section containing the counters
const counterSection = document.querySelector('.analytics'); // Adjust selector if needed
observer.observe(counterSection);

const swiper = new Swiper('.swiper', {
loop: true,
autoplay: {
    delay: 3000, // Delay between slides in milliseconds (3 seconds)
    disableOnInteraction: false, // Allow autoplay to continue after user interactions
},
     // Responsive breakpoints
breakpoints: {
640: {
slidesPerView: 1, // 1 card on small screens
},
768: {
slidesPerView: 2, // 2 cards on medium screens
},
1024: {
slidesPerView: 3, // 3 cards on large screens
},
},
// If we need pagination
pagination: {
el: '.swiper-pagination',
clickable: true,
},

// Navigation arrows
navigation: {
nextEl: '.swiper-button-next',
prevEl: '.swiper-button-prev',
},

// And if we need scrollbar
scrollbar: {
el: '.swiper-scrollbar',
},
});

    // Wait for the DOM to fully load
    window.addEventListener('load', function() {
        const loader = document.getElementById('loader');

        // Set a timeout to hide the loader after 3 seconds
        setTimeout(function() {
            loader.style.display = 'none'; // Hide the loader
        }, 2000); // 3000 milliseconds = 3 seconds
    });


