document.querySelectorAll(".destination-item img").forEach(img => {
    img.addEventListener("mouseover", () => img.style.transform = "scale(1.1)");
    img.addEventListener("mouseout", () => img.style.transform = "scale(1)");
});

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const theme = document.body.classList.contains("dark-mode") ? "Dark" : "Light";
    
}

function addToFavorites(destinationName) {
    alert(`${destinationName} has been added to your favorites!`);
}

document.querySelectorAll(".destination-item a").forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const destinationName = link.querySelector("h3").textContent;
        alert(`Navigating to ${destinationName} details page...`);
        window.location.href = link.href; 
    });
});

const scrollToTopButton = document.createElement("button");
scrollToTopButton.textContent = "↑ Top";
scrollToTopButton.style.position = "fixed";
scrollToTopButton.style.bottom = "20px";
scrollToTopButton.style.right = "20px";
scrollToTopButton.style.padding = "10px";
scrollToTopButton.style.display = "none";
document.body.appendChild(scrollToTopButton);

window.addEventListener("scroll", () => {
    scrollToTopButton.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
