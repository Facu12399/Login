package com.example.login.dto;

import com.example.login.model.FileData;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter @Setter
public class UsuarioDto {
    private Long usuarioId;
    private String username_usuario;
    private String password_usuario;
    private String email_usuario;
    private String nombre_persona;
    private String apellido_persona;
    private String dni_persona;
    private MultipartFile file;

    public UsuarioDto() {
    }

    public UsuarioDto(Long usuarioId, String username_usuario, String password_usuario, String email_usuario, String nombre_persona, String apellido_persona, String dni_persona, MultipartFile file) {
        this.usuarioId = usuarioId;
        this.username_usuario = username_usuario;
        this.password_usuario = password_usuario;
        this.email_usuario = email_usuario;
        this.nombre_persona = nombre_persona;
        this.apellido_persona = apellido_persona;
        this.dni_persona = dni_persona;
        this.file = file;
    }
}
