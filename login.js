const isLoggedIn = false
const currentPage = window.location.pathname

if(isLoggedIn && (currentPage === "/"  || currentPage === "/login.html" || currentPage === "/signup.html")){
    window.location.replace("/activitati.html")
}
else if(!isLoggedIn && (currentPage === "/obiective.html" || currentPage === "/profil.html" || currentPage === "/activitati.html")){
    window.location.replace("/index.html")
}