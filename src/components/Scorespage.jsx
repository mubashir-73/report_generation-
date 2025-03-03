import { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import PropTypes from "prop-types";
import logo from "../assets/login-logo.png";
import svceLogo from "../assets/svce-logo.jpeg";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
const ScoresPage = () => {
  // Sample data for a single user
  // eslint-disable-next-line no-unused-vars
  const [aptitudeScores, setAptitudeScores] = useState({
    name: "John Doe",
    registerNo: "185001120",
    department: "Computer Science Engineering",
    aptitude: 7,
    core: 12,
    verbal: 4,
    programming: 7,
    comprehension: 5,
    total: 35,
  });

  // eslint-disable-next-line no-unused-vars
  const [gdScores, setGdScores] = useState({
    name: "John Doe",
    subjectKnowledge: 7,
    communicationSkills: 12,
    bodyLanguage: 4,
    listeningSkills: 7,
    activeParticipation: 5,
    total: 35,
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
      fetch("/logo.png")
        .then((response) => response.blob())
        .then((blob) => {
          reader.onload = () => setSvceLogoData(reader.result);
          reader.readAsDataURL(blob);
        })
        .catch((error) => console.error("Error loading SVCE logo:", error));
    };
    svceImg.src = "/logo.png";

    // Load the FORESE logo
    const foreseImg = new Image();
    foreseImg.onload = () => {
      foreseDimensionsRef.current = {
        width: foreseImg.width,
        height: foreseImg.height,
        aspectRatio: foreseImg.width / foreseImg.height,
      };

      const reader = new FileReader();
      fetch("/login-logo.png")
        .then((response) => response.blob())
        .then((blob) => {
          reader.onload = () => setForeseLogoData(reader.result);
          reader.readAsDataURL(blob);
        })
        .catch((error) => console.error("Error loading FORESE logo:", error));
    };
    foreseImg.src = "/login-logo.png";
  }, []);

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
      const headerY = 15;

      // Add logos and title with better alignment
      if (svceLogoData) {
        const svceAspectRatio = svceDimensionsRef.current.aspectRatio || 1;
        const svceWidth = 25;
        const svceHeight = svceWidth / svceAspectRatio;
        doc.addImage(svceLogoData, "PNG", 15, headerY, svceWidth, svceHeight);
      }

      // Add central title - aligned vertically with logos
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("Mock Placement", 105, headerY + 10, { align: "center" });

      if (foreseLogoData) {
        const foreseAspectRatio = foreseDimensionsRef.current.aspectRatio || 1;
        const foreseWidth = 25;
        const foreseHeight = foreseWidth / foreseAspectRatio;
        doc.addImage(
          foreseLogoData,
          "PNG",
          170,
          headerY,
          foreseWidth,
          foreseHeight
        );
      }

      // Add student details - adjusted starting position
      const startY = 45; // Increased to provide more space after the header
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Register Number: ${aptitudeScores.registerNo}`, 14, startY);
      doc.text(`Name: ${aptitudeScores.name}`, 14, startY + 7);
      doc.text(`Department: ${aptitudeScores.department}`, 14, startY + 14);

      // Aptitude Table
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Aptitude Test Scores", 14, startY + 25);

      // Use the autoTable function directly with categories as column headers
      autoTable(doc, {
        startY: startY + 30,
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
            report[1]?.total ? `${report[0]?.total}/50` : "absent",
          ],
        ],
        theme: "grid",
        headStyles: { fillColor: [30, 65, 160], textColor: 255 },
      });

      // Get the last Y position
      const finalY = (doc.lastAutoTable || { finalY: startY + 40 }).finalY;

      // GD Table
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Group Discussion Scores", 14, finalY + 10);

      autoTable(doc, {
        startY: finalY + 15,
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
    <div className="h-screen">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <img src="/logo.png" alt="SVCE Logo" className="h-16" />
          <h1 className="text-2xl font-bold text-center">Mock Placement</h1>
          <img src="/login-logo.png" alt="FORESE Logo" className="h-16" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Register Number
              </label>
              <div className="mt-1 text-lg">{aptitudeScores.registerNo}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1 text-lg">{aptitudeScores.name}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <div className="mt-1 text-lg">{aptitudeScores.department}</div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">Aptitude Test Scores</h2>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-[#1e41a0] text-white">
                  <th className="py-2 px-4 border text-center">Aptitude</th>
                  <th className="py-2 px-4 border text-center">Core</th>
                  <th className="py-2 px-4 border text-center">Verbal</th>
                  <th className="py-2 px-4 border text-center">Programming</th>
                  <th className="py-2 px-4 border text-center">
                    Comprehension
                  </th>
                  <th className="py-2 px-4 border text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border text-center">
                    {aptitudeScores.aptitude}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {aptitudeScores.core}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {aptitudeScores.verbal}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {aptitudeScores.programming}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {aptitudeScores.comprehension}
                  </td>
                  <td className="py-2 px-4 border text-center font-semibold">
                    {aptitudeScores.total}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-semibold mb-4">
            Group Discussion Scores
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-[#1e41a0] text-white">
                  <th className="py-2 px-4 border text-center">
                    Subject Knowledge
                  </th>
                  <th className="py-2 px-4 border text-center">
                    Communication Skills
                  </th>
                  <th className="py-2 px-4 border text-center">
                    Body Language
                  </th>
                  <th className="py-2 px-4 border text-center">
                    Listening Skills
                  </th>
                  <th className="py-2 px-4 border text-center">
                    Active Participation
                  </th>
                  <th className="py-2 px-4 border text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border text-center">
                    {gdScores.subjectKnowledge}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {gdScores.communicationSkills}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {gdScores.bodyLanguage}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {gdScores.listeningSkills}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {gdScores.activeParticipation}
                  </td>
                  <td className="py-2 px-4 border text-center font-semibold">
                    {gdScores.total}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={() => {
              console.log("Download button clicked");
              downloadPDF();
            }}
            className="px-6 py-3 bg-[#1e41a0] text-white font-medium rounded-md hover:bg-blue-800 transition duration-300"
          >
            Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoresPage;
