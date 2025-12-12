// --- Initial Setup ---

// Set the current year in the footer
document.getElementById("year").textContent = new Date().getFullYear();

// --- Intersection Observer (Fade-In Effect) ---

const faders = document.querySelectorAll(".fade");
const appearanceOptions = {
    threshold: 0.1, // Element is visible enough when 10% is in view
    rootMargin: "0px 0px -50px 0px" 
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
    });
}, appearanceOptions);

faders.forEach(fade => {
    appearOnScroll.observe(fade);
});

// --- Dark Mode Logic ---

document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("darkModeToggle");
    const body = document.body;
    const savedMode = localStorage.getItem("darkMode");

    if (!toggle) return; // Exit if the button isn't found

    const enableDarkMode = () => {
        body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
        toggle.textContent = "☀️ Light Mode";
    };

    const disableDarkMode = () => {
        body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "disabled");
        toggle.textContent = "🌙 Dark Mode";
    };

    // Load saved mode
    if (savedMode === "enabled") {
        enableDarkMode();
    } else {
        // Ensure the button text is correct on initial load
        disableDarkMode();
    }

    // Toggle dark mode on click
    toggle.addEventListener("click", () => {
        if (body.classList.contains("dark-mode")) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
});

// --- Back-to-Top Button ---

const topBtn = document.getElementById("topBtn");

if (topBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}


// --- JQUERY FORM VALIDATION ---

// This section requires the jQuery library loaded in the HTML file.

// List of valid Bayern players (lowercase and without spaces/accents)
const validPlayers = [
    "musiala", "kimmich", "neuer", "kane", "muller", "davies", "sane",
    "goretzka", "upamecano", "de ligt", "coman", "gnabry", "tel", "mazraoui"
];

// Regex rules
const nameRegex = /^[A-Za-z\s]{3,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[A-Za-z]{2,}$/;

// Wait for jQuery to be fully loaded
$(document).ready(function() {
    // Form logic
    $("#feedbackForm").on("submit", function (e) {
        e.preventDefault();

        let nameInput = $("#fullName");
        let emailInput = $("#email");
        let playerInput = $("#player");
        let messageInput = $("#message");

        let name = nameInput.val().trim();
        let email = emailInput.val().trim();
        let player = playerInput.val().trim();
        let message = messageInput.val().trim();

        let isValid = true;
        const error = (input, msg) => {
            input.next(".error").text(msg);
            isValid = false;
        };
        const clearError = (input) => input.next(".error").text("");


        // 1. Name validation
        if (!nameRegex.test(name)) {
            error(nameInput, "Name must be at least 3 letters.");
        } else {
            nameInput.val(name.toUpperCase()); 
            clearError(nameInput);
        }

        // 2. Email validation
        if (!emailRegex.test(email)) {
            error(emailInput, "Invalid email format.");
        } else {
            clearError(emailInput);
        }

        // 3. Player check
        const standardizedPlayer = player.toLowerCase().replace(/\s/g, ''); 
        
        if (!validPlayers.includes(standardizedPlayer)) {
            error(playerInput, "Player not found in a reasonable Bayern squad list!");
        } else {
            clearError(playerInput);
        }

        // 4. Message validation
        if (message.length < 5) {
            error(messageInput, "Message must be 5+ characters.");
        } else {
            clearError(messageInput);
        }

        // Final success
        if (isValid) {
            $("#successMsg").fadeIn();
            setTimeout(() => $("#successMsg").fadeOut(), 2000);
            
            // Clear form after successful submission
            $("#feedbackForm")[0].reset();
            
            const feedback = {
                name: nameInput.val(),
                email: email,
                player: playerInput.val(),
                message: message
            };

            console.log("Saved Feedback:", feedback);
        }
    });
});