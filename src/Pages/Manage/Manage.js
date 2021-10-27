import React, { useEffect, useState } from "react";

const Manage = () => {
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  const handleDelete = (id) => {
    // const url = `http://localhost:5000/services/${id}`;
    fetch(`http://localhost:5000/services/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount) {
          const remaining = services.filter((service) => service._id !== id);
          setServices(remaining);
          setMessage("Deleted Successfully!");
        }
      });
  };
  return (
    <div>
      <h2>Manage Services</h2>
      {services.map((service) => (
        <div key={service._id}>
          <h3>{service.name}</h3>
          <button onClick={() => handleDelete(service._id)}>Delete</button>
        </div>
      ))}

      <div>{message}</div>
    </div>
  );
};

export default Manage;
