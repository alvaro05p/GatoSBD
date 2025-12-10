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

  // Obtener la semana actual desde localStorage o por defecto 0
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

  const toggleSerie = (index) => {
    const nuevasSeries = [...series];
    nuevasSeries[index] = !nuevasSeries[index];
    setSeries(nuevasSeries);
  };

  const finalizarEntrenamiento = () => {
    const nuevasSemanas = { ...semanasGuardadas };

    if (semanaActual < SEMANAS.length - 1) {
      // Avanzar a la siguiente semana
      nuevasSemanas[ejercicioKey] = semanaActual + 1;
    } else {
      // Si estaba en la última semana (2x2)
      nuevasSemanas[ejercicioKey] = 0; // volver a 5x5
      // Aumentar RM en 5 kg
      const nuevosRms = { ...rms };
      nuevosRms[ejercicioKey] = nuevosRms[ejercicioKey] + 5;
      localStorage.setItem("rms", JSON.stringify(nuevosRms));
    }

    // Guardar la semana actualizada
    localStorage.setItem("semanaActual", JSON.stringify(nuevasSemanas));

    // Ir a Home
    navigate("/home", { replace: true });
  };

  const seriesCompletadas = series.filter(Boolean).length;
  const progreso = (seriesCompletadas / series.length) * 100;

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

      <button
        className={`finalizar-button ${series.every(Boolean) ? 'activo' : ''}`}
        onClick={finalizarEntrenamiento}
        disabled={!series.every(Boolean)}
      >
        Finalizar Entreno
      </button>
    </div>
  );
};

export default Entrenamiento;
