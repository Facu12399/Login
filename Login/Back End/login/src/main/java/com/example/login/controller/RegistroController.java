package com.example.login.controller;

import com.example.login.dto.UsuarioDto;
import com.example.login.model.FileData;
import com.example.login.model.Persona;
import com.example.login.model.Usuario;
import com.example.login.service.IPersonaService;
import com.example.login.service.IUsuarioService;
import com.example.login.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin(origins = {"*"})
public class RegistroController {

    @Autowired
    IUsuarioService usuarioServ;

    @PostMapping("/usuarioDto/crear")
    public String crearUsuarioDto(@ModelAttribute UsuarioDto user) throws IOException {

        usuarioServ.createUsuarioDto(user);

        return "Se creó correctamente el usuario con la imagen adjunta.";
    }

    @PutMapping("/usuarioDto/editar/{id}")
    public String editarUsuarioDto(@ModelAttribute UsuarioDto usuarioDto, @PathVariable Long id) {
        try {
            usuarioServ.editUsuarioDto(usuarioDto, id);
            return "Usuario actualizado con éxito";
        } catch (IOException e) {
            // Log the exception details
            return "Error al actualizar el usuario";
        }
    }

    @DeleteMapping("/usuarioDto/eliminar/{id}")
    public String deleteUsuarioDto(@PathVariable Long id){
        try {
            usuarioServ.deleteUsuarioDto(id);
            return "Usuario eliminado con éxito";
        } catch (Exception e) {
            // Log the exception details
            return "Error al eliminar el usuario" + e;
        }
    }

    @PutMapping("/usuarioDto/editarPass/{id}")
    public String editarPassUsuarioDto(@ModelAttribute UsuarioDto usuarioDto, @PathVariable Long id){
        try {
            usuarioServ.editPassDto(usuarioDto, id);
            return "Usuario ha actualizado la contraseña con éxito";
        } catch (Exception e) {
            // Log the exception details
            return "Error al actualizar la contraseña del usuario";
        }
    }
}
