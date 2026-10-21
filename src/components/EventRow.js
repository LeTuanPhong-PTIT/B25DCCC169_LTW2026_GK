import { Link } from "react-router-dom";

const EventRow = ({ event, onDelete, onUpdate }) => {
  const { id, name, location, date, capacity, registered } = event;
  const isFull = registered === capacity;
  const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString("vi-VN");

  const handleRegister = () => {
    onUpdate(id, (currentEvent) => ({
      registered: Math.min(currentEvent.capacity, currentEvent.registered + 1)
    }));
  };

  const handleDelete = () => onDelete(id);

  return (
    <tr className={isFull ? "event-row-full" : ""}>
      <td>
        <Link to={`/events/${id}`}>{name}</Link>
      </td>
      <td>{location}</td>
      <td>{formattedDate}</td>
      <td>{registered}/{capacity}</td>
      <td>
        <button type="button" onClick={handleRegister} disabled={isFull}>
          Đăng ký
        </button>
        <button type="button" onClick={handleDelete}>
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default EventRow;
