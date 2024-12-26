
function updateBudgetValue(value) {
    document.getElementById('budgetValue').textContent = '$' + value;
}

function validateForm() {
    const destination = document.getElementById("destination").value;
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;

    if (!destination || !startDate || !endDate) {
        alert("Please fill out all fields.");
        return false;
    }

    if (new Date(startDate) >= new Date(endDate)) {
        alert("The end date must be later than the start date.");
        return false;
    }
    return true;
}

function calculateTripDuration() {
    const startDate = new Date(document.getElementById("start-date").value);
    const endDate = new Date(document.getElementById("end-date").value);
    const duration = (endDate - startDate) / (1000 * 60 * 60 * 24); 

    if (duration > 0) {
        alert(`Your trip is ${duration} days long.`);
    }
}

function confirmBooking(event) {
    event.preventDefault();
    if (validateForm()) {
        const confirmation = confirm("Do you want to submit the booking?");
        if (confirmation) {
            alert("Booking successful! We'll see you soon.");
            document.getElementById("bookingForm").submit();
        }
    }
}

function resetForm() {
    document.getElementById("bookingForm").reset();
    document.getElementById("budgetValue").textContent = "$1000";
}

document.getElementById("bookingForm").onsubmit = confirmBooking;

