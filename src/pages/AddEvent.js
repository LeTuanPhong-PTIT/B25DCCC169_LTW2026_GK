import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEvent = ({ onAdd }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    date: "",
    capacity: null
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: name === "capacity" ? (value === "" ? null : Number(value)) : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.location.trim() ||
      !formData.date ||
      formData.capacity === null
    ) {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (
      !Number.isInteger(formData.capacity) ||
      formData.capacity < 10 ||
      formData.capacity > 1000
    ) {
      setErrorMessage("Sức chứa phải từ 10 đến 1000");
      return;
    }

    onAdd({
      name: formData.name.trim(),
      location: formData.location.trim(),
      date: formData.date,
      capacity: Number(formData.capacity)
    });
    navigate("/events", { replace: true });
  };

  return (
    <section>
      <h1>Thêm sự kiện</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="event-name">Tên sự kiện</label>
          <input
            id="event-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="event-location">Địa điểm</label>
          <input
            id="event-location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="event-date">Ngày diễn ra</label>
          <input
            id="event-date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="event-capacity">Sức chứa</label>
          <input
            id="event-capacity"
            name="capacity"
            type="number"
            step="any"
            value={formData.capacity === null ? "" : formData.capacity}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Thêm</button>
        {errorMessage && <p className="validation-error">{errorMessage}</p>}
      </form>
    </section>
  );
};

export default AddEvent;
