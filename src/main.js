

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQ5-4M5GvNBnVZXv_jgvvtEN9kRgk8Wkg",
  authDomain: "task-ba355.firebaseapp.com",
  projectId: "task-ba355",
  storageBucket: "task-ba355.firebasestorage.app",
  messagingSenderId: "232013476051",
  appId: "1:232013476051:web:fa63e009222bbb34ffa426",
  measurementId: "G-Q8GW4B1C5G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);





// Get DOM elements
const loginContainer = document.getElementById('loginContainer');
const loginForm = document.querySelector('.login-form');
const logoutBtn = document.getElementById('logoutBtn');
const googleBtn = document.querySelector('.google-btn');

// Check if user is logged in
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        loginContainer.style.display = 'none';
        logoutBtn.style.display = 'flex';
    } else {
        loginContainer.style.display = 'block';
        logoutBtn.style.display = 'none';
    }
}

// Handle regular login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Here you would typically validate credentials with a backend
    // For demo purposes, we'll just check if fields are not empty
    if (email && password) {
        localStorage.setItem('isLoggedIn', 'true');
        checkLoginStatus();
    }
});

// Handle Google login
googleBtn.addEventListener('click', () => {
    // Here you would implement Google OAuth
    // For demo purposes, we'll just simulate a login
    localStorage.setItem('isLoggedIn', 'true');
    checkLoginStatus();
});

// Handle logout
logoutBtn.addEventListener('click', () => {
    localStorage.setItem('isLoggedIn', 'false');
    checkLoginStatus();
    // Clear form fields
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
});

// Check login status when page loads
checkLoginStatus();

