$(document).ready( ()=>{
    let isValidated = false
    //Codigo para ingresar 
    const ingresar = () =>{
        $('#btn').on('click', function(event){
            event.preventDefault();

            const username = $('#username').val();
            const password = $('#password').val();

            $.ajax({
                url: 'http://localhost:8080/usuarios/traer',
                type: 'GET',
                dataType: 'json',
                success: function (res){
                    let encontrar = false;
                    res.forEach(element => {
                        if(element.username === username && element.password === password){
                            encontrar = true;
                            $(location).prop("href", `./pages/home.html?usuario=${element.username}`);
                        }
                    });

                    if(!encontrar){
                        const error = `<span>Usuario o contraseña incorrectos</span>`;
                        if (!isValidated) {
                            $('#error').append(error);
                            isValidated = true;

                        }
                    }
                },
                error: function(){
                    const error = `<span>Error al conectar con el servidor</span>`;
                    if (!isValidated){
                        $('#error').append(error);
                        isValidated = true;
                    }
                } 
            })

            
        })
    }
    ingresar();

    //Codigo para listar todos los usuarios que se han registrado
    const listar = () => {

        $.ajax({
            url: 'http://localhost:8080/usuarios/traer',
            type: 'GET',
            dataType: 'json',
            success: function (res) {
    
                let data = "";

                const urlParams = new URLSearchParams(window.location.search);
                const usuarioParam = urlParams.get('usuario');

                res.forEach(element => {

                    if (usuarioParam == element.username) {
                        const bienvenida = `<span>Bienvenido, ${usuarioParam}</span>`;
                        $('#name_usuario').append(bienvenida);
        
                        if(element.file == null){
                            // Obtener la URL de la foto de perfil
                            const fotoPerfilURL = '../img/perfil-defecto.webp';

                            // Mostrar la foto de perfil
                            const perfil = `<img id="perfil" src="${fotoPerfilURL}" alt="Foto de perfil">`;
                            $('#foto').append(perfil);
                        } else{
                            // Obtener la URL de la foto de perfil
                            const fotoPerfilURL = '../img/' + element.file.name;
                
                            // Mostrar la foto de perfil
                            const perfil = `<img id="perfil" src="${fotoPerfilURL}" alt="Foto de perfil">`;
                            $('#foto').append(perfil);
                        }
                    }

                    //Hacemos la autenticacion, cada usuario una vez al ingresar puede editar o eliminar solo su usuario
                    //Puede ver los datos del resto pero solo puede intervenir en acciones para su usuario
                    if(usuarioParam == element.username){
                    data += `
                        <tr id_usuario = ${element.id_usuario}>
                            <td>${element.id_usuario}</td>
                            <td>${element.username}</td>
                            <td>${element.password}</td>
                            <td>${element.email}</td>
                            <td>${element.persona.nombre}</td>
                            <td>${element.persona.apellido}</td>
                            <td>${element.persona.dni}</td>
                            <td>
                                <button id="btn-editar">Editar</button>
                                <button id="btn-eliminar">Eliminar</button>
                            </td>
                        </tr>
                    `}else{
                        data += `
                        <tr id_usuario = ${element.id_usuario}>
                            <td>${element.id_usuario}</td>
                            <td>${element.username}</td>
                            <td>${element.password}</td>
                            <td>${element.email}</td>
                            <td>${element.persona.nombre}</td>
                            <td>${element.persona.apellido}</td>
                            <td>${element.persona.dni}</td>
                            <td>
                                <span>Sin acciones disponibles</span>
                            </td>
                        </tr>
                    `
                    }
                });
                $('.datos').html(data);
    
                $('#btn-editar').on('click', function(event){
                    event.preventDefault();
            
                    const urlParams = new URLSearchParams(window.location.search);
                    const usuarioParam = urlParams.get('usuario');
            
                    $(location).prop("href", `./edicion.html?usuario=${usuarioParam}`);

                })
            }
        })
    }

    listar();

    //Codigo para volver del home.html al index.html
    const comeback_index = () =>{
        $('.navegacion #btn').on('click', function(){
            $(location).prop("href", "../index.html");
        })
    }
    comeback_index();

    //Codigo para editar un usuario
    const editar = () =>{

        const urlParams = new URLSearchParams(window.location.search);
        const usuarioParam = urlParams.get('usuario');

        $('#cambio').on('click', function(event){
            event.preventDefault();
    
            const urlParams = new URLSearchParams(window.location.search);
            const usuarioParam = urlParams.get('usuario');
    
            $(location).prop("href", `./cambiarcontra.html?usuario=${usuarioParam}`);

        })

        $.ajax({
            url: 'http://localhost:8080/usuarios/traer',
            type: 'GET',
            dataType: 'json',
            success: function(res){
                res.forEach(element=>{

                    if(usuarioParam == element.username){
                        var formData = new FormData();
                        formData.append('nombre', element.persona.nombre);
                        formData.append('apellido', element.persona.apellido);
                        formData.append('dni', element.persona.dni);
                        formData.append('username', element.username);
                        formData.append('email', element.email);
                        formData.append('file', element.file);

                        $('#edicion-name').val(element.persona.nombre);
                        $('#edicion-lastname').val(element.persona.apellido);
                        $('#edicion-dni').val(element.persona.dni);
                        $('#edicion-username-r').val(element.username);
                        $('#edicion-mail').val(element.email);
                        $('#nombre-archivo').text(element.file.name);

                        const actualizar = () => {
                            $('#edit').on('click', (event) => {
                                event.preventDefault();
                        
                                const file = $('#edicion-perfil').prop('files')[0];
                                const formData = new FormData();
                        
                                formData.append('username_usuario', $('#edicion-username-r').val());
                                formData.append('password_usuario', element.password);
                                formData.append('email_usuario', $('#edicion-mail').val());
                                formData.append('nombre_persona', $('#edicion-name').val());
                                formData.append('apellido_persona', $('#edicion-lastname').val());
                                formData.append('dni_persona', $('#edicion-dni').val());
                                formData.append('file', file);
                        
                                $.ajax({
                                    url: 'http://localhost:8080/usuarioDto/editar/' + element.id_usuario,
                                    type: 'PUT',
                                    data: formData,
                                    enctype: 'multipart/form-data',
                                    processData: false,
                                    contentType: false,
                                    success: function (res) {
                                        console.log("Exito");
                                        console.log(res);
                                    },
                                    error: function (err) {
                                        console.log('Hubo un error al intentar actualizar los datos.', err);
                                    }
                                });
                            });
                        };
                        
                        actualizar();
                        
                    }

                })
            },
            error: function(err){
                console.log("Ha ocurrido un error ", err)
            }

        })
    }
    editar();

    //Codigo para eliminar un usuario
    const eliminar = () => {

        $.ajax({
            url: 'http://localhost:8080/usuarios/traer',
            type: 'GET',
            dataType: 'json',
            success: function(res){
                let data = "";
            
                const urlParams = new URLSearchParams(window.location.search);
                const usuarioParam = urlParams.get('usuario');
            
                res.forEach(element => {
                    if(usuarioParam == element.username){
                        $('#btn-eliminar').on('click', function(event){

                            event.preventDefault();

                            $.ajax({
                                url: 'http://localhost:8080/usuarioDto/eliminar/' + element.id_usuario,
                                type: 'DELETE',
                                success: function(res){
                                    console.log(res);
                                    alert('El usuario ' + element.username + ' se ha eliminado con exito')
                                    $(location).prop("href", "../index.html");
                                },
                                error: function(err){
                                    console.log("Ha ocurrido un error ", err);
                                }
                            })
                        })
                    }
                })
            }

        })
    }

    eliminar();

    //Codigo para cambiar la contraseña del usuario
    const editarPass = () =>{
        const urlParams = new URLSearchParams(window.location.search);
        const usuarioParam = urlParams.get('usuario');

        $.ajax({
            url: 'http://localhost:8080/usuarios/traer',
            type: 'GET',
            dataType: 'json',
            success: function(res){

                res.forEach(element => {
                    if(usuarioParam == element.username){

                        var formData = new FormData();
                        formData.append('nombre', element.persona.nombre);
                        formData.append('apellido', element.persona.apellido);
                        formData.append('dni', element.persona.dni);
                        formData.append('username', element.username);
                        formData.append('password', element.password)
                        formData.append('email', element.email);
                        formData.append('file', element.file);

                        console.log(element.username);

                        const actualizarPass = () =>{
                            $('#cambiar').on('click', function(event){
                                event.preventDefault();
    
                                const formData = new FormData();
                            
                                formData.append('username_usuario', element.username);
    
                                contra = $('#cambiar-new-pass').val();
                                repeat = $('#cambiar-new-pass-1').val();
                                if(contra == repeat){
                                    formData.append('password_usuario', repeat);
                                    formData.append('email_usuario', element.email);
                                    formData.append('nombre_persona', element.persona.nombre);
                                    formData.append('apellido_persona', element.persona.apellido);
                                    formData.append('dni_persona', element.persona.dni);

                                    $.ajax({
                                        url: 'http://localhost:8080/usuarioDto/editarPass/'+ element.id_usuario,
                                        type: 'PUT',
                                        data: formData,
                                        enctype: 'multipart/form-data',
                                        processData: false,
                                        contentType: false,
                                        success: function (res) {
                                            console.log("Actualizado");
                                            console.log(res);
                                            alert('El usuario ' + element.username + ' ha actualizado con exito su contraseña.')
                                            $(location).prop("href", "../index.html");
                                        },
                                        error: function (err) {
                                            console.log('Hubo un error al intentar actualizar la contraseña.', err);
                                        }
                                    })
                                } else{
                                    alert('No son iguales las contraseñas, intentelo de nuevo');
                                }
                                
                            })
                        }

                        actualizarPass();
                    }
                })
            },
            error: function(err){
                console.log('Ha ocurrido un error => ', err);
            }
        });
    }

    editarPass();
})