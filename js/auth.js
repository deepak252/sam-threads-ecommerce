// Get Current User Profile
const getUserProfile =()=>{
    return JSON.parse(localStorage.getItem("user"));
}

const setUserProfile =(user)=>{
    localStorage.setItem("user", JSON.stringify(user));
}


const checkSignedIn = ()=>{
    const user = getUserProfile();
    const userprofileNav = document.getElementById("userprofile__nav");
    const usernameNavLabel = document.getElementById("username__nav");
    const signinNavBtn = document.getElementById("btn__signin__nav");
    const signoutNavBtn = document.getElementById("btn__signout__nav");

    if(!user){
        //user not signed in
        if(userprofileNav){
            userprofileNav.style.display = 'none';
        }
        if(signoutNavBtn){
            signoutNavBtn.style.display = 'none';
        }
    }else{
        // user is signed in
        if(signinNavBtn){
            signinNavBtn.style.display = 'none';
        }
        if(usernameNavLabel){
            usernameNavLabel.textContent=user.username??'User 2';
        }
        // Navigate to home if current page is sign-in/sign-up
        if(location.pathname.includes("/sign-in")|| location.pathname.includes("/sign-up")){
            location = "/";
        }
    }
}


const handleSignOut = ()=>{
    localStorage.clear();
    location.reload();
}

const handleSignIn = ()=>{
    const signinForm = document.getElementById("signin_form");
    const usernameInput = document.getElementById("username_input");
    const passwordInput = document.getElementById("password_input");

    signinForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = usernameInput.value;
        console.log({username});
        const user = {
            username
        };
        // Save the user profile to localStorage
        setUserProfile(user)
        location.reload();
    });
}


const handleSignUp = ()=>{
    const signupForm = document.getElementById("signup_form");
    const usernameInput = document.getElementById("username_input");
    const emailInput = document.getElementById("email_input");
    const passwordInput = document.getElementById("password_input");
    const cfPasswordInput = document.getElementById("cfpassword_input");

    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = usernameInput.value;
        const email = emailInput.value;
        const user = {
            username,
            email
        };
        console.log(user);
        // Save the user profile to localStorage
        setUserProfile(user);
        location.reload();
    });
}

