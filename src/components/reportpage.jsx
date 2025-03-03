import { useEffect, useState } from "react";
import ScoresPage from "./Scorepage";

export default function ReportPage() {
  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token"); // Fetch token inside useEffect
    const departments = [
      { id: "aids", name: "Artificial Intelligence and Data Science" },
      { id: "auto", name: "Automobile Engineering" },
      { id: "bio", name: "Biotechnology" },
      { id: "chem", name: "Chemical Engineering" },
      { id: "civil", name: "Civil Engineering" },
      { id: "cs", name: "Computer Science and Engineering" },
      { id: "ee", name: "Electrical and Electronics Engineering" },
      { id: "ec", name: "Electronics and Communication Engineering" },
      { id: "mechat", name: "Mechanical and Automation Engineering" },
      { id: "mech", name: "Mechanical Engineering" },
      { id: "it", name: "Information Technology" },
    ];

    function normalizeDept(dataArray) {
      return dataArray.map((item) => {
        const matchedDept = departments.find(
          (dept) => dept.id === item.dept || dept.name === item.dept,
        );
        return { ...item, dept: matchedDept ? matchedDept.name : item.dept }; // Replace ID with full name
      });
    }
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
        const modifiedData = normalizeDept(data);
        setReport(modifiedData);
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
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen w-full p-4 sm:p-6 pt-6 md:p-6 bg-blue-50 relative">
        <div className="flex flex-col justify-between pb-4">
          {report ? (
            <ScoresPage report={report} />
          ) : (
            <h1>Report is loading...</h1>
          )}{" "}
        </div>
      </div>{" "}
    </>
  );
}
