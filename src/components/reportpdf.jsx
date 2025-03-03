import { useRef, useEffect, useState } from "react";
import jsPDF from "jspdf";
import PropTypes from "prop-types";
import logo from "../assets/login-logo.png";
import svceLogo from "../assets/svce-logo.jpeg";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

function ReportPDF({ report }) {
  const pdfRef = useRef(null);
  const [logoBase64, setLogoBase64] = useState(null);
  const [svceLogoBase64, setSvceLogoBase64] = useState(null);

  // Convert images to Base64
  useEffect(() => {
    const convertToBase64 = (image, setImageBase64) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => setImageBase64(reader.result);
      reader.onerror = (error) =>
        console.error("Error converting image:", error);
    };

    fetch(logo)
      .then((res) => res.blob())
      .then((blob) => convertToBase64(blob, setLogoBase64));

    fetch(svceLogo)
      .then((res) => res.blob())
      .then((blob) => convertToBase64(blob, setSvceLogoBase64));
  }, []);

  const handleDownload = async () => {
    const element = pdfRef.current;
    if (!element) return;

    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      await pdf.html(element, {
        callback: (doc) => {
          doc.setProperties({ title: "Forese Score Sheet" });
          doc.save("Forese_Score_Sheet.pdf");
        },
        margin: [10, 10, 10, 10],
        x: 10,
        y: 10,
        width: 180,
        windowWidth: document.body.scrollWidth,
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Error generating PDF. Check console.");
    }
  };

  return (
    <div className="flex flex-col gap-10 w-full items-center pb-8 bg-blue-50">
      {/* PDF Content */}
      <div
        ref={pdfRef}
        className="p-6 w-full max-w-10xl rounded-lg bg-white shadow-md"
      >
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-4 sm:mb-6">
          <img src={logo} alt="FORESE Logo" className="h-8 sm:h-10 md:h-12" />
          <img src={svceLogo} alt="SVCE Logo" className="h-8 sm:h-10 md:h-12" />
        </div>

        <div className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
          <p>
            <strong>Name:</strong> {report[0]?.username}
          </p>
          <p>
            <strong>Reg. No:</strong> {report[0]?.regNo}
          </p>
          <p>
            <strong>Department:</strong> {report[0]?.dept}
          </p>
        </div>

        {/* Aptitude Scores */}
        <div className="w-full">
          <h2 className="font-bold text-center mb-2 text-xl">
            APTITUDE SCORES
          </h2>

          <Table className="w-full table-fixed border-collapse border text-center text-xs sm:text-sm md:text-base">
            <Thead>
              <Tr className="">
                {[
                  "Core",
                  "Verbal",
                  "Aptitude",
                  "Programming",
                  "Comprehension",
                  "Total",
                ].map((heading) => (
                  <Th key={heading} className="border p-1 sm:p-2 break-words">
                    {heading}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                {[
                  report[1]?.core || "absent",
                  report[1]?.verbal || "absent",
                  report[1]?.aptitude || "absent",
                  report[1]?.programming || "absent",
                  report[1]?.comprehension || "absent",
                  report[0]?.total ? `${report[0]?.total}/50` : "absent",
                ].map((data, index) => (
                  <Td key={index} className="border p-1 sm:p-2">
                    {data}
                  </Td>
                ))}
              </Tr>{" "}
            </Tbody>
          </Table>
        </div>

        {/* Group Discussion Scores */}
        <div className="w-full mt-4">
          <h2 className="font-bold text-center mb-2 text-xl">
            GROUP DISCUSSION SCORES
          </h2>
          <Table className="w-full table-fixed border-collapse border text-center text-xs sm:text-sm md:text-base">
            <Thead className=" tracking-wide">
              <Tr className=" ">
                {[
                  "Subjective Knowledge",
                  "Communication Skills",
                  "Active Participation",
                  "Body Language",
                  "Listening Skills",
                  "Total",
                ].map((heading) => (
                  <Th
                    key={heading}
                    className=" border p-1   sm:p-2 break-words "
                  >
                    {heading}
                  </Th>
                ))}{" "}
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                {[
                  report[0]?.subject_knowledge || "absent",
                  report[0]?.communication_skills || "absent",
                  report[0]?.active_participation || "absent",
                  report[0]?.body_language || "absent",
                  report[0]?.listening_skills || "absent",
                  report[0]?.total ? `${report[0]?.total}/50` : "absent",
                ].map((data, index) => (
                  <Td key={index} className="border p-1 sm:p-2">
                    {data}
                  </Td>
                ))}
              </Tr>
            </Tbody>
          </Table>
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
