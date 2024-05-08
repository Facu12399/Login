//identifico las imagenes del ojo del password
const ver = document.getElementById('ver');
const esconder = document.getElementById('esconder');

//identifico el input que tiene que mostrar su contraseña 
let mostrar = document.getElementById('password');

ver.addEventListener('click', function(){
    if(mostrar.type == "password"){
        mostrar.type = "text";
        ver.style.display = 'none';
        esconder.style.display = 'inline';
    }
})

esconder.addEventListener('click', function(){
    if(mostrar.type === "text"){
        mostrar.type = "password";
        esconder.style.display = 'none';
        ver.style.display = 'inline';
    }
})