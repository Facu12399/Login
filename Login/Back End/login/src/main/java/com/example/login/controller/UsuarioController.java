package com.example.login.controller;

import com.example.login.model.Usuario;
import com.example.login.service.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"*"})
public class UsuarioController {

    @Autowired
    IUsuarioService usuarioServ;

    @PostMapping("/usuarios/crear")
    public String crearUsuario(@RequestBody Usuario usuario){
        usuarioServ.createUsuario(usuario);
        return "El usuario se creo correctamente";
    }

    @GetMapping("/usuarios/traer")
    public List<Usuario> leerUsuarios(){
        List<Usuario> listaUsuarios = usuarioServ.readUsuarios();
        return listaUsuarios;
    }

    @GetMapping("/usuario/traer/{id}")
    public Usuario leerUsuario(@PathVariable Long id){
        Usuario usuario = usuarioServ.findUsuario(id);
        return usuario;
    }

    @PutMapping("/usuarios/editar")
    public Usuario editarUsuario(@RequestBody Usuario usuario){
        usuarioServ.editUsuario(usuario);

        return usuarioServ.findUsuario(usuario.getId_usuario());
    }

    @DeleteMapping("/home/borrar/{id}")
    public String borrarUsuario(@PathVariable Long id){
        usuarioServ.deleteUsuario(id);

        return "El usuario se elimino correctamente";
    }

}
