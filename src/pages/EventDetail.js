import { useNavigate, useParams } from "react-router-dom";
import Countdown from "../components/Countdown";

const EventDetail = ({ events }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const eventId = Number(id);
  const event = events.find((currentEvent) => currentEvent.id === eventId);

  if (!event) {
    return <p>Không tìm thấy sự kiện</p>;
  }

  const { name, location, date, capacity, registered } = event;
  const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString("vi-VN");

  return (
    <section className="event-detail">
      <h1>Chi tiết sự kiện</h1>
      <p>Tên sự kiện: {name}</p>
      <p>Địa điểm: {location}</p>
      <p>Ngày: {formattedDate}</p>
      <p>Số chỗ: {registered}/{capacity}</p>
      <Countdown date={date} />
      <button type="button" onClick={() => navigate(-1)}>
        Quay lại
      </button>
    </section>
  );
};

export default EventDetail;
