import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const SEMANAS = [
  { repeticiones: 5, series: 5, porcentaje: 0.75 },
  { repeticiones: 4, series: 4, porcentaje: 0.80 },
  { repeticiones: 3, series: 3, porcentaje: 0.85 },
  { repeticiones: 2, series: 2, porcentaje: 0.90 },
];

const mapEjercicio = (ejercicio) => {
  switch (ejercicio.toLowerCase()) {
    case "sentadilla":
      return "sentadilla";
    case "peso-muerto":
      return "pesoMuerto";
    case "banca":
      return "banca";
    default:
      return null;
  }
};

const Entrenamiento = () => {
  const { ejercicio } = useParams();
  const navigate = useNavigate();

  const rms = JSON.parse(localStorage.getItem("rms"));
  if (!rms || !rms[mapEjercicio(ejercicio)]) {
    return (
      <div className="entrenamiento-container">
        <p className="no-data">No hay datos para este entrenamiento</p>
      </div>
    );
  }

  const rm = rms[mapEjercicio(ejercicio)];

  const semanasGuardadas = JSON.parse(localStorage.getItem("semanaActual")) || {
    sentadilla: 0,
    pesoMuerto: 0,
    banca: 0,
  };

  const ejercicioKey = mapEjercicio(ejercicio);
  const semanaInicial = semanasGuardadas[ejercicioKey] || 0;

  const [semanaActual, setSemanaActual] = useState(semanaInicial);
  const { repeticiones, series: totalSeries, porcentaje } = SEMANAS[semanaActual];
  const pesoTrabajo = Math.round(rm * porcentaje);

  const [series, setSeries] = useState(Array(totalSeries).fill(false));
  const [falloVisible, setFalloVisible] = useState(true);
  const [mostrarModalFallo, setMostrarModalFallo] = useState(false);

  const toggleSerie = (index) => {
    const nuevasSeries = [...series];
    nuevasSeries[index] = !nuevasSeries[index];
    setSeries(nuevasSeries);
  };

  const seriesCompletadas = series.filter(Boolean).length;
  const progreso = (seriesCompletadas / series.length) * 100;

  const handleExito = () => {
    const nuevasSemanas = { ...semanasGuardadas };
    const nuevosRms = { ...rms };

    if (semanaActual < SEMANAS.length - 1) {
      nuevasSemanas[ejercicioKey] = semanaActual + 1;
    } else {
      nuevasSemanas[ejercicioKey] = 0;
      nuevosRms[ejercicioKey] = nuevosRms[ejercicioKey] + 5;
      localStorage.setItem("rms", JSON.stringify(nuevosRms));
    }

    localStorage.setItem("semanaActual", JSON.stringify(nuevasSemanas));
    setFalloVisible(false);
    navigate("/home", { replace: true });
  };

  const handleFallo = () => {
    setMostrarModalFallo(true);
  };

  const handleContinuarDespuesFallo = () => {
    const nuevosRms = { ...rms };
    nuevosRms[ejercicioKey] = Math.max(0, nuevosRms[ejercicioKey] - 5);
    localStorage.setItem("rms", JSON.stringify(nuevosRms));

    const nuevasSemanas = { ...semanasGuardadas };
    localStorage.setItem("semanaActual", JSON.stringify(nuevasSemanas));

    // Cerrar el modal
    setMostrarModalFallo(false);

  };

  return (
    <div className="entrenamiento-container">
      <div className="entrenamiento-header">
        <h1 className="ejercicio-titulo">{ejercicio.toUpperCase()}</h1>
        <div className="peso-objetivo">
          <span className="etiqueta">Peso de trabajo</span>
          <div className="peso-display">
            <span className="peso-numero-entreno">{pesoTrabajo}</span>
            <span className="peso-kg">kg</span>
          </div>
          <span className="formato">{repeticiones}x{totalSeries}</span>
        </div>
      </div>

      <div className="progreso-container">
        <div className="progreso-info">
          <span>Progreso</span>
          <span className="progreso-texto">{seriesCompletadas}/{totalSeries} series</span>
        </div>
        <div className="progreso-barra">
          <div
            className="progreso-fill"
            style={{ width: `${progreso}%` }}
          ></div>
        </div>
      </div>

      <div className="series-grid">
        {series.map((completada, index) => (
          <div
            key={index}
            className={`serie-card ${completada ? 'completada' : ''}`}
            onClick={() => toggleSerie(index)}
          >
            <div className="serie-checkbox">
              {completada && <span className="check-icon">✓</span>}
            </div>
            <div className="serie-info">
              <span className="serie-numero">Serie {index + 1}</span>
              <span className="serie-reps">{repeticiones} reps</span>
            </div>
          </div>
        ))}
      </div>

      <div className="botones-finalizacion">
        <button
          className="exito-button"
          onClick={handleExito}
          disabled={seriesCompletadas !== totalSeries}
        >
          Conseguido
        </button>

        {falloVisible && (
          <button
            className="fallo-button"
            onClick={handleFallo}
          >
            Fallo
          </button>
        )}
      </div>

      {/* Modal de Fallo */}
      {mostrarModalFallo && (
        <div className="modal-overlay-fallo">
          <div className="modal-fallo-content">
            <div className="bocadillo-fallo">
              <p>Vaya, has fallado. Seguimos dándole con menos peso.</p>
            </div>
            <img 
              src="/img/gatoPower.png" 
              alt="Gato SBD"
              className="gato-fallo"
            />
            <button 
              className="continuar-fallo-button"
              onClick={handleContinuarDespuesFallo}
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Entrenamiento;