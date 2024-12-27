const profileName = localStorage.getItem("USER_NAME")
const profileText = document.getElementById("profile-name-text");

profileText.innerHTML = `Profilul lui ${profileName}`