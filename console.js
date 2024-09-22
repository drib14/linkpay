document.addEventListener('DOMContentLoaded', function () {
    // Show message function
    function showMessage(message, type) {
        const messageBox = document.getElementById('message-box');
        messageBox.innerHTML = message;
        messageBox.className = `message-box ${type}`; // Set class for styling
        messageBox.style.display = 'block'; // Show message box
    }

    // Registration Logic
    document.getElementById('register-form')?.addEventListener('submit', function (event) {
        event.preventDefault();

        const fullName = document.getElementById('full-name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;

        const userData = {
            fullName,
            email,
            password,
            phone,
            address
        };

        localStorage.setItem('userData', JSON.stringify(userData));
        showMessage("Registration successful! You can now log in.", "success");
        window.location.href = 'login.html';
    });

    // Login Logic
    document.getElementById('login-form')?.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const storedUserData = JSON.parse(localStorage.getItem('userData'));

        if (storedUserData && email === storedUserData.email && password === storedUserData.password) {
            showMessage("Login successful!", "success");
            window.location.href = 'dashboard.html';
        } else {
            showMessage("Invalid email or password. Please try again.", "error");
        }
    });
});
