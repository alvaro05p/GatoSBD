import { useState } from "react";

const Principal = () => {
  const [sentadilla, setSentadilla] = useState("");
  const [pesoMuerto, setPesoMuerto] = useState("");
  const [banca, setBanca] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="principal-container">
      <h1>Apunta tus RM</h1>
      <form onSubmit={handleSubmit} className="principal-form">
        <div className="form-group">
          <label>
            Sentadilla (kg):
            <input
              type="number"
              value={sentadilla}
              onChange={(e) => setSentadilla(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Peso muerto (kg):
            <input
              type="number"
              value={pesoMuerto}
              onChange={(e) => setPesoMuerto(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Press de banca (kg):
            <input
              type="number"
              value={banca}
              onChange={(e) => setBanca(e.target.value)}
              required
            />
          </label>
        </div>

        <button type="submit" className="submit-button">Guardar</button>
      </form>

      {submitted && (
        <div className="resultados-container">
          <h2>Tus máximos:</h2>
          <div className="resultado-item">
            <span>Sentadilla:</span>
            <span className="resultado-valor">{sentadilla} kg</span>
          </div>
          <div className="resultado-item">
            <span>Peso muerto:</span>
            <span className="resultado-valor">{pesoMuerto} kg</span>
          </div>
          <div className="resultado-item">
            <span>Press de banca:</span>
            <span className="resultado-valor">{banca} kg</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Principal;