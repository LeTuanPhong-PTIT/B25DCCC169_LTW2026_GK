import EventRow from "./EventRow";

const EventTable = ({ events, onDelete, onUpdate }) => (
  <table>
    <thead>
      <tr>
        <th>Sự kiện</th>
        <th>Địa điểm</th>
        <th>Ngày</th>
        <th>Số chỗ</th>
        <th>Thao tác</th>
      </tr>
    </thead>
    <tbody>
      {events.length === 0 ? (
        <tr>
          <td colSpan="5">Không có dữ liệu</td>
        </tr>
      ) : (
        events.map((event) => (
          <EventRow key={event.id} event={event} onDelete={onDelete} onUpdate={onUpdate} />
        ))
      )}
    </tbody>
  </table>
);

export default EventTable;
