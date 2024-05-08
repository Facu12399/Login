package com.example.login.service;

import com.example.login.dto.UsuarioDto;
import com.example.login.model.FileData;
import com.example.login.model.Persona;
import com.example.login.model.Usuario;
import com.example.login.repository.IFileDataRepository;
import com.example.login.repository.IPersonaRepository;
import com.example.login.repository.IUsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class UsuarioService implements IUsuarioService{

    @Autowired
    private IUsuarioRepository usuarioRepo;

    @Autowired
    private IPersonaRepository personaRepo;

    @Autowired
    private IFileDataRepository fileDataRepo;

    private final String FOLDER_PATH="C:/Users/Usuario/Documents/Facundo/Login/Front end/img/";

    @Override
    public void createUsuario(Usuario usuario) {
        usuarioRepo.save(usuario);
    }

    @Override
    public List<Usuario> readUsuarios() {
        List<Usuario> listaUsuarios = usuarioRepo.findAll();
        return listaUsuarios;
    }

    @Override
    public Usuario findUsuario(Long id) {
        Usuario usuario = usuarioRepo.findById(id).orElse(null);
        return usuario;
    }

    @Override
    public void editUsuario(Usuario usuario) {
        this.createUsuario(usuario);
    }

    @Override
    public void deleteUsuario(Long id) {
        usuarioRepo.deleteById(id);
    }

    //Esto sirve para hacer el registro de datos desde el cliente
    @Override
    public void createUsuarioDto(UsuarioDto usuarioDto) throws IOException {
        Persona persona = new Persona();

        //Creamos la persona
        persona.setNombre(usuarioDto.getNombre_persona());
        persona.setApellido(usuarioDto.getApellido_persona());
        persona.setDni(usuarioDto.getDni_persona());

        //Creamos el usuario
        Usuario usuario = new Usuario();
        usuario.setUsername(usuarioDto.getUsername_usuario());
        usuario.setPassword(usuarioDto.getPassword_usuario());
        usuario.setEmail(usuarioDto.getEmail_usuario());
        usuario.setPersona(persona);

        // Guardamos el file si es que está presente en el DTO
        if (usuarioDto.getFile() != null && !usuarioDto.getFile().isEmpty()) {
            String filePath = FOLDER_PATH + usuarioDto.getFile().getOriginalFilename();

            FileData fileData = fileDataRepo.save(FileData.builder()
                    .name(usuarioDto.getFile().getOriginalFilename())
                    .type(usuarioDto.getFile().getContentType())
                    .filePath(filePath).build());

            usuarioDto.getFile().transferTo(new File(filePath));

            // Le agregamos el file al usuario
            usuario.setFile(fileData);
        } else {
            // Asignamos una imagen por defecto
            String defaultImagePath = FOLDER_PATH + "perfil-defecto.webp";
            FileData defaultFileData = fileDataRepo.save(FileData.builder()
                    .name("perfil-defecto.webp")
                    .type("image/webp")
                    .filePath(defaultImagePath).build());

            usuario.setFile(defaultFileData);
        }

        // Guardamos entidades
        personaRepo.save(persona);
        usuarioRepo.save(usuario);
    }

    @Override
    public void editUsuarioDto(UsuarioDto usuarioDto, Long id) throws IOException {

        //Usuario
        Usuario usuario = usuarioRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        // Actualizar la entidad Usuario con los datos del DTO
        usuario.setUsername(usuarioDto.getUsername_usuario());
        usuario.setEmail(usuarioDto.getEmail_usuario());

        //Persona
        Persona persona = personaRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Persona no encontrada"));

        // Actualizar persona
        persona.setNombre(usuarioDto.getNombre_persona());
        persona.setApellido(usuarioDto.getApellido_persona());

        if (usuarioDto.getFile() != null) {
            // Obtenemos el file asociado al usuario
            FileData currentFileData = usuario.getFile();

            if (currentFileData != null) {
                // Eliminamos el archivo antiguo
                File oldFile = new File(currentFileData.getFilePath());
                if (oldFile.exists()) {
                    oldFile.delete();
                }

                // Reemplazamos el archivo viejo por el nuevo
                String newFilePath = FOLDER_PATH + usuarioDto.getFile().getOriginalFilename();
                usuarioDto.getFile().transferTo(new File(newFilePath));

                // Actualizamos la información del archivo
                currentFileData.setName(usuarioDto.getFile().getOriginalFilename());
                currentFileData.setType(usuarioDto.getFile().getContentType());
                currentFileData.setFilePath(newFilePath);

                // Guardamos la entidad FileData actualizada
                fileDataRepo.save(currentFileData);
            }
        }


        // Guardar las entidades actualizadas
        usuarioRepo.save(usuario);
        personaRepo.save(persona);

    }

    @Override
    @Transactional
    public void deleteUsuarioDto(Long id) {
        try {
            fileDataRepo.findById(id).ifPresent(fileData -> fileDataRepo.delete(fileData));

            // Elimina Persona y Usuario
            personaRepo.deleteById(id);
            usuarioRepo.deleteById(id);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error al eliminar el usuario con ID: " + id, e);
        }
    }

    @Override
    public void editPassDto(UsuarioDto usuarioDto, Long id) {
        //Usuario
        Usuario usuario = usuarioRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        // Actualizar el password del usuario
        usuario.setPassword(usuarioDto.getPassword_usuario());

        //Guardamos al usuario con su password actualizado
        usuarioRepo.save(usuario);
    }
}
