import PropTypes from "prop-types";
export default function ReportCard(props) {
  return (
    <div className="w-full  h-30 max-w-10xl bg-white p-6 rounded-lg shadow-lg relative">
      {/* Student Info */}
      <div className="flex justify-between px-0">
        <div className=" flex  flex-col text-lg gap-6">
          <p>
            <strong>Student Name:</strong>
            {props.studentName}
          </p>
          <p>
            <strong>Student Registration:</strong> {props.studentRegNo}
          </p>
        </div>
        <div className="text-lg ">
          <p>
            <strong>Department:</strong>
            {props.department}
          </p>
        </div>
      </div>
    </div>
  );
}

ReportCard.propTypes = {
  studentName: PropTypes.string.isRequired,
  studentRegNo: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
};
