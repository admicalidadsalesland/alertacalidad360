// /api/buscar.js
import data from "@/data/notas.json";

export default function handler(req, res) {
  const { dni } = req.query;

  if (!dni) {
    return res.status(400).json({ error: "Falta el parámetro 'dni'" });
  }

  const resultado = data.find((item) => item["Dni Agente"] === dni);

  if (!resultado) {
    return res.status(404).json({ error: "No se encontró el agente." });
  }

  return res.status(200).json(resultado);
}
