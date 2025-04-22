import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ServiceCard from "../components/ServiceCard";

const CustomerDashboard = () => {
  const [services, setServices] = useState([]);
  const [histories, setHistories] = useState({});

  useEffect(() => {
    const socket = io(`${process.env.REACT_APP_API_URL}`);
    fetchServices();

    socket.on("statusUpdate", () => {
      fetchServices(); // real-time sync
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

  return (
    <div className="max-w-7xl mx-auto mt-6 px-4">
      <h2 className="text-3xl font-bold mb-6 text-orange-600">
        Customer Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div key={service._id}>
            <ServiceCard
              service={service}
              isAdmin={false}
              history={histories[service._id] || []}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDashboard;
