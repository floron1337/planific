import users from './users.json' with {type: "json"};

const isLoggedIn = localStorage.getItem("LOGGED_IN") || false;
const currentPage = window.location.pathname

if(isLoggedIn && (currentPage === "/"  || currentPage === "/index.html" || currentPage === "/login.html" || currentPage === "/signup.html")){
    window.location.replace("/activitati.html")
}
else if(!isLoggedIn && (currentPage === "/obiective.html" || currentPage === "/profil.html" || currentPage === "/activitati.html")){
    window.location.replace("/index.html")
}

function logIn(email, password){
    if(users[email] && users[email].password === password){
        localStorage.setItem("LOGGED_IN", true);
        localStorage.setItem("USER_EMAIL", email);
        localStorage.setItem("USER_NAME", users[email].name);
        localStorage.setItem("USER_PASSWORD", password);
        location.reload();
        return true;
    }
    return false;
}

function signUp(name, email, password){
    users[email] = {
        "name": name,
        "password": password
    }
    return logIn(email, password);
}

function logOut(){
    if(isLoggedIn){
        localStorage.clear();
        location.reload();
    }
}

function submitLoginForm(e){
    e.preventDefault();
    const loginForm = document.forms["login-form"];
    if(loginForm){
        const email = loginForm["email"].value;
        const password = loginForm["password"].value;
        const success = logIn(email, password);

        if(!success){
            const errorDisplay = document.getElementById("login-error");
            errorDisplay.innerHTML = "Datele introduse sunt invalide!";
            errorDisplay.className = "shake-animation";
        }
    }
}
const loginButton = document.getElementById("login-btn");
if(loginButton)
    loginButton.addEventListener("click", submitLoginForm);

function submitSignupForm(e){
    e.preventDefault();
    const signupForm = document.forms["signup-form"];
    if(signupForm){
        const email = signupForm["email"].value;
        const name = signupForm["name"].value;
        const password = signupForm["password"].value;
        const passwordConfirm = signupForm["password-confirm"].value;
        const errorDisplay = document.getElementById("signup-error");

        if(password != passwordConfirm){
            errorDisplay.innerHTML = "Parolele sunt diferite!";
            return;
        }

        const success = signUp(name, email, password);
        if(!success){
            errorDisplay.innerHTML = "A intervenit o eroare interna!";
            return;
        }
    }
}
const signupButton = document.getElementById("signup-btn");
if(signupButton)
    signupButton.addEventListener("click", submitSignupForm);

const logoutButton = document.getElementById("logout-btn");
if(logoutButton)
    logoutButton.addEventListener("click", logOut);

