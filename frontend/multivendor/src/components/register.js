const Register = () => {
    return ( 
        <div>
                <div class="loginbackground-container mb-5">
        <div class="content-container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
            <h2 class="shopeoneH"> Home &gt; Register / Login</h2>
        </div>
      </div>

     {/* registration form */}

     <div class="container">
        <div class="row justify-content-center text-center">
            <a href="login.html" class="mr-3 login-heading nav-link">Login</a>
            <div class="heading">
                <a href="register.html" class="register-heading-action nav-link">Register</a>
                <hr class="underline-hr mx-auto"/>
            </div>
        </div>
    </div>
    


     {/* registration form ends */}

    <div class="container mb-5">
    <form class="registration-form">
        <h2>Register</h2>
        <label for="username">Username *</label>
        <input type="text" id="username" name="username" required/>

        <label for="contact">Phone number or Email *</label>
        <input type="text" id="contact" name="contact" required/>

        <label for="password">Password *</label>
        <input type="password" id="password" name="password" required/>

        <label>
            <input type="checkbox" id="privacy" name="privacy" required/>
            I agree to the <a href="#">privacy policy</a>
        </label>

        <button type="submit">Register</button>
    </form>
    </div>
        </div>
     );
}
 
export default Register;