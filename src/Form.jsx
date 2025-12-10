import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [sentadilla, setSentadilla] = useState("");
  const [pesoMuerto, setPesoMuerto] = useState("");
  const [banca, setBanca] = useState("");

  const navigate = useNavigate(); // ✅ FALTABA ESTO

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/home", {
      state: {
        sentadilla,
        pesoMuerto,
        banca,
      },
    });
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

        <button type="submit" className="submit-button">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default Form;
