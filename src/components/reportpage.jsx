import ReportCard from "./reportcard";

export default function ReportPage() {
  const [report, setReport] = useState([]);
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
        console.log("Report Data:", modifiedData); // Logs the correct response
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
      <div className="w-full h-screen p-6 bg-gray-100">
        <ReportCard
          studentName="John Doe"
          studentRegNo="123456789"
          department="Computer Science"
        />
        <div className="flex justify-between items-center p-3 px-4">
          <h2 className="text-2xl font-bold text-center flex-1">
            Report Preview
          </h2>
          <button className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold transition duration-300">
            Download
          </button>
        </div>
      </div>
    </>
  );
}
