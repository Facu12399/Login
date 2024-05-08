package com.example.login.service;

import com.example.login.dto.UsuarioDto;
import com.example.login.model.FileData;
import com.example.login.model.Persona;
import com.example.login.model.Usuario;

import java.io.IOException;
import java.util.List;

public interface IUsuarioService {
    //crear usuario
    public void createUsuario(Usuario usuario);

    //leer usuarios
    public List<Usuario> readUsuarios();

    //encontrar usuario
    public Usuario findUsuario(Long id);

    //editar usuario
    public void editUsuario(Usuario usuario);

    //eliminar usuario
    public void deleteUsuario(Long id);

    public void createUsuarioDto(UsuarioDto usuarioDto) throws IOException;

    public void editUsuarioDto(UsuarioDto usuarioDto, Long id) throws  IOException;

    public void deleteUsuarioDto(Long id) throws IOException;

    public void editPassDto(UsuarioDto usuarioDto, Long id);

}
