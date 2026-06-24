// JavaScript Document

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NSSB FOOD ORDERING SYSTEM</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <style>
        /* General Styles */
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-image: url(https://e0.pxfuel.com/wallpapers/391/776/desktop-wallpaper-white-background-white-metallic.jpg);
        }

        .container {
            padding-top: 80px; /* To prevent content overlap with the fixed header */
            padding-bottom: 70px; /* To prevent content overlap with the fixed navbar */
        }

        /* Header styles */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: transparent; /* Changed to transparent */
            padding: 10px;
            color: white;
            border: none; 
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
        }

        .logo1 {
            flex-grow: 1;
            text-align: center;
        }

        .profile-pic {
            width: 50px;
            height: 50px;
            cursor: pointer;
        }

        /* Navigation bar styles */
        .navbar {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: #1C36B8; /* Changed to a neutral color */
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 10px 0;
            box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
            z-index: 1000;
        }

        .navbar a {
            color: white;
            text-align: center;
            text-decoration: none;
            flex-grow: 1;
        }

        .navbar a img {
            width: 30px;
            height: 30px;
        }

        .navbar a span {
            display: block;
            font-size: 12px;
        }

        /* Sidebar styles */
        .sidebar {
            display: none;
            position: fixed;
            left: 0;
            top: 0;
            width: 180px; /* Reduced width */
            height: 100%;
            background-color: #333;
            color: white;
            padding: 15px;
            z-index: 1000;
            transition: transform 0.3s ease;
        }

        .sidebar ul {
            list-style-type: none;
            padding: 0;
        }

        .sidebar ul li {
            margin: 20px 0;
        }

        .sidebar ul li a {
            color: white;
            text-decoration: none;
        }

        /* Slider container */
        .slider-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto 20px;
            position: relative;
            overflow: hidden;
            border-radius: 10px;
        }

        /* Profile section styling */
        .profile-section {
            background-color: #333;
            padding: 20px;
            border-radius: 10px;
            margin: 20px;
            color: #fff;
        }

        /* Section Header Styling */
        .section-header {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            color: #fff;
        }

        /* Detail item styling */
        .detail-item {
            display: flex;
            align-items: center;
            background-color: #444;
            padding: 10px 15px;
            border-radius: 6px;
            margin-bottom: 10px;
            width: 100%; /* Ensure full width of the container */
        }

        .detail-item i {
            color: #fff;
            font-size: 18px;
            margin-right: 10px; /* Add space between icon and text */
        }

        .detail-item span {
            font-size: 16px;
            color: #ddd;
        }

        .profile-pic-container {
            display: flex;
            justify-content: center;
            margin-top: -50px;
        }

        .profile-pic {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background-color: white;
            border: 4px solid #1f1f1f;
            background-image: url('https://storage.googleapis.com/flutterflow-io-6f20.appspot.com/projects/travel-app-qq7yrm/assets/xw4qknuighs9/User-Profile-PNG-High-Quality-Image.png');
            background-size: cover;
            background-position: center;
        }
    </style>
</head>
<body>
    <!-- Header and Navigation -->
    <div class="header">
        <img src="pictures/hamburger.png" height="40" width="50" class="side-bar">
        <span class="logo1"><img src="pictures/new_logo.png" alt="Our Company" width="201" height="54" align="center"></span>
    </div>

    <div class="container">
        <!-- Profile Section -->
        <div class="profile-section">
            <div class="section-header">Your Account</div>
            <div id="userDetails">
                <!-- User details will be injected here via JavaScript -->
            </div>
        </div>

        <div class="profile-section">
            <div class="section-header">App Settings</div>
            <div class="detail-item">
                <i class="fas fa-edit"></i>
                <span>Edit Profile</span>
            </div>
        </div>
    </div>

    <!-- Navigation Bar -->
    <div class="navbar">
        <a href="#" id="homeLink"><img src="pictures/home_logo.png" alt="Home"><span>Home</span></a>
        <a href="#" id="profileLink"><img src="pictures/profile_icon.png" alt="Profile"><span>Profile</span></a>
        <a href="#" id="orderLink"><img src="pictures/order_icon_1.png" alt="Order"><span>Order</span></a>
    </div>

    <!-- Firebase Initialization -->
    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
        import { getFirestore, doc, getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
        import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

        const firebaseConfig = {
            apiKey: "AIzaSyCno2NNkzt3gLdC4CfZ4TlhwESQJgI_IXk",
            authDomain: "test-login2-e4c7f.firebaseapp.com",
            databaseURL: "https://test-login2-e4c7f-default-rtdb.firebaseio.com",
            projectId: "test-login2-e4c7f",
            storageBucket: "test-login2-e4c7f.appspot.com",
            messagingSenderId: "698181575885",
            appId: "1:698181575885:web:4e9110486e5c6fd5eab584"
        };

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app);

        const userDetails = document.querySelector('#userDetails');

        // Function to get user info from Firestore
        async function getUserInfo(userID) {
            const userDoc = await getDoc(doc(db, "users", userID));
            if (userDoc.exists()) {
                const userInfo = userDoc.data();
                userDetails.innerHTML = `
                    <div class="detail-item"><i class="fas fa-user"></i> <span>${userInfo.name || "N/A"}</span></div>
                    <div class="detail-item"><i class="fas fa-user-friends"></i> <span>${userInfo.lastName || "N/A"}</span></div>
                    <div class="detail-item"><i class="fas fa-phone"></i> <span>${userInfo.phone || "N/A"}</span></div>
                    <div class="detail-item"><i class="fas fa-id-card"></i> <span>${userInfo.employeeId || "N/A"}</span></div>
                    <div class="detail-item"><i class="fas fa-building"></i> <span>${userInfo.department || "N/A"}</span></div>
                `;
            } else {
                userDetails.innerHTML = `<p>User info not found</p>`;
            }
        }

        // Real-time update for user info
        async function getUserInfoRealtime(userID) {
            const userDocRef = doc(db, "users", userID);
            onSnapshot(userDocRef, (doc) => {
                if (doc.exists()) {
                    const userInfo = doc.data();
                    userDetails.innerHTML = `
                        <div class="detail-item"><i class="fas fa-user"></i> <span>${userInfo.name || "N/A"}</span></div>
                        <div class="detail-item"><i class="fas fa-user-friends"></i> <span>${userInfo.lastName || "N/A"}</span></div>
                        <div class="detail-item"><i class="fas fa-phone"></i> <span>${userInfo.phone || "N/A"}</span></div>
                        <div class="detail-item"><i class="fas fa-id-card"></i> <span>${userInfo.employeeId || "N/A"}</span></div>
                        <div class="detail-item"><i class="fas fa-building"></i> <span>${userInfo.department || "N/A"}</span></div>
                    `;
                }
            });
        }

        auth.onAuthStateChanged((user) => {
            if (user) {
                const userID = user.uid;
                getUserInfo(userID);
                getUserInfoRealtime(userID);
            } else {
                window.location.href = "/login";
            }
        });
    </script>
</body>
</html>
