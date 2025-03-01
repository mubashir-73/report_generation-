import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import ReportPDF from "./reportpdf";

Modal.setAppElement("#root");

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/scores");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleMoreDetails = (student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">S.No</th>
              <th className="border p-2">Student Name</th>
              <th className="border p-2">Reg. No</th>
              <th className="border p-2">Total Score</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student._id || index} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{student.name}</td>
                <td className="border p-2">{student.regNo}</td>
                <td className="border p-2">{student.total || "N/A"}</td>
                <td className="border p-2">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() => handleMoreDetails(student)}
                  >
                    More Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for More Details */}
      <Modal
        isOpen={open}
        onRequestClose={handleClose}
        contentLabel="Student Report"
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4">Student Report</h2>
        {selectedStudent && <ReportPDF report={[selectedStudent]} />}
        <button
          onClick={handleClose}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export { AdminDashboard };
