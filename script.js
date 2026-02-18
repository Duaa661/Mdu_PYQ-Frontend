// ===============================
// MDU ROHTAK PYQ PORTAL JS FILE
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // 1️⃣ NAVBAR MENU TOGGLE
    // ===============================

    const menuBtn = document.getElementById("menuBtn");

    // Create dropdown dynamically
    const dropdownMenu = document.createElement("div");
    dropdownMenu.classList.add(
        "absolute",
        "right-6",
        "top-20",
        "bg-white",
        "shadow-lg",
        "rounded-lg",
        "p-4",
        "hidden",
        "w-64",
        "space-y-3",
        "z-50"
    );

    dropdownMenu.innerHTML = `
        <a href="#" class="block text-gray-700 hover:text-blue-600">Syllabus of MDU Rohtak</a>
        <a href="#" class="block text-gray-700 hover:text-blue-600">Previous Year Question Paper</a>
        <a href="#" class="block text-gray-700 hover:text-blue-600">Handwritten Notes</a>
        <a href="#" class="block text-gray-700 hover:text-blue-600">Revision Papers</a>
        <a href="Admin.html" class="block text-gray-700 hover:text-blue-600">Admin Page</a>
    `;

    document.body.appendChild(dropdownMenu);

    menuBtn.addEventListener("click", function () {
        dropdownMenu.classList.toggle("hidden");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
        if (!menuBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.add("hidden");
        }
    });


    // ===============================
    // 2️⃣ SEARCH INPUT EFFECT
    // ===============================

    const searchInput = document.getElementById("searchInput");

    searchInput.addEventListener("focus", function () {
        searchInput.style.transform = "scale(1.02)";
        searchInput.style.transition = "0.3s";
    });

    searchInput.addEventListener("blur", function () {
        searchInput.style.transform = "scale(1)";
    });

    searchInput.addEventListener("keyup", function () {
        console.log("User Searching:", searchInput.value);
    });


    // ===============================
    // 3️⃣ FEATURE CARD HOVER ANIMATION
    // ===============================

    const featureCards = document.querySelectorAll(".feature-card");

    featureCards.forEach(card => {
        card.addEventListener("mouseenter", function () {
            card.style.transform = "translateY(-6px)";
            card.style.transition = "0.3s";
        });

        card.addEventListener("mouseleave", function () {
            card.style.transform = "translateY(0)";
        });
    });


    // ===============================
    // 4️⃣ SMOOTH SCROLL (Future Use)
    // ===============================

    const links = document.querySelectorAll("a[href^='#']");

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });


    // ===============================
    // 5️⃣ CONSOLE WELCOME MESSAGE
    // ===============================

    console.log("MDU Rohtak PYQ Portal Loaded Successfully 🚀");

});


const searchInput = document.getElementById("searchCourse");
const dropdown = document.getElementById("courseDropdown");
const courses = document.querySelectorAll(".course-item");

// Show dropdown
searchInput.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
});

// Course click
courses.forEach(course => {
    course.addEventListener("click", () => {

        // Set input value
        searchInput.value = course.innerText;

        // Close dropdown
        dropdown.classList.add("hidden");

        // Check if link exists
        const link = course.getAttribute("data-link");

        if (link) {
            window.location.href = link;
        }
    });
});

// Close when clicking outside
document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add("hidden");
    }
});




const texts = [
    "Syllabus of MDU Rohtak",
    "Previous Year Paper ",
    "Handwritten Notes",
    "Revision Papers (RG)"
];

let index = 0;
const textElement = document.getElementById("changingText");

function changeText() {
    textElement.style.opacity = 0;

    setTimeout(() => {
        index = (index + 1) % texts.length;
        textElement.textContent = texts[index];
        textElement.style.opacity = 1;
    }, 500);
}

setInterval(changeText, 2500);
