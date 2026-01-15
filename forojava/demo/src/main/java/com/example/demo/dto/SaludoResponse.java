package com.example.demo.dto;

public class SaludoResponse {
    private String mensaje;

    public SaludoResponse(String mensaje) {
        this.mensaje = mensaje;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
}
