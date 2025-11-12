"use client";

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export default function ExcelMultiSheet() {
  const [sheets, setSheets] = useState([]); // 🧾 sheet names
  const [selectedSheet, setSelectedSheet] = useState("");
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    async function loadExcel() {
      try {
        const response = await fetch("/Sayed2025.xlsx"); // 👈 from public/
        const arrayBuffer = await response.arrayBuffer();

        // Parse workbook
        const workbook = XLSX.read(arrayBuffer, { type: "array" });

        // Get all sheet names
        setSheets(workbook.SheetNames);

        // Optional: load first sheet by default
        const firstSheet = workbook.SheetNames[0];
        setSelectedSheet(firstSheet);

        // Convert first sheet to JSON
        const worksheet = workbook.Sheets[firstSheet];
        const data = XLSX.utils.sheet_to_json(worksheet);
        setJsonData(data);
      } catch (error) {
        console.error("Error reading Excel file:", error);
      }
    }

    loadExcel();
  }, []);

  const handleSheetChange = async (sheetName) => {
    try {
      const response = await fetch("/Sayed2025.xlsx");
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setSelectedSheet(sheetName);
      setJsonData(data);
    } catch (error) {
      console.error("Error reading selected sheet:", error);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">📊 Excel → JSON (Multi-sheet)</h1>

      {/* Dropdown for sheet selection */}
      {sheets.length > 0 && (
        <select
          value={selectedSheet}
          onChange={(e) => handleSheetChange(e.target.value)}
          className="border p-2 rounded"
        >
          {sheets.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      )}

      {/* JSON display */}
      <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-[400px] text-sm">
        {JSON.stringify(jsonData, null, 2)}
      </pre>
    </div>
  );
}
