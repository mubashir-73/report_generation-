import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PropTypes from "prop-types";
import logo from "../assets/login-logo.png";
import svceLogo from "../assets/svce-logo.jpeg";

function ReportPDF({ report }) {
  const pdfRef = useRef(null);

  const handleDownload = async () => {
    const element = pdfRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Balanced quality for A4 size
        useCORS: true,
        backgroundColor: null,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = pdfWidth - 20; // Keep margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight, "", "FAST");
      pdf.setProperties({ title: "Forese Score Sheet" });

      pdf.save("Forese_Score_Sheet.pdf");
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Error generating PDF. Check console.");
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100">
      {/* PDF Content */}
      <div
        ref={pdfRef}
        className="p-6 max-w-[800px] w-full border bg-white shadow-md"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <img src={logo} alt="FORESE Logo" className="h-12" />
          <img src={svceLogo} alt="SVCE Logo" className="h-12" />
        </div>

        <p className="text-lg">
          <strong>Name:</strong> {report[0]?.username}
        </p>
        <p className="text-lg">
          <strong>Reg. No:</strong> {report[0]?.regNo}
        </p>
        <p className="text-lg mb-6">
          <strong>Department:</strong> {report[0]?.dept}
        </p>

        {/* Aptitude Scores */}
        <h2 className="font-semibold text-center mb-2 text-xl">
          APTITUDE SCORES
        </h2>
        <table className="w-full border-collapse border mb-6 text-center">
          <thead>
            <tr>
              <th className="border p-2">Core</th>
              <th className="border p-2">Verbal</th>
              <th className="border p-2">Aptitude</th>
              <th className="border p-2">Programming</th>
              <th className="border p-2">Comprehension</th>
              <th className="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">{report[1]?.core}</td>
              <td className="border p-2">{report[1]?.verbal}</td>
              <td className="border p-2">{report[1]?.aptitude}</td>
              <td className="border p-2">{report[1]?.programming}</td>
              <td className="border p-2">{report[1]?.comprehension}</td>
              <td className="border p-2">{report[1]?.points}</td>
            </tr>
          </tbody>
        </table>

        {/* Group Discussion Scores */}
        <h2 className="font-semibold text-center mb-2 text-xl">
          GROUP DISCUSSION SCORES
        </h2>
        <table className="w-full border-collapse border text-center">
          <thead>
            <tr>
              <th className="border p-2">Subjective Knowledge</th>
              <th className="border p-2">Communication Skills</th>
              <th className="border p-2">Active Participation</th>
              <th className="border p-2">Body Language</th>
              <th className="border p-2">Listening Skills</th>
              <th className="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">{report[0]?.subject_knowledge}</td>
              <td className="border p-2">{report[0]?.communication_skills}</td>
              <td className="border p-2">{report[0]?.active_participation}</td>
              <td className="border p-2">{report[0]?.body_language}</td>
              <td className="border p-2">{report[0]?.listening_skills}</td>
              <td className="border p-2">{report[0]?.total}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="mt-6 px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition"
      >
        Download PDF
      </button>
    </div>
  );
}

ReportPDF.propTypes = {
  report: PropTypes.array.isRequired,
};

export default ReportPDF;
