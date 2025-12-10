import { useLocation } from "react-router-dom";

const Home = () => {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="home-container">
        <p className="no-data">No hay datos disponibles</p>
      </div>
    );
  }

  const { sentadilla, pesoMuerto, banca } = state;

  return (
    <div className="home-container">
      <h1 className="home-titulo">Tus Máximos</h1>
      
      <div className="maximos-grid">
        <div className="maximo-card">
          <div className="ejercicio-nombre">Sentadilla</div>
          <div className="peso-numero">{sentadilla}</div>
          <div className="peso-unidad">kg</div>
        </div>

        <div className="maximo-card">
          <div className="ejercicio-nombre">Peso Muerto</div>
          <div className="peso-numero">{pesoMuerto}</div>
          <div className="peso-unidad">kg</div>
        </div>

        <div className="maximo-card">
          <div className="ejercicio-nombre">Press Banca</div>
          <div className="peso-numero">{banca}</div>
          <div className="peso-unidad">kg</div>
        </div>
      </div>
    </div>
  );
};

export default Home;