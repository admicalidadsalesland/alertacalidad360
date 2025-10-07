import data from "../data/notas.json";

export default function handler(req, res) {
  const { dni } = req.query;
  if (!dni) return res.status(400).json({ error: "Falta el parámetro 'dni'" });

  // 🔥 Convertimos ambos a string para que funcione tanto si el JSON tiene número o texto
  const resultado = data.find(
    (item) => String(item["Dni Agente"]) === String(dni)
  );

  if (!resultado)
    return res.status(404).json({ error: "No se encontró el agente." });

  res.status(200).json(resultado);
}
