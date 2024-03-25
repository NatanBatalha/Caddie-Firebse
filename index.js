function validateFields() {
    const emailValid = isEmailValid();
    document.getElementById("recover-password-button").disabled = !emailValid;

    const passwordValid = isPasswordValid();
    document.getElementById("login-button").disabled = !emailValid || !passwordValid;

}

function isEmailValid() {
    const email = document.getElementById("email").value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    const password = document.getElementById("password").value;
    if (!password) {
        return false;
    }
    return true;
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

const form = {
    email: () => document.getElementById('email'),
    password: () => document.getElementById('password')
}

function getErrorMessage(error) {
    if (error.code == "auth/invalid-credential") {
        return "Double-check your login or password";
    }
    return error.message;
}

function enviarEmail() {

    var email = document.getElementById('email').value;
  

    firebase.auth().currentUser.sendEmailVerification()
      .then(function() {

        alert("E-mail de verificação enviado para " + email);
      })
      .catch(function(error) {

        console.error("Erro ao enviar e-mail de verificação:", error);
      });
  }

function login(){
    showLoading();
    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value
    ).then(response => {
        hideLoading();
        window.location.href = "home.html";
        enviarEmail();
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}

function register(){
    window.location.href = "register.html";
}

function recoverPassword(){
    showLoading();
    firebase.auth().sendPasswordResetEmail(
        form.email().value
        ).then(() => {
            hideLoading();
            alert("E-mail sent if you have registered with us");
    })
}
