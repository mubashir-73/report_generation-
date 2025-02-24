import ReportCard from "./reportcard";

export default function ReportPage() {
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
