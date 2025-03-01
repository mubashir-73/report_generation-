import ReportCard from "./reportcard";
import { useEffect, useState } from "react";
import DownloadPDF from "./reportpdf";

export default function ReportPage() {
  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token"); // Fetch token inside useEffect

    const fetchReport = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/score", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setReport(data);
        console.log("Report Data:", data); // Logs the correct response
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchReport();
  }, []); // Runs only once when the component mounts

  useEffect(() => {
    console.log("Updated Report:", report); // Watches report state changes
  }, [report]);
  if (loading) {
    return (
      <div className="flex justify-center w-full items-center h-screen">
        Loading...
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen w-full p-4 sm:p-6 pt-[75px] md:p-6 bg-blue-50 relative">
        <ReportCard
          studentName={report[0]?.username}
          studentRegNo={report[0]?.regNo}
          department={report[0]?.dept}
        />

        
        <div className="flex flex-col justify-between py-4">
          <h2 className="text-2xl font-bold text-center p-1 flex-1">
            Report Preview
          </h2>
          {report ? (
            <DownloadPDF report={report} />
          ) : (
            <h1>Report is loading...</h1>
          )}{" "}
        </div>
      </div>
    </>
  );
}
