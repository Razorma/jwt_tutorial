if (document.querySelector('.error')) {
    // If the innerHTML of the element is not empty
    if (document.querySelector('.error').innerHTML !== '') {
        // Set a timeout to clear the message after 3 seconds
        setTimeout(function () {
            document.querySelector('.error').innerHTML = '';
        }, 3000);
    }
}
if (document.querySelectorAll(".delete")) {
    // Loop through each delete button
    document.querySelectorAll(".delete").forEach((button) => {
        button.addEventListener("click", (event) => {
            if (!confirm("Are you sure you want to remove this booking?")) {
                event.preventDefault();
            }
        });
    });
}