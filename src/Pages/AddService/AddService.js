import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./AddService.css";

const AddService = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    axios.post("http://localhost:5000/services", data).then((res) => {
      console.log(res);
      if (res.data.insertedId) {
        setMessage("Successfully added");
        reset();
      }
    });
  };
  return (
    <div className="addService">
      <h2>Add a service</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: true, maxLength: 20 })}
          placeholder="name"
        />
        <textarea {...register("description")} placeholder="description" />
        <input type="number" {...register("price")} placeholder="price" />
        <input {...register("img")} placeholder="img url" />
        <input type="submit" />
      </form>
      <div>{message}</div>
    </div>
  );
};

export default AddService;
