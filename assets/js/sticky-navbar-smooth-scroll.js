document.addEventListener('DOMContentLoaded', function() {
    // When the user scrolls the page, execute handleScroll function
    window.onscroll = function() {
        handleScroll();
    };

    // Get the header element
    let header = document.getElementById("myHeader");

    // Get the offset position of the navbar
    let sticky = header.offsetTop;

    /**
     * Adds the sticky class to the header when you reach its scroll position.
     * Removes the sticky class when you leave the scroll position.
     */
    function handleScroll() {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }

    /**
     * Smooth scroll to the target element with controlled speed.
     *
     * @param {string} target - The target element to scroll to.
     * @param {number} duration - The duration of the scroll in milliseconds.
     */
    function smoothScroll(target, duration) {
        var targetElement = document.querySelector(target);
        if (!targetElement) return;
        var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - header.offsetHeight;
        var startPosition = window.pageYOffset;
        var distance = targetPosition - startPosition;
        var startTime = null;

        console.log('Target:', target); // Log the target element
        console.log('Target Position:', targetPosition); // Log the target position
        console.log('Start Position:', startPosition); // Log the start position
        console.log('Distance:', distance); // Log the distance

        /**
         * Animates the scroll.
         *
         * @param {number} currentTime - The current time.
         */
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            var timeElapsed = currentTime - startTime;
            var run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);

            console.log('Current Time:', currentTime); // Log the current time
            console.log('Time Elapsed:', timeElapsed); // Log the time elapsed
            console.log('Run:', run); // Log the run position

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                window.scrollTo(0, startPosition + distance); // Ensure we end at the exact position
                console.log('Scroll Completed to:', startPosition + distance);
            }
        }

        /**
         * Easing function for smooth scrolling.
         *
         * @param {number} t - Current time.
         * @param {number} b - Start position.
         * @param {number} c - Change in position.
         * @param {number} d - Duration.
         * @returns {number} The new position.
         */
        function ease(t, b, c, d) {
            t /= d;
            t--;
            return c * (t * t * t + 1) + b;
        }

        // Add a slight delay before initiating the animation to ensure smoothness
        setTimeout(function() {
            requestAnimationFrame(animation);
        }, 50); // 50ms delay
    }

    // Add event listeners to all anchor links and buttons
    var links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            var target = this.getAttribute('href');
            var duration = navigator.userAgent.includes("Firefox") ? 2000 : 500; // Adjust duration based on browser
            smoothScroll(target, duration); // Dynamic duration for better cross-browser experience
        });
    });
});
