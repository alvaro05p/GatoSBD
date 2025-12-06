import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate(); // hook de React Router

  const handleClick = () => {
    navigate("/principal"); // ruta de la página principal
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
