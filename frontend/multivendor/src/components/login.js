const Login = () => {
    return ( 
        <div>
                <div class="loginbackground-container mb-5">
        <div class="content-container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
            <h2 class="shopeoneH"> Home &gt; Register / Login</h2>
        </div>
      </div>

     <div class="container">
        <div class="row justify-content-center text-center">
            <div class="heading">
                <a href="login.html" class=" mr-3 register-heading-action nav-link">Login</a>
                <hr class="underline-hr mx-auto"/>
            </div>
            <a href="register.html" class=" login-heading nav-link">Register</a>
        </div>
    </div>

     <div class="container mb-5">
        <form class="registration-form">
            <h2>Login</h2>

            <label for="contact">Phone number or Email *</label>
            <input type="text" id="contact" name="contact" required/>

            <label for="password">Password *</label>
            <input type="password" id="password" name="password" required/>

            <div class="row justify-content-between mb-3">
                <div class="col-auto">
                    <a href="#">Forgot Password</a>
                </div>
                <div class="col-auto d-flex align-items-center">
                    <label class="mb-0">
                        <input type="checkbox" class="mr-1"/>
                        Remember me
                    </label>
                </div>
            </div>

            <button type="submit">Login</button>
        </form>
    </div>
        </div>
     );
}
 
export default Login;