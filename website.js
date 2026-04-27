/*** Dark Mode ***/

// Select the theme button
let themeButton = document.getElementById("theme-button");

// Callback function
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");

    // This section will run whenever the button is clicked
}

// Register a 'click' event listener for the theme button,
// and tell it to use toggleDarkMode as its callback function
themeButton.addEventListener("click", toggleDarkMode);

/*** Form Handling ***
  
  Purpose:
  - When the user submits the RSVP form, the name and state they 
    entered should be added to the list of participants.

***/

// Query for the submit RSVP button
let rsvpButton = document.getElementById("rsvp-button");

const addParticipant = (person) => {
    let newParticipant = document.createElement("p");
    newParticipant.textContent = "🎟️ " + person.name + " from " + person.state + " has RSVP'd.";

    let participantsDiv = document.querySelector(".rsvp-participants");
    participantsDiv.appendChild(newParticipant);
}


/*** Form Validation ***/

// Callback function
const validateForm = (event) => {
    event.preventDefault();

    let containsErrors = false;
    let rsvpInputs = document.getElementById("rsvp-form").elements;

    let person = {
        name: document.getElementById("name").value,
        state: document.getElementById("state").value,
        email: document.getElementById("email").value
    };

    for (let i = 0; i < rsvpInputs.length; i++) {
        if (rsvpInputs[i].tagName === "INPUT") {
            if (rsvpInputs[i].value.trim().length < 2) {
                containsErrors = true;
                rsvpInputs[i].classList.add("error");
            } else {
                rsvpInputs[i].classList.remove("error");
            }
        }
    }

    // Email check
    let email = document.getElementById("email");
    if (!email.value.includes("@")) {
        containsErrors = true;
        email.classList.add("error");
    }

    // If no errors, add participant and clear fields
    if (!containsErrors) {
        addParticipant(person);
        toggleModal(person);

        for (let i = 0; i < rsvpInputs.length; i++) {
            if (rsvpInputs[i].tagName === "INPUT") {
                rsvpInputs[i].value = "";
            }
        }
    }
};

// Replace the form button's event listener with a new one that calls validateForm()
document.getElementById("rsvp-form").addEventListener("submit", validateForm);

/*** Scroll Animations ***/

// Select all elements with the class 'revealable'.
let revealableContainers = document.querySelectorAll(".revealable");

// Function to reveal elements when they are in view.
const reveal = () => {
    for (let i = 0; i < revealableContainers.length; i++) {
        let current = revealableContainers[i];

        // Get current height of container and window
        let windowHeight = window.innerHeight;
        let topOfRevealableContainer = current.getBoundingClientRect().top;
        let revealDistance = parseInt(getComputedStyle(current).getPropertyValue('--reveal-distance'), 10);

        // If the container is within range, add the 'active' class to reveal
        if (topOfRevealableContainer < windowHeight - revealDistance) {
            current.classList.add("active");
        }
        // If the container is not within range, hide it by removing the 'active' class
        else { 
            current.classList.remove("active");
        }
    }
}

// Whenever the user scrolls, check if any containers should be revealed
window.addEventListener("scroll", reveal);

// Run once on page load
reveal();

/*** Success Modal ***/
let scaleFactor = 1;
let modalImage = document.getElementById("modal-image");

const scaleImage = () => {
    if (scaleFactor === 1) {
        scaleFactor = 0.8;
    } else {
        scaleFactor = 1;
    }

    modalImage.style.transform = `scale(${scaleFactor})`;
}

const toggleModal = (person) => {
    let modal = document.getElementById("thanks-modal");
    let modalContent = document.getElementById("thanks-modal-content");

    modal.style.display = "flex";
    modalContent.textContent = `Thank you so much ${person.name}! ${person.state} represent!`;

    let intervalId = setInterval(scaleImage, 500);

    setTimeout(() => {
        modal.style.display = "none";
        clearInterval(intervalId);
    }, 4000);
}
