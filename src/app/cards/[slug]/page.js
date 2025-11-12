"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// Updated ProjectDetail Component - Minimalistic Design
function ProjectDetail({ project, onClose }) {
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);

  useEffect(() => {
    if (project.deadline) {
      setIsDeadlinePassed(new Date(project.deadline) < new Date());
    }
  }, [project.deadline]);

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount) return "$0";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                  {project.projectCode}
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                  {project.year}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${
                    project.status === "Ongoing"
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : project.status === "Submitted"
                      ? "bg-purple-50 text-purple-700 border-purple-200"
                      : project.status === "Under Review"
                      ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                      : project.status === "Awarded"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-gray-50 text-gray-700 border-gray-200"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 leading-tight">
                {project.name}
              </h2>
              <p className="text-gray-600 mt-2">
                {project.sector} • {project.country}
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Budget</div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatCurrency(project.budget)}
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Duration</div>
                <div className="text-lg font-semibold text-gray-900">
                  {project.duration}
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Process</div>
                <div className="text-lg font-semibold text-gray-900">
                  {project.process}
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Status</div>
                <div className="text-lg font-semibold text-gray-900">
                  {project.status}
                </div>
              </div>
            </div>

            {/* Main Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Project Details */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    Project Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Project ID</span>
                      <span className="font-medium text-gray-900">
                        {project.id}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Sector</span>
                      <span className="font-medium text-gray-900">
                        {project.sector}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Selection Method</span>
                      <span className="font-medium text-gray-900">
                        {project.selectionMethod}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Country</span>
                      <span className="font-medium text-gray-900">
                        {project.country}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    Timeline
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Confirmation</span>
                      <span className="font-medium text-gray-900">
                        {project.confirmation}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">
                        Clarification Deadline
                      </span>
                      <span className="font-medium text-gray-900">
                        {project.clarificationDeadline}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Team & Contacts */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    Team & Contacts
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Project Lead</span>
                      <span className="font-medium text-gray-900">
                        {project.lead}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Lead Status</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          project.leadStatus === "Active"
                            ? "bg-green-50 text-green-700"
                            : project.leadStatus === "Pending"
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-gray-50 text-gray-700"
                        }`}
                      >
                        {project.leadStatus}
                      </span>
                    </div>
              
                  </div>
                </div>

                {/* Stakeholders */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    Stakeholders
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Donor</span>
                      <span className="font-medium text-gray-900">
                        {project.donor}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Client</span>
                      <span className="font-medium text-gray-900">
                        {project.client}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Partner</span>
                      <span className="font-medium text-gray-900">
                        {project.partner}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Evaluation Scores */}
                {(project.technicalScore !== "N/A" ||
                  project.financialScore !== "N/A") && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                      Evaluation
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {project.technicalScore !== "N/A" && (
                        <div className="text-center">
                          <div className="text-sm text-gray-600">
                            Technical Score
                          </div>
                          <div className="text-lg font-semibold text-gray-900">
                            {project.technicalScore}
                          </div>
                        </div>
                      )}
                      {project.financialScore !== "N/A" && (
                        <div className="text-center">
                          <div className="text-sm text-gray-600">
                            Financial Score
                          </div>
                          <div className="text-lg font-semibold text-gray-900">
                            {project.financialScore}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RFP Status */}
            {(project.submissionPrepRFP !== "N/A" || 
              project.cvStatRFP !== "N/A" || 
              project.financialRFP !== "N/A") && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  RFP Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {project.submissionPrepRFP !== "N/A" && (
                    <div className="text-center border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-2">Submission Prep</div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${
                        project.submissionPrepRFP === "Completed" 
                          ? "bg-green-50 text-green-700 border border-green-200" 
                          : project.submissionPrepRFP === "In Progress"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : project.submissionPrepRFP === "Pending"
                          ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                          : "bg-gray-50 text-gray-700 border border-gray-200"
                      }`}>
                        {project.submissionPrepRFP}
                      </div>
                    </div>
                  )}
                  {project.cvStatRFP !== "N/A" && (
                    <div className="text-center border border-gray-200 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-2">CV Status</div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${
                        project.cvStatRFP === "Approved" 
                          ? "bg-green-50 text-green-700 border border-green-200" 
                          : project.cvStatRFP === "Submitted"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : project.cvStatRFP === "Pending"
                          ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                          : "bg-gray-50 text-gray-700 border border-gray-200"
                      }`}>
                        {project.cvStatRFP}
                      </div>
                    </div>
                  )}
                {project.financialRFP !== "N/A" && (
  <div className="text-center border border-gray-200 rounded-lg p-4">
    <div className="text-sm text-gray-600 mb-2">Financial</div>
    <div
      className={`px-3 py-1 rounded-full text-sm font-medium inline-block
        ${
          project.financialRFP === "Approved"
            ? "bg-green-50 text-green-700 border border-green-200"
          : project.financialRFP === "Cleared"
            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
          : project.financialRFP === "Under Review"
            ? "bg-blue-50 text-blue-700 border border-blue-200"
          : project.financialRFP === "Pending"
            ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
          : "bg-gray-50 text-gray-700 border border-gray-200"
        }`}
    >
      {project.financialRFP}
    </div>
  </div>
)}

                </div>
              </div>
            )}

            {/* Additional Information */}
            {(project.challenges || project.comments) && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Additional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.challenges && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Challenges
                      </h4>
                      <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
                        {project.challenges}
                      </p>
                    </div>
                  )}
                  {project.comments && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Comments
                      </h4>
                      <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
                        {project.comments}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Project ID: {project.id} • Last updated:{" "}
              {new Date().toLocaleDateString()}
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// Updated ProjectCard Component to show more information
function ProjectCard({ project, onClick }) {
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);

  useEffect(() => {
    if (project.deadline) {
      setIsDeadlinePassed(new Date(project.clarificationDeadline) < new Date());
    }
  }, [project.clarificationDeadline]);

  return (
    <div
      onClick={() => onClick(project)}
      className="border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-all duration-200 bg-white cursor-pointer transform hover:-translate-y-1"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-bold text-gray-800 text-lg leading-tight">
            {project.name}
          </h4>
          <p className="text-sm text-gray-600 mt-1">{project.projectCode}</p>
          <p className="text-xs text-gray-500 mt-1">Year: {project.year}</p>
        </div>
        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-800">
          {project.id}
        </span>
      </div>

      {/* Basic Info */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Country</span>
          <span className="font-medium text-gray-800 text-sm">
            {project.country}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Sector</span>
          <span className="font-medium text-gray-800 text-sm">
            {project.sector}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Donor</span>
          <span className="font-medium text-gray-800 text-sm">
            {project.donor}
          </span>
        </div>
      </div>

      {/* Status & Budget */}
      <div className="border-t border-gray-100 pt-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Clarification Deadline</span>
          <span
            className={`text-sm font-medium ${
              isDeadlinePassed ? "text-red-600" : "text-gray-800"
            }`}
          >
            {project.clarificationDeadline}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Budget</span>
          <span className="text-sm font-medium text-green-600">
            ${project.budget?.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Lead Status</span>
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              project.leadStatus === "Active"
                ? "bg-green-100 text-green-800"
                : project.leadStatus === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {project.leadStatus}
          </span>
        </div>
      </div>

      {/* Evaluation Scores */}
      {(project.technicalScore !== "N/A" ||
        project.financialScore !== "N/A") && (
        <div className="border-t border-gray-100 pt-3 mt-3">
          <div className="flex justify-between text-xs">
            {project.technicalScore !== "N/A" && (
              <span className="text-blue-600">
                Tech: {project.technicalScore}
              </span>
            )}
            {project.financialScore !== "N/A" && (
              <span className="text-green-600">
                Finance: {project.financialScore}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Challenges & Comments Preview */}
      {(project.challenges || project.comments) && (
        <div className="border-t border-gray-100 pt-3 mt-3">
          {project.challenges && (
            <div className="text-xs text-red-600 mb-1 truncate">
              <strong>Challenge:</strong> {project.challenges}
            </div>
          )}
          {project.comments && (
            <div className="text-xs text-blue-600 truncate">
              <strong>Comment:</strong> {project.comments}
            </div>
          )}
          <div className="text-xs text-gray-500 mt-2 text-center">
            Click to view full details
          </div>
        </div>
      )}
    </div>
  );
}

export default function CardComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const params = useParams();
  const router = useRouter();
  const sheetName = decodeURIComponent(params.slug);

  const getSheetType = () => {
    const name = sheetName.toLowerCase();
    if (name.includes("eoi") && name.includes("evaluation"))
      return "eoi-evaluation";
    if (name.includes("eoi") && name.includes("preparation"))
      return "eoi-preparation";
    if (name.includes("proposal") && name.includes("evaluation"))
      return "proposal-evaluation";
    if (name.includes("proposal") && name.includes("preparation"))
      return "proposal-preparation";
    return "general";
  };

  const sheetType = getSheetType();

  useEffect(() => {
    const fetchGoogleSheetData = async () => {
      try {
        setLoading(true);
        setError(null);

        const sheetId = "1KmB55ZXF3o0bjomXFOAtksAOpUTUwZTuLbZWLuLYSYU";

        console.log(`📥 Fetching data from: ${sheetName} (Type: ${sheetType})`);

        // Try CSV format first
        try {
          const csvResponse = await fetch(
            `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(
              sheetName
            )}`
          );

          if (!csvResponse.ok) {
            throw new Error(`CSV fetch failed: ${csvResponse.status}`);
          }

          const csvText = await csvResponse.text();

          if (!csvText || csvText.trim().length === 0) {
            throw new Error("Empty CSV response");
          }

          console.log("CSV data received, converting to JSON...");

          // Convert CSV to JSON
          const jsonData = csvToJson(csvText);
          console.log(`✅ Loaded ${jsonData.length} rows from "${sheetName}"`);
          console.log("Sample data:", jsonData.slice(0, 2));

          setData(jsonData);
          return;
        } catch (csvError) {
          console.log("CSV method failed, trying Excel export...", csvError);

          // Fallback to Excel export
          const excelResponse = await fetch(
            `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx&sheet=${encodeURIComponent(
              sheetName
            )}`
          );

          if (!excelResponse.ok) {
            throw new Error(`Excel export failed: ${excelResponse.status}`);
          }

          const arrayBuffer = await excelResponse.arrayBuffer();
          const XLSX = await import("xlsx");
          const workbook = XLSX.read(arrayBuffer, { type: "array" });

          if (!workbook.SheetNames.includes(sheetName)) {
            throw new Error(
              `Sheet "${sheetName}" not found. Available sheets: ${workbook.SheetNames.join(
                ", "
              )}`
            );
          }

          const selectedSheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(selectedSheet);

          console.log(`✅ Loaded ${jsonData.length} rows from "${sheetName}"`);
          setData(jsonData);
        }
      } catch (err) {
        console.error("❌ Error fetching Google Sheet data:", err);
        setError(`Failed to load data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    // CSV to JSON conversion helper
    const csvToJson = (csvText) => {
      const lines = csvText.split("\n").filter((line) => line.trim() !== "");
      if (lines.length === 0) return [];

      const headers = lines[0]
        .split(",")
        .map((header) => header.trim().replace(/"/g, ""));

      const jsonData = [];
      for (let i = 1; i < lines.length; i++) {
        const values = parseCsvLine(lines[i]);
        const obj = {};

        headers.forEach((header, index) => {
          obj[header] = values[index] || "";
        });

        if (!obj.id && !obj.sl && !obj.ID) {
          obj.id = i;
        }

        jsonData.push(obj);
      }

      return jsonData;
    };

    const parseCsvLine = (line) => {
      const result = [];
      let current = "";
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
          result.push(current.trim().replace(/^"|"$/g, ""));
          current = "";
        } else {
          current += char;
        }
      }

      result.push(current.trim().replace(/^"|"$/g, ""));
      return result;
    };

    if (sheetName) {
      fetchGoogleSheetData();
    }
  }, [sheetName, sheetType]);

  const handleBack = () => {
    router.back();
  };

  const handleCardClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseDetail = () => {
    setSelectedProject(null);
  };

  const getProjects = () => {
    if (!data || data.length === 0) return [];

    return data.map((item, index) => {
      // Map data EXACTLY based on your provided keys
      const baseProject = {
        // Basic Information
        id: item.sl || index + 1,
        year: item.Year || "Not specified",
        country: item.Country || "Unknown",
        donor: item["Donor Name"] || "Unknown donor",
        client: item["Client Name"] || "Unknown client",
        name: item["Project Name"] || "Unnamed Project",
        sector: item.Sector || "General",
        lead: item.Lead || "Unassigned",
        leadStatus: item["Lead Status"] || "Unknown",
        partner: item.Partner || "No partner",
        confirmation: item["Confirmation Deadline"] || "No confirmation",
        process: item.Process || "Not specified",
        status: item.Status || "Unknown",
        projectCode: item["Project Code"] || "N/A",
        budget: parseFloat(item["Assigned To Budget"] || 0),
        duration: item.Duration || "Not specified",
        clarificationDeadline:
          item["Clarification Deadline"] || "Not specified",
        selectionMethod:
          item["Selection method Submission Prep (RFP)"] || "Not specified",

        // RFP Fields
        submissionPrepRFP: item["Submission Prep (RFP)"] || "N/A",
        cvStatRFP: item["CV Stat. (RFP)"] || "N/A",
        financialRFP: item["Financial (RFP)"] || "N/A",

        _raw: item, // Keep raw data for debugging
      };

      // Add sheet-type specific fields
      switch (sheetType) {
        case "eoi-preparation":
          return {
            ...baseProject,
            sheetType: "eoi-preparation",
          };

        case "eoi-evaluation":
          return {
            ...baseProject,
            sheetType: "eoi-evaluation",
            partnerStatEoI: item["Partner Stat (EoI)"] || "N/A",
            bioDataStatEoI: item["Bio-data Stat (EoI)"] || "N/A",
            submissionPrepEoI: item["Submissiom Prep (EoI)"] || "N/A",
            challengesEoI: item["Challanges (EoI)"] || "",
            commentsEoI: item["Comments (EoI)"] || "",
            eoiEvaluationStatus:
              item["EoI Evaluation Status"] || "Not evaluated",
          };

        case "proposal-preparation":
          return {
            ...baseProject,
            sheetType: "proposal-preparation",
            technicalScore: item["Technical Score"] || "N/A",
            financialScore: item["Financial Score"] || "N/A",
            position: item.Position || "N/A",
            comments: item.Comments || "",
          };

        case "proposal-evaluation":
          return {
            ...baseProject,
            sheetType: "proposal-evaluation",
            complianceRFP: item["Compliance (RFP)"] || "N/A",
            challenges: item.Challanges || "",
            commentsRFP: item["Comments (RFP)"] || "",
            rfpEvaluation: item["RFP Evaluation"] || "Not evaluated",
          };

        default:
          return {
            ...baseProject,
            sheetType: "general",
          };
      }
    });
  };

  const projects = getProjects();

  // Debug: Log the first project to see the actual keys
  useEffect(() => {
    if (projects.length > 0) {
      console.log("📊 First project data with exact keys:", projects[0]);
      console.log("🔑 All available keys:", Object.keys(projects[0]));
    }
  }, [projects]);

  // Simplified stats - always show the same four metrics
 const getStats = () => {
  const total = projects.length;
  
  // Count projects by status
  const ongoing = projects.filter(p => 
    p.status?.toLowerCase() === "ongoing"
  ).length;
  
  const submitted = projects.filter(p => 
    p.status?.toLowerCase() === "submitted"
  ).length;
  
  const underReview = projects.filter(p => 
    p.status?.toLowerCase() === "under review"
  ).length;
  
  const awarded = projects.filter(p => 
    p.status?.toLowerCase() === "awarded"
  ).length;
  
  const totalBudget = projects.reduce((sum, p) => sum + (p.budget || 0), 0);

  return {
    total,
    ongoing,
    submitted,
    underReview,
    awarded,
    totalBudget,
  };
};

const stats = getStats();

// Updated stat labels to match the new status types
const statLabels = [
  { label: 'Total Projects', value: stats.total },
  { label: 'Ongoing', value: stats.ongoing },
  { label: 'Submitted', value: stats.submitted },
  { label: 'Under Review', value: stats.underReview },
  { label: 'Awarded', value: stats.awarded },
  { label: 'Total Budget', value: `$${(stats.totalBudget / 1000000).toFixed(1)}M` }
];

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={handleBack}
            className="mb-6 px-4 py-2 flex items-center text-blue-500 hover:text-blue-700 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Dashboard
          </button>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <h3 className="text-lg font-medium text-red-800 mb-2">
              Error Loading Data
            </h3>
            <p className="text-red-600 mb-4">{error}</p>
            <div className="space-y-3 text-sm text-red-700 text-left bg-red-100 p-4 rounded-lg">
              <p>
                <strong>Troubleshooting steps:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Make sure the Google Sheet is publicly accessible</li>
                <li>Check if the sheet name exists in the document</li>
                <li>Verify your internet connection</li>
                <li>Try refreshing the page</li>
              </ul>
            </div>
            <div className="mt-6 space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={handleBack}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={handleBack}
            className="mb-6 px-4 py-2 flex items-center text-blue-500 hover:text-blue-700 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Dashboard
          </button>
          <div className="flex flex-col justify-center items-center h-64 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <div className="text-lg text-gray-600">
              Loading {sheetName} data from Google Sheets...
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-6 px-4 py-2 flex items-center text-blue-500 hover:text-blue-700 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Dashboard
        </button>

        {/* Card Details */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold capitalize text-gray-800">
                {sheetName?.replace(/([A-Z])/g, " $1")}
              </h1>
              <p className="text-gray-600 mt-1">Project Data Overview</p>
              <p className="text-sm text-green-600 mt-1">
                ✅ Connected to Google Sheets
              </p>
            </div>
          </div>

          {/* Statistics - Always show the same four stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {statLabels.map((stat, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  index === 0
                    ? "bg-blue-50 border-blue-200"
                    : index === 1
                    ? "bg-green-50 border-green-200"
                    : index === 2
                    ? "bg-yellow-50 border-yellow-200"
                    : "bg-purple-50 border-purple-200"
                }`}
              >
                <div
                  className={`text-2xl font-bold ${
                    index === 0
                      ? "text-blue-800"
                      : index === 1
                      ? "text-green-800"
                      : index === 2
                      ? "text-yellow-800"
                      : "text-purple-800"
                  }`}
                >
                  {stat.value}
                </div>
                <div
                  className={`text-sm ${
                    index === 0
                      ? "text-blue-600"
                      : index === 1
                      ? "text-green-600"
                      : index === 2
                      ? "text-yellow-600"
                      : "text-purple-600"
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Projects List */}
          {projects.length > 0 ? (
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id || index}
                    project={project}
                    onClick={handleCardClick}
                  />
                ))}
              </div>
              <div className="mt-6 text-center text-sm text-gray-500">
                Showing {projects.length} projects • Click on any card to view
                details
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-lg mb-2">No projects found</p>
              <p className="text-sm">
                No project data available in {sheetName}
              </p>
              <button
                onClick={handleBack}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetail project={selectedProject} onClose={handleCloseDetail} />
      )}
      <Footer />
    </div>
  );
}
