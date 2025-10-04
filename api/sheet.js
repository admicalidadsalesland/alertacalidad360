// api/sheet.js
export default async function handler(req, res) {
  const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTIgsZoBQjMmvl3iDq6GzMt0gvfyCxy5F7eCPZ6Q04YT52gKDiLQ5P9JflhA4zOFcrRRUjHqaDc08zA/pub?gid=0&single=true&output=csv";

  try {
    const response = await fetch(sheetUrl);
    if (!response.ok) throw new Error("Error al cargar el CSV");

    const csv = await response.text();
    const lines = csv.trim().split("\n");
    if (lines.length < 2) return res.status(200).json({ data: [] });

    const headers = lines[0].split(",").map(h => h.trim());
    const rows = lines.slice(1).map(line => {
      const cells = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(c => c.trim().replace(/^"(.*)"$/, "$1"));
      let obj = {};
      headers.forEach((h, i) => {
        obj[h] = (cells[i] || "").toLowerCase();
      });
      return obj;
    });

    res.status(200).json({ data: rows });
  } catch (error) {
    console.error("Error en API /api/sheet:", error);
    res.status(500).json({ error: "No se pudo cargar la lista de usuarios" });
  }
}
