// Helper Function to Display Errors
function displayError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

// Navigation between pages
document.getElementById('signup-btn').addEventListener('click', () => {
    document.getElementById('home-page').classList.add('hidden');
    document.getElementById('signup-page').classList.remove('hidden');
});

document.getElementById('login-btn').addEventListener('click', () => {
    document.getElementById('home-page').classList.add('hidden');
    document.getElementById('login-page').classList.remove('hidden');
});

document.getElementById('close-signup').addEventListener('click', () => {
    document.getElementById('signup-page').classList.add('hidden');
    document.getElementById('home-page').classList.remove('hidden');
});

document.getElementById('close-login').addEventListener('click', () => {
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('home-page').classList.remove('hidden');
});

// Signup functionality
document.getElementById('signup-submit').addEventListener('click', async () => {
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const error = document.getElementById('signup-error');

    if (name && email && password) {
        try {
            const response = await fetch('http://localhost:4000/api/user/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Sign Up Successful! Redirecting to Login page...');
                error.style.display = 'none';
                document.getElementById('signup-page').classList.add('hidden');
                document.getElementById('login-page').classList.remove('hidden');
            } else {
                displayError(error, data.message || 'Sign Up Failed!');
            }
        } catch (err) {
            displayError(error, 'An error occurred. Please try again later.');
        }
    } else {
        displayError(error, 'All fields are required!');
    }
});

// Login functionality
document.getElementById('login-submit').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const error = document.getElementById('login-error');

    if (email && password) {
        try {
            const response = await fetch('http://localhost:4000/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Welcome back, ${data.user.name}!`);
                error.style.display = 'none';
                localStorage.setItem('user', JSON.stringify(data));

                // Redirect to the home page
                document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
                document.getElementById('home-page').classList.remove('hidden');
            } else {
                displayError(error, data.message || 'Invalid email or password.');
            }
        } catch (err) {
            displayError(error, 'An error occurred. Please try again later.');
        }
    } else {
        displayError(error, 'All fields are required!');
    }
});
