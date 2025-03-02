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
        scale: 2,
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
      const imgWidth = pdfWidth - 20;
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
    <div className="flex flex-col w-full items-center pb-8 bg-blue-50">
      {/* PDF Content */}
      <div ref={pdfRef} className="p-6 w-full max-w-10xl rounded-lg bg-white shadow-md">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-4 sm:mb-6">
          <img src={logo} alt="FORESE Logo" className="h-8 sm:h-10 md:h-12" />
          <h2 className="font-bold text-lg sm:text-xl md:text-2xl text-center">Mock Placements</h2>
          <img src={svceLogo} alt="SVCE Logo" className="h-8 sm:h-10 md:h-12" />
        </div>


        <div className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
          <p><strong>Name:</strong> {report[0]?.username}</p>
          <p><strong>Reg. No:</strong> {report[0]?.regNo}</p>
          <p><strong>Department:</strong> {report[0]?.dept}</p>
        </div>


        {/* Aptitude Scores */}
        <div className="w-full">
          <h2 className="font-bold text-center mb-2 text-xl">APTITUDE SCORES</h2>
          <table className="w-full table-fixed border-collapse border text-center text-xs sm:text-sm md:text-base">
            <thead>
              <tr>
                {["Core", "Verbal", "Aptitude", "Programming", "Comprehension", "Total"].map((heading) => (
                  <th key={heading} className="border p-1 sm:p-2 break-words">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {[
                  report[1]?.core,
                  report[1]?.verbal,
                  report[1]?.aptitude,
                  report[1]?.programming,
                  report[1]?.comprehension,
                  `${report[1]?.points}/50`
                ].map((data, index) => (
                  <td key={index} className="border p-1 sm:p-2">{data}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Group Discussion Scores */}
        <div className="w-full mt-4">
          <h2 className="font-bold text-center mb-2 text-xl">GROUP DISCUSSION SCORES</h2>
          <table className="w-full table-fixed border-collapse border text-center text-xs sm:text-sm md:text-base">
            <thead>
              <tr>
                {["Subjective Knowledge", "Communication Skills", "Active Participation", "Body Language", "Listening Skills", "Total"].map((heading) => (
                  <th key={heading} className="border p-1 sm:p-2 break-words">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {[
                  report[0]?.subject_knowledge,
                  report[0]?.communication_skills,
                  report[0]?.active_participation,
                  report[0]?.body_language,
                  report[0]?.listening_skills,
                  `${report[0]?.total}/50`
                ].map((data, index) => (
                  <td key={index} className="border p-1 sm:p-2">{data}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
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
