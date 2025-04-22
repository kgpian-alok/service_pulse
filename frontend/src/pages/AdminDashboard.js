import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ServiceCard from "../components/ServiceCard";

const AdminDashboard = () => {
  const [services, setServices] = useState([]);
  const [histories, setHistories] = useState({});
  const [newService, setNewService] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const socket = io(`${process.env.REACT_APP_API_URL}`);
    fetchServices();

    socket.on("statusUpdate", () => {
      fetchServices(); // real-time update
    });

    return () => socket.disconnect();
  }, []);

  const fetchServices = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/services`);
    const data = await res.json();
    setServices(data);
    data.forEach((service) => fetchHistory(service._id));
  };

  const fetchHistory = async (id) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/services/${id}/history`
    );
    const data = await res.json();
    setHistories((prev) => ({ ...prev, [id]: data }));
  };

  const createService = async () => {
    if (!newService.trim()) return;
    await fetch(`${process.env.REACT_APP_API_URL}/api/services`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newService }),
    });
    setNewService("");
  };

  const updateStatus = async (id, status) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/services/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
  };

  const deleteService = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/services/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return (
    <div className="max-w-7xl mx-auto mt-6 px-4">
      <h2 className="text-3xl font-bold mb-6 text-orange-600">
        Admin Dashboard
      </h2>

      <div className="flex mb-6 gap-3">
        <input
          className="flex-1 border p-2 rounded"
          placeholder="Enter a new service name"
          value={newService}
          onChange={(e) => setNewService(e.target.value)}
        />
        <button
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
          onClick={createService}
        >
          Add a New Service
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div key={service._id} className="relative">
            <ServiceCard
              service={service}
              isAdmin={true}
              onStatusChange={updateStatus}
              history={histories[service._id] || []}
            />
            <button
              onClick={() => deleteService(service._id)}
              className="absolute top-3 right-3 text-red-600 text-sm hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
