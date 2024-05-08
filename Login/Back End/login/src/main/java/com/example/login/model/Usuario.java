package com.example.login.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
@Table(name = "usuario")
public class Usuario{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_usuario;
    private String username;
    private String password;
    private String email;

    @OneToOne
    @JoinColumn(name = "idPersona", referencedColumnName = "id_persona")
    private Persona persona;

    @OneToOne
    @JoinColumn(name = "idFile", referencedColumnName = "id")
    private FileData file;

    public Usuario() {
    }

    public Usuario(Long id_usuario, String username, String password, String email,
                   Persona persona, FileData file) {
        this.id_usuario = id_usuario;
        this.username = username;
        this.password = password;
        this.email = email;
        this.persona = persona;
        this.file = file;
    }
}
