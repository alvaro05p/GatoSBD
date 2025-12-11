import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

useEffect(() => {
  const rms = localStorage.getItem("rms");
  if (rms) {
    navigate("/home", { replace: true });
  }
}, []);

const Form = () => {
  const [sentadilla, setSentadilla] = useState("");
  const [pesoMuerto, setPesoMuerto] = useState("");
  const [banca, setBanca] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ GUARDAR LOS RM
    localStorage.setItem(
      "rms",
      JSON.stringify({
        sentadilla: Number(sentadilla),
        pesoMuerto: Number(pesoMuerto),
        banca: Number(banca),
      })
    );

    // ✅ IR A HOME (SIN STATE)
    navigate("/home", { replace: true });
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
