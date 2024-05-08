Este proyecto consiste en un Login de usuario, hecho tanto en Front End (HTML, CSS, JS, JQUERY, AJAX) y Back End (Java, Spring Boot). 
El Front End tiene un diseño sencillo, su dinamica es dar indicaciones a las posibles experiencias que pueda tener el usuario y esta adaptado para distintos dispositivos. 
En el Back End, hay 3 entidades Usuario (Datos del usuario), Persona (Datos personales del usuario) y FileData (Imagen del usuario). La experiencia del usuario es poder registrarse, luego poder ingresar al sistema. Una vez que ingresa puede ver todos los usuarios que se han registrado y sus datos, pero solo puede modificar a su propio usuario, y solo borrarse a el mismo. Tambien puede editarlo y cambiar de contraseña. 
Acontinuacion pondre un par de anotaciones que considero relevante saber que no hice y que deberia aprender: 
=> El usuario puede ver las contraseñas de otros usuarios, deberia preveer el uso de Spring Security que es algo que estare aprendiendo de aqui en adelante, el uso de ingreso de usuario a partir de un token y encriptar las contraseñas que se guarden. 
=> Un usuario puede guardarse bajo el mismo nombre, por lo tanto esto genera controversias, quizas sea mas facil de resolver. 
=> Utilice en su mayoria "alertas" que avisen al usuario lo que esta sucediendo. 
=> Use los parametros y datos del usuario para autenticar. Cuando se reedirige hacia una pagina el nombre del usuario aparece como parametro en su direccion URL.
