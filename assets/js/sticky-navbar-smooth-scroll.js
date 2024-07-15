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

document.addEventListener('DOMContentLoaded', function() {
    /**
     * Smooth scroll to the target element with controlled speed.
     *
     * @param {string} target - The target element to scroll to.
     * @param {number} duration - The duration of the scroll in milliseconds.
     */
    function smoothScroll(target, duration) {
        var targetElement = document.querySelector(target);
        if (!targetElement) return;
        var targetPosition = targetElement.getBoundingClientRect().top - header.offsetHeight; // Adjust for header height
        var startPosition = window.pageYOffset;
        var startTime = null;

        /**
         * Animates the scroll.
         *
         * @param {number} currentTime - The current time.
         */
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            var timeElapsed = currentTime - startTime;
            var run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
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
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Add event listeners to all anchor links and buttons
    var links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            var target = this.getAttribute('href');
            smoothScroll(target, 2000); // 2000ms = 2 seconds for slower scrolling
        });
    });
});
