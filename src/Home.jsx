import { Link } from "react-router-dom";

const SEMANAS = [
  { nombre: "5x5" },
  { nombre: "4x4" },
  { nombre: "3x3" },
  { nombre: "2x2" },
];

const Home = () => {
  const data = JSON.parse(localStorage.getItem("rms"));
  const semanas = JSON.parse(localStorage.getItem("semanaActual")) || {
    sentadilla: 0,
    pesoMuerto: 0,
    banca: 0,
  };

  if (!data) {
    return (
      <div className="home-container">
        <p className="no-data">No hay datos disponibles</p>
      </div>
    );
  }

  const { sentadilla, pesoMuerto, banca } = data;

  return (
    <div className="home-container">
      <h1 className="home-titulo">Tus Máximos</h1>

      <div className="maximos-grid">
        <Link to="/entrenamiento/sentadilla" className="maximo-card">
          <div className="ejercicio-nombre">Sentadilla</div>
          <div className="peso-numero">{sentadilla}</div>
          <div className="peso-unidad">kg</div>
          <div className="semana-texto">{SEMANAS[semanas.sentadilla].nombre}</div>
        </Link>

        <Link to="/entrenamiento/peso-muerto" className="maximo-card">
          <div className="ejercicio-nombre">Peso Muerto</div>
          <div></div><div className="peso-numero">{pesoMuerto}</div>
          <div className="peso-unidad">kg</div>
          <div className="semana-texto">{SEMANAS[semanas.pesoMuerto].nombre}</div>
        </Link>

        <Link to="/entrenamiento/banca" className="maximo-card">
          <div className="ejercicio-nombre">Press Banca</div>
          <div className="peso-numero">{banca}</div>
          <div className="peso-unidad">kg</div>
          <div className="semana-texto">{SEMANAS[semanas.banca].nombre}</div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
