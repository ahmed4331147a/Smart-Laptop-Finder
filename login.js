function toggleForms() {
    let loginForm = document.getElementById("loginForm");
    let registerForm = document.getElementById("registerForm");    
    document.getElementById("loginError").style.display = "none";
    document.getElementById("regError").style.display = "none";
    document.getElementById("regSuccess").style.display = "none";
    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        registerForm.style.display = "none";
    } else {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    }
}
function register() {
    let usernameInp = document.getElementById("regUsername").value.trim();
    let passwordInp = document.getElementById("regPassword").value.trim();
    let errorMsg = document.getElementById("regError");
    let successMsg = document.getElementById("regSuccess");
    errorMsg.style.display = "none";
    successMsg.style.display = "none";
    if (usernameInp === "" || passwordInp === "") {
        errorMsg.innerText = "⚠️ Please fill in all fields.";
        errorMsg.style.display = "block";
        return;
    }
    let users = JSON.parse(localStorage.getItem("usersData")) || [];
    let userExists = users.some(u => u.username === usernameInp);
    if (userExists) {
        errorMsg.innerText = "⚠️ Username already exists. Choose another one.";
        errorMsg.style.display = "block";
        return;
    }
    users.push({ username: usernameInp, password: passwordInp });
    localStorage.setItem("usersData", JSON.stringify(users));
    successMsg.innerText = "✅ Account created successfully! You can login now.";
    successMsg.style.display = "block";
    document.getElementById("regUsername").value = "";
    document.getElementById("regPassword").value = "";
    setTimeout(toggleForms, 2000);
}
function login() {
    let usernameInp = document.getElementById("loginUsername").value.trim();
    let passwordInp = document.getElementById("loginPassword").value.trim();
    let errorMsg = document.getElementById("loginError");
    errorMsg.style.display = "none";
    if (usernameInp === "" || passwordInp === "") {
        errorMsg.innerText = "⚠️ Please fill in all fields.";
        errorMsg.style.display = "block";
        return;
    }
    let users = JSON.parse(localStorage.getItem("usersData")) || [];
    let validUser = users.find(u => u.username === usernameInp && u.password === passwordInp);
    if (validUser) {
        localStorage.setItem("user", validUser.username);
        window.location.href = "index.html"; 
    } else {
        errorMsg.innerText = "❌ Invalid username or password!";
        errorMsg.style.display = "block";
    }
}