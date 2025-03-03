import { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import PropTypes from "prop-types";
import logo from "../assets/login-logo.png";
import svceLogo from "../assets/svce-logo.jpeg";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
function ScoresPage({ report }) {
  const pdfRef = useRef(null);
  const [logoBase64, setLogoBase64] = useState(null);
  const [svceLogoBase64, setSvceLogoBase64] = useState(null);
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
  // Sample data for a single user
  // eslint-disable-next-line no-unused-vars
  const [aptitudeScores, setAptitudeScores] = useState({
    name: report[0].username,
    registerNo: report[0].regNo,
    department: report[0].dept,
    aptitude: report[1].aptitude,
    core: report[1].core,
    verbal: report[1].verbal,
    programming: report[1].programming,
    comprehension: report[1].comprehension,
    total: report[1].points,
  });

  // eslint-disable-next-line no-unused-vars
  const [gdScores, setGdScores] = useState({
    name: report[0].username,
    subjectKnowledge: report[0].subject_knowledge,
    communicationSkills: report[0].communication_skills,
    bodyLanguage: report[0].body_language,
    listeningSkills: report[0].listening_skills,
    activeParticipation: report[0].active_participation,
    total: report[0].total,
  });

  // State for the images
  const [svceLogoData, setSvceLogoData] = useState("");
  const [foreseLogoData, setForeseLogoData] = useState("");

  // Refs for image aspect ratios
  const svceDimensionsRef = useRef({ width: 0, height: 0 });
  const foreseDimensionsRef = useRef({ width: 0, height: 0 });

  // Function to load images and calculate aspect ratios
  useEffect(() => {
    // Load the SVCE logo
    const svceImg = new Image();
    svceImg.onload = () => {
      svceDimensionsRef.current = {
        width: svceImg.width,
        height: svceImg.height,
        aspectRatio: svceImg.width / svceImg.height,
      };

      const reader = new FileReader();
      fetch("../assets/svce-logo.jpeg")
        .then((response) => response.blob())
        .then((blob) => {
          reader.onload = () => setSvceLogoData(reader.result);
          reader.readAsDataURL(blob);
        })
        .catch((error) => console.error("Error loading SVCE logo:", error));
    };
    svceImg.src = "../assets/svce-logo.jpeg";

    // Load the FORESE logo
    const foreseImg = new Image();
    foreseImg.onload = () => {
      foreseDimensionsRef.current = {
        width: foreseImg.width,
        height: foreseImg.height,
        aspectRatio: foreseImg.width / foreseImg.height,
      };

      const reader = new FileReader();
      fetch("../assets/login-logo.png")
        .then((response) => response.blob())
        .then((blob) => {
          reader.onload = () => setForeseLogoData(reader.result);
          reader.readAsDataURL(blob);
        })
        .catch((error) => console.error("Error loading FORESE logo:", error));
    };
    foreseImg.src = "../assets/login-logo.png";
  }, []);
  console.log("SVCE Logo Base64:", svceLogoBase64);
  console.log("Forese Logo Base64:", logoBase64);

  // Function to download the page as PDF
  const downloadPDF = () => {
    try {
      console.log("Creating PDF document...");

      // Create PDF document
      const doc = new jsPDF();

      // Define page dimensions and margins
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      const margin = 10; // Margin from edges for the border

      // Add border around the entire page
      doc.setDrawColor(0, 0, 0); // Black color
      doc.setLineWidth(0.5); // Border width
      doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);

      // Define consistent vertical position for all header elements
      // Add logos and title with better alignment
      //
      const headerY = 15;

      if (svceLogoBase64) {
        const svceAspectRatio = svceDimensionsRef.current.aspectRatio || 1;
        const svceWidth = 25;
        const svceHeight = svceWidth / svceAspectRatio;
        doc.addImage(svceLogoBase64, "PNG", 160, 13, 39, 20);
      }

      // Add central title - aligned vertically with logos
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("Mock Placement", 105, headerY + 10, { align: "center" });

      if (logoBase64) {
        const foreseAspectRatio = foreseDimensionsRef.current.aspectRatio || 1;
        const foreseWidth = 25;
        const foreseHeight = foreseWidth / foreseAspectRatio;
        doc.addImage(logoBase64, "PNG", 15, headerY, 35, 20);
      }

      // Add student details - adjusted starting position
      const startY = 50; // Increased to provide more space after the header
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Register Number: ${aptitudeScores.registerNo}`, 14, startY);
      doc.text(`Name: ${aptitudeScores.name}`, 14, startY + 7);
      doc.text(`Department: ${aptitudeScores.department}`, 14, startY + 14);

      // Aptitude Table
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Aptitude Test Scores", 14, startY + 30);

      // Use the autoTable function directly with categories as column headers
      autoTable(doc, {
        startY: startY + 40,
        head: [
          [
            "Aptitude",
            "Core",
            "Verbal",
            "Programming",
            "Comprehension",
            "Total",
          ],
        ],
        body: [
          [
            report[1]?.core || "absent",
            report[1]?.verbal || "absent",
            report[1]?.aptitude || "absent",
            report[1]?.programming || "absent",
            report[1]?.comprehension || "absent",
            report[1]?.points ? `${report[1]?.points}/50` : "absent",
          ],
        ],
        theme: "grid",
        headStyles: { fillColor: [30, 65, 160], textColor: 255 },
      });

      // Get the last Y position
      const finalY = (doc.lastAutoTable || { finalY: startY + 50 }).finalY;

      // GD Table
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Group Discussion Scores", 14, finalY + 20);

      autoTable(doc, {
        startY: finalY + 30,
        head: [
          [
            "Subject Knowledge",
            "Communication Skills",
            "Body Language",
            "Listening Skills",
            "Active Participation",
            "Total",
          ],
        ],
        body: [
          [
            report[0]?.subject_knowledge || "absent",
            report[0]?.communication_skills || "absent",
            report[0]?.active_participation || "absent",
            report[0]?.body_language || "absent",
            report[0]?.listening_skills || "absent",
            report[0]?.total ? `${report[0]?.total}/50` : "absent",
          ],
        ],
        theme: "grid",
        headStyles: { fillColor: [30, 65, 160], textColor: 255 },
      });

      // Save the PDF
      const filename = `${aptitudeScores.name.replace(/\s+/g, "_")}_scores.pdf`;
      doc.save(filename);
      console.log(`PDF saved as ${filename}`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert(`Failed to generate PDF: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col gap-10 w-full items-center pb-8 bg-blue-50">
      {/* PDF Content */}
      <div className="p-6 w-full max-w-10xl rounded-lg bg-white shadow-md">
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
            <strong>Register No:</strong> {report[0]?.regNo}
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
        onClick={() => {
          console.log("Download button clicked");
          downloadPDF();
        }}
        className="mt-6 px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition"
      >
        Download PDF
      </button>
    </div>
  );
}

ScoresPage.propTypes = {
  report: PropTypes.array.isRequired,
};
export default ScoresPage;
