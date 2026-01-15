package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
public class HolaController {

    private final List<Saludo> saludos = new ArrayList<>();

    // GET simple
    @GetMapping("/saludos")
    public List<Saludo> obtenerTodos() {
        return saludos;
    }

    // POST para crear saludo
    @PostMapping("/saludo3")
    public Saludo crearSaludo(@RequestBody SaludoRequest request) {
        Saludo s = new Saludo(request.getNombre(), LocalDateTime.now());
        saludos.add(s);
        return s;
    }

    // Clases internas rápidas para que funcione ya
    static class SaludoRequest {
        private String nombre;
        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = nombre; }
    }

    static class Saludo {
        private String nombre;
        private LocalDateTime fecha;
        public Saludo(String nombre, LocalDateTime fecha) { this.nombre = nombre; this.fecha = fecha; }
        public String getNombre() { return nombre; }
        public LocalDateTime getFecha() { return fecha; }
    }
}
