$(document).ready( ()=>{

    let isUsuarioCreado = false; // Variable global para almacenar el estado de la creación del usuario

    const usuarioCreado = () => {
        isUsuarioCreado = true;
        $(location).prop("href", "../pages/registrarse.html");
    }

    //Mensaje de exito
    const message_exito = () =>{
        $('.success').css('display', 'block');
        setTimeout(() => {
            $('.success').remove();
        }, 6000);
    }

    //Limpiar datos una vez que se registra el usuario
    const limpiar = () => {
        $('#username-r').val(''),
        $('#pass-r').val(''),
        $('#pass-r-2').val(''),
        $('#mail').val(''),
        $('#name').val(''),
        $('#lastname').val(''),
        $('#dni').val(''),
        $('#perfil').val('')
    }

    //Codigo para validar el formulario
    const validarFormulario = () => {
        // Obtén los valores de los campos
        const nombre = $('#name').val().trim();
        const apellido = $('#lastname').val().trim();
        const dni = $('#dni').val().trim();
        const usuario = $('#username-r').val().trim();
        const contraseña = $('#pass-r').val().trim();
        const repetirContraseña = $('#pass-r-2').val().trim();
        const email = $('#mail').val().trim();

        // Verificamos que los campos no esten vacios
        if (nombre === '' || apellido === '' || dni === '' || usuario === '' ||
            contraseña === '' || repetirContraseña === '' || email === '') {
            alert('Todos los campos son obligatorios.');
            return false;
        } else{
            return true;
        }
    }

    if (isUsuarioCreado) {
        message_exito();
    }

    //Codigo para registrar un usuario
    const crear = () => {
        
        $('#crear').on('click', async (event) => { // Agrega async aquí

            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
        
            if(validarFormulario() == true){
                const file = $('#perfil').prop('files')[0];
                const formData = new FormData();
        
                const contra = $('#pass-r').val();
                const repeat = $('#pass-r-2').val();
        
                if(contra == repeat){
                    formData.append('username_usuario', $('#username-r').val());
                    formData.append('password_usuario', repeat);
                    formData.append('email_usuario', $('#mail').val());
                    formData.append('nombre_persona', $('#name').val())
                    formData.append('apellido_persona', $('#lastname').val())
                    formData.append('dni_persona',$('#dni').val()) 
                    if (file) {
                        formData.append('file', file);
                    } else {
                        // Agrego la imagen por defecto utilizando fetch
                        const response = await fetch('../img/perfil-defecto.webp'); // Agrega await aquí
                        const blob = await response.blob(); // Agrega await aquí
                        formData.append('file', blob, 'perfil-defecto.webp');
                    }
        
                    $.ajax({
                        url: 'http://localhost:8080/usuarioDto/crear',
                        type: 'POST',
                        data: formData,
                        enctype: 'multipart/form-data',
                        processData: false,
                        contentType: false,
                        success: function (res) {
                            console.log(res);
                            alert('Se ha registrado el usuario');
                        },
                        error: function (err) {
                            console.log('Hubo un error al intentar registrar los datos.', err);
                        }
                    });
                } else{
                    alert('No son iguales las contraseñas, intentelo de nuevo');
                }
            }
        });  
    };

    crear();
})