function register() {
    var name = document.getElementById('reg-name').value;
    var lastname = document.getElementById('reg-lastname').value;
    var email = document.getElementById('reg-email').value;
    var password = document.getElementById('reg-password').value;

    // Almacenamos el email y la contraseña en el almacenamiento local.
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    alert('Usuario registrado: ' + name + ' ' + lastname + ', ' + email);

    // Aquí deberías redirigir al usuario a la página de login o similar
}