//identifico las imagenes del ojo de "contraseña"
const ver_1 = document.getElementById('ver-1');
const esconder_1 = document.getElementById('esconder-1');

//identifico las imagenes del ojo de "repetir contraseña"
const ver_2 = document.getElementById('ver-2');
const esconder_2 = document.getElementById('esconder-2');

//identifico el input que tiene que mostrar su contraseña 
let mostrar_1 = document.getElementById('pass-r');

//identifico el input que tiene que mostrar su contraseña 
let mostrar_2 = document.getElementById('pass-r-2');

ver_1.addEventListener('click', function(){
    if(mostrar_1.type == "password"){
        mostrar_1.type = "text";
        ver_1.style.display = 'none';
        esconder_1.style.display = 'inline';
    }
})

ver_2.addEventListener('click', function(){
    if(mostrar_2.type == "password"){
        mostrar_2.type = "text";
        ver_2.style.display = 'none';
        esconder_2.style.display = 'inline';
    }
})

esconder_1.addEventListener('click', function(){
    if(mostrar_1.type === "text"){
        mostrar_1.type = "password";
        esconder_1.style.display = 'none';
        ver_1.style.display = 'inline';
    }
})

esconder_2.addEventListener('click', function(){
    if(mostrar_2.type === "text"){
        mostrar_2.type = "password";
        esconder_2.style.display = 'none';
        ver_2.style.display = 'inline';
    }
})