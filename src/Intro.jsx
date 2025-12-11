import React from "react";
import { useState, useEffect } from "react";  // ✅ añade useEffect
import { useNavigate } from "react-router-dom";


const Intro = () => {
  const navigate = useNavigate();

  // ⭐ Chequeo automático al cargar Intro
  useEffect(() => {
    const rms = localStorage.getItem("rms");
    if (rms) {
      navigate("/home", { replace: true });
    }
  }, []);

  // ⭐ Función que se ejecuta al pulsar "Empezar"
  const handleClick = () => {
    navigate("/principal");
  };

  return (
    <>
      <h1 className="titulo">Gato SBD</h1>
      <h2 className="subtitulo">
        Mejora en tus ejercicios de fuerza de forma totalmente guiada
      </h2>
      <button className="empezar" onClick={handleClick}>
        Empezar
      </button>
    </>
  );
};

export default Intro;
