import React, { useState } from "react";

const statusOptions = [
  "Operational",
  "Degraded Performance",
  "Partial Outage",
  "Major Outage",
];

const ServiceCard = ({ service, isAdmin, onStatusChange, history = [] }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(service.status);

  const handleSaveStatus = () => {
    if (selectedStatus !== service.status) {
      onStatusChange(service._id, selectedStatus);
    }
  };

  return (
    <div className="bg-white border-2 border-orange-300 shadow-md p-6 rounded-lg relative">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-orange-600">
          {service.name}
        </h3>
        <span className="text-sm text-gray-500">{service.status}</span>
      </div>

      {isAdmin && (
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Select New Status:
          </label>
          <select
            className="border rounded px-2 py-1 w-full"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <button
            onClick={handleSaveStatus}
            disabled={selectedStatus === service.status}
            className={`mt-2 px-3 py-1 rounded text-sm font-medium ${
              selectedStatus === service.status
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-orange-600 text-white hover:bg-orange-700"
            }`}
          >
            Save Status
          </button>
        </div>
      )}

      <button
        onClick={() => setShowModal(true)}
        className="mt-2 text-sm text-orange-600 font-medium hover:underline"
      >
        View Status History
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white max-w-lg w-full rounded shadow-lg p-6 relative">
            <h4 className="text-lg font-semibold mb-4 text-orange-600">
              Status History
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border text-left">
                <thead>
                  <tr className="bg-orange-100">
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Changed By</th>
                    <th className="p-2 border">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {history.length > 0 ? (
                    history.map((entry, i) => (
                      <tr key={i} className="even:bg-gray-50">
                        <td className="p-2 border">{entry.status}</td>
                        <td className="p-2 border">
                          {entry.changedBy?.email || "Unknown"}
                        </td>
                        <td className="p-2 border">
                          {new Date(entry.changedAt).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="p-2 text-center text-gray-500">
                        No history available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 text-sm bg-orange-600 text-white rounded hover:bg-orange-700"
            >
              Close
            </button>

            <button
              className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-lg font-bold"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
