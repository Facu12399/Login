//identifico las imagenes del ojo de "contraseña"
const ver_1 = document.getElementById('ver-1');
const esconder_1 = document.getElementById('esconder-1');

//identifico las imagenes del ojo de "nueva contraseña"
const ver_2 = document.getElementById('ver-2');
const esconder_2 = document.getElementById('esconder-2');

//identifico las imagenes del ojo de "repetir nueva contraseña"
const ver_3 = document.getElementById('ver-3');
const esconder_3 = document.getElementById('esconder-3');

//identifico el input que tiene que mostrar su contraseña 
let mostrar_1 = document.getElementById('cambiar-pass');

//identifico el input que tiene que mostrar su contraseña 
let mostrar_2 = document.getElementById('cambiar-new-pass');

//identifico el input que tiene que mostrar su contraseña 
let mostrar_3 = document.getElementById('cambiar-new-pass-1');

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

ver_3.addEventListener('click', function(){
    if(mostrar_3.type == "password"){
        mostrar_3.type = "text";
        ver_3.style.display = 'none';
        esconder_3.style.display = 'inline';
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

esconder_3.addEventListener('click', function(){
    if(mostrar_3.type === "text"){
        mostrar_3.type = "password";
        esconder_3.style.display = 'none';
        ver_3.style.display = 'inline';
    }
})