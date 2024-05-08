package com.example.login.controller;

import com.example.login.model.Persona;
import com.example.login.service.IPersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"*"})
public class PersonaController {

    @Autowired
    IPersonaService persoServ;

    @PostMapping("/personas/crear")
    public String crearPersona(@RequestBody Persona persona){
        persoServ.createPersona(persona);
        return "La persona se creo correctamente";
    }

    @GetMapping("/personas/traer")
    public List<Persona> leerPersona(){
        List<Persona> listaPersonas = persoServ.readPersonas();
        return listaPersonas;
    }

    @PutMapping("/personas/editar")
    public Persona editarPersona(@RequestBody Persona persona){
        persoServ.editPersona(persona);

        return persoServ.findPersona(persona.getId_persona());
    }

    @DeleteMapping("/personas/borrar/{id}")
    public String borrarPersona(@PathVariable Long id){
        persoServ.deletePersona(id);

        return "La persona se elimino correctamente";
    }
}
