package com.example.login.service;

import com.example.login.model.Persona;

import java.util.List;

public interface IPersonaService {
    //crear persona
    public void createPersona(Persona persona);

    //leer personas
    public List<Persona> readPersonas();

    //encontrar persona
    public Persona findPersona(Long id);

    //editar persona
    public void editPersona(Persona persona);

    //eliminar persona
    public void deletePersona(Long id);
}
