import { auth } from './firebaseConfig.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
// 1. ADDED: Import Firestore to check user status
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// 2. ADDED: Initialize db
const db = getFirestore();

// Listen for the browser's Back/Forward Cache
window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
        // If loaded from cache (user clicked back), force a reload to trigger Firebase Auth check
        window.location.reload();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // 3. ADDED: Made this callback 'async' so we can fetch Firestore data
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            // Kick them out, REPLACE history so they can't go back. Added '/' to go to root.
            window.location.replace("/login_pg.html");
        } else {
            console.log("Logged in as:", user.email);

            // ==========================================
            // 4. ADDED: Check if user was marked 'resigned' while already logged in
            // ==========================================
            try {
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);
                
                if (userDocSnap.exists() && userDocSnap.data().status === 'resigned') {
                    console.log("User is marked as resigned. Forcing logout.");
                    alert("Your session has been terminated because your account status is 'resigned'.");
                    
                    // Destroy their session and kick them out immediately. Added '/' to go to root.
                    await signOut(auth);
                    window.location.replace("/login_pg.html");
                    return; // Stop the rest of the script
                }
            } catch (error) {
                console.error("Error checking user status in Auth Guard:", error);
            }
            // ==========================================

            // Attach logout to ALL buttons (handles both ID and Class used in legacy code)
            const logoutButtons = document.querySelectorAll('#logout-btn, .logout-action');
            
            logoutButtons.forEach(button => {
                button.addEventListener("click", async (e) => {
                    e.preventDefault();
                    try {
                        await signOut(auth);
                        // Destroy history on logout. Added '/' to go to root.
                        window.location.replace("/login_pg.html");
                    } catch (err) {
                        console.error("Error signing out:", err);
                        alert("There was an error logging out. Please try again.");
                    }
                });
            });
        }
    });
});