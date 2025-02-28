import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

const ReportPDF = () => {
  const reportRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (reportRef.current) {
      setIsReady(true);
    }
  }, []);

  const handleDownloadPDF = useReactToPrint({
    content: () => reportRef.current,
    documentTitle: "Student_Report",
    removeAfterPrint: true,
    onPrintError: (error) => console.error("Print Error:", error),
  });

  return (
    <div className="w-full h-screen p-6 bg-gray-100 flex flex-col items-center">
      <div
        ref={reportRef}
        className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Student Report</h2>
        <div className="text-lg mb-4">
          <p>
            <strong>Student Name:</strong> John Doe
          </p>
          <p>
            <strong>Student Registration:</strong> 123456789
          </p>
          <p>
            <strong>Department:</strong> Electronics and Communication
          </p>
        </div>
      </div>
      {isReady && (
        <button
          onClick={handleDownloadPDF}
          className="mt-4 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold transition duration-300"
        >
          Download PDF
        </button>
      )}
    </div>
  );
};

export default ReportPDF;
