<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign_In</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-image: url(https://e0.pxfuel.com/wallpapers/391/776/desktop-wallpaper-white-background-white-metallic.jpg);
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
          
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            padding-top: 0px; /* Padding to account for fixed header */
            padding-bottom: 60px; /* Padding to account for fixed footer */
        }

        /* Footer styles */
        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            
            background-color: #0C0E8B;
            color: #fff;
            margin-top: 20px;
            z-index: 1000;
            text-align: center;
        }

        /* Form Styles */
        form {
            max-width: 400px;
            margin: 50px auto;
            padding: 10px;
        }

        form h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #333;
        }

        form label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: #333;
        }

        form input {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-sizing: border-box;
        }

        form button {
            width: 100%;
            padding: 10px;
            background-color: #1C36B8;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        form button:hover {
            background-color: #143b7b;
        }
		
		h2 {
			text-align: center;
			text-decoration-style: solid;
			font-family: Cambria, "Hoefler Text", "Liberation Serif", Times, "Times New Roman", "serif";
			font-size: 40px;
			align-content: center;
		}

        h1 {
            font-size: 30px;
            font-weight: bold;
            margin-bottom: 10px;
            text-align: center;
        }

        p {
            text-align: center;
        }

        .input-group {
            margin-bottom: 15px;
            position: relative;
        }

        input[type="text"],
        input[type="password"] {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }

        input[type="text"]:focus,
        input[type="password"]:focus {
            outline: none;
            border-color: #5356E4;
        }

        .input-group i {
            position: absolute;
            top: 12px;
            left: 12px;
            color: #ddd;
        }

        .input-group .icon-right {
            position: absolute;
            top: 12px;
            right: 12px;
            color: #ddd;
        }

        button[type="submit"] {
            background-color: #0C0E8B;
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
            font-size: 16px;
        }

        button[type="submit"]:hover {
            background-color: #585858;
        }

        .remember {
            display: flex;
            align-items: center;
            justify-content: flex-start; /* Align items to the left */
            margin-bottom: 15px;
        }

        .remember input[type="checkbox"] {
            margin-right: 5px;
        }

        .forgot-password {
            text-align: right;
        }

        .forgot-password a {
            color: #5356E4;
            text-decoration: none;
        }

        .forgot-password a:hover {
            text-decoration: underline;
        }

        .signup {
            text-align: right;
            margin-top: 10px;
        }

        .signup a {
            color: #5356E4;
            text-decoration: none;
            font-size: 14px;
        }

        .signup a:hover {
            text-decoration: underline;
        }

        .notification {
            display: none;
            position: fixed;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #f0f0f0;
            padding: 10px 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            opacity: 0;
            transition: opacity 0.5s, top 0.5s;
        }

        .notification.success {
            background-color: #d4edda;
            color: #155724;
        }

        .notification.error {
            background-color: #f8d7da;
            color: #721c24;
        }
    .container .form-container h1 {
    font-family: Cambria, Hoefler Text, Liberation Serif, Times, Times New Roman, serif;
}
    .container .form-container h1 {
    font-family: Lucida Grande, Lucida Sans Unicode, Lucida Sans, DejaVu Sans, Verdana, sans-serif;
}
    .container .form-container h1 {
    font-family: Consolas, Andale Mono, Lucida Console, Lucida Sans Typewriter, Monaco, Courier New, monospace;
		
}
    </style>
</head>
<body>
    <!-- Logo Only --> <div class="container">
       <div class="form-container">
    <div style="text-align:center; "><img src="pictures/nssb_logo_text1.png" alt="Home" width="324" height="87">
    </div>

   
            <h2>Welcome Back</h2>
           <h3 style="font-size: 20px; text-align: center;">Login to your account</h3>
            <form id="loginForm">
                <div class="input-group">
                    <i class="fas fa-user"></i>
                  <input type="text" id="username" placeholder="Username" required>
                </div>
                <div class="input-group">
                    <i class="fas fa-lock"></i>
                    <input type="password" id="password" placeholder="Password" required>
                    <i class="fas fa-eye icon-right"></i>
                </div>
               
              <div class="forgot-password">
                    <a href="#" id="forgotPasswordLink">Forgot Password?</a>
              </div>
                <button type="submit">LOGIN</button>
                <div class="signup">
					<h5>Dont't have an account yet?</h5>
                    <a href="#">Sign In</a>
                </div>
            </form>
      </div>
</div>
    <div id="notification" class="notification"></div>

<div class="footer">
  <p style="text-align: center"> ©NAMICOH SURIA SDN BHD @NSSB </p>
</div>
	

</body>
	
</html>
