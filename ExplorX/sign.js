document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const successMessage = document.getElementById("successMessage");
    successMessage.style.display = "block";
    successMessage.style.animation = "fade-in 0.5s forwards";

    document.querySelector(".container").style.display = "none";

    setTimeout(() => {
        successMessage.style.display = "none";
        document.querySelector(".container").style.display = "block";
    }, 3000);
});

const passwordInput = document.getElementById("password");
const passwordStrength = document.getElementById("passwordStrength");

passwordInput.addEventListener("input", function() {
    const strength = checkPasswordStrength(passwordInput.value);
    updateStrengthIndicator(strength);
});

function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length > 5) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[@$!%*?&]/)) strength++;
    
    return strength;
}

function updateStrengthIndicator(strength) {
    passwordStrength.classList.remove("strength-weak", "strength-medium", "strength-strong", "strength-very-strong");

    if (strength === 1) {
        passwordStrength.classList.add("strength-weak");
    } else if (strength === 2) {
        passwordStrength.classList.add("strength-medium");
    } else if (strength === 3) {
        passwordStrength.classList.add("strength-strong");
    } else if (strength === 4) {
        passwordStrength.classList.add("strength-very-strong");
    }
}