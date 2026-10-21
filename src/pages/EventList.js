import { useState } from "react";
import FilterBar from "../components/FilterBar";
import EventTable from "../components/EventTable";

const EventList = ({ events, onDelete, onUpdate }) => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const handleQueryShift = (event) => setQuery(event.target.value);
  const handleStatusChange = (value) => setStatus(value);
  const normalizedQuery = query.trim().toLocaleLowerCase("vi");

  const filteredEvents = events.filter((event) => {
    const matchesQuery = event.name.toLocaleLowerCase("vi").includes(normalizedQuery);
    const isFull = event.registered === event.capacity;
    const matchesStatus =
      status === "all" ||
      (status === "available" && !isFull) ||
      (status === "full" && isFull);

    return matchesQuery && matchesStatus;
  });

  return (
    <section>
      <h1>Danh sách sự kiện</h1>
      <FilterBar
        query={query}
        status={status}
        onQueryChange={handleQueryShift}
        onStatusChange={handleStatusChange}
      />
      <p>Tìm thấy {filteredEvents.length} sự kiện</p>
      <EventTable events={filteredEvents} onDelete={onDelete} onUpdate={onUpdate} />
    </section>
  );
};

export default EventList;
