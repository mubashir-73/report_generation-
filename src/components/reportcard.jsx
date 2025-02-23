export default function ReportCard() {
  return (
    <div className="w-full  h-30 max-w-10xl bg-white p-6 rounded-lg shadow-lg relative">
      {/* Student Info */}
      <div className="flex justify-between px-0">
        <div className=" flex  flex-col text-lg gap-6">
          <p>
            <strong>Student Name:</strong> Harshitha
          </p>
          <p>
            <strong>Student Registration:</strong> 2127230701043
          </p>
        </div>
        <div className="text-lg ">
          <p>
            <strong>Department:</strong> Electronics and Communication
          </p>
        </div>
      </div>
    </div>
  );
}
