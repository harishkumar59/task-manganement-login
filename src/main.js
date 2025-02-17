console.log("JavaScript file loaded successfully!");

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    signInWithEmailAndPassword 
} from "firebase/auth";

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
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Configure Google Provider
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

console.log(app);

// Get DOM elements
const loginContainer = document.getElementById('loginContainer');
const loginForm = document.querySelector('.login-form');
const logoutBtn = document.getElementById('logoutBtn');
const googleBtn = document.querySelector('.google-btn');

// Check if user is logged in
function checkLoginStatus() {
    const user = auth.currentUser;
    if (user) {
        loginContainer.style.display = 'none';
        logoutBtn.style.display = 'flex';
        console.log('Logged in user:', user.email);
    } else {
        loginContainer.style.display = 'block';
        logoutBtn.style.display = 'none';
    }
}

// Handle regular login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Logged in successfully:', userCredential.user);
        checkLoginStatus();
    } catch (error) {
        console.error('Error:', error);
        alert('Login failed: ' + error.message);
    }
});

// Handle Google login
googleBtn.addEventListener('click', async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log('Google sign in successful:', user.email);
        checkLoginStatus();
    } catch (error) {
        console.error('Error:', error);
        const errorMessage = error.message;
        const email = error.customData?.email || '';
        const credential = GoogleAuthProvider.credentialFromError(error);
        alert('Google sign in failed: ' + errorMessage);
    }
});

// Handle logout
logoutBtn.addEventListener('click', async () => {
    try {
        await auth.signOut();
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        console.log('Logged out successfully');
        checkLoginStatus();
    } catch (error) {
        console.error('Error:', error);
        alert('Logout failed: ' + error.message);
    }
});

// Listen for auth state changes
auth.onAuthStateChanged((user) => {
    checkLoginStatus();
});

// Initial check for login status
checkLoginStatus();

