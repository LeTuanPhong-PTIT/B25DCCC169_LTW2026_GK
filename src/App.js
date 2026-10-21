import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import EventList from "./pages/EventList";
import AddEvent from "./pages/AddEvent";
import EventDetail from "./pages/EventDetail";
import "./App.css";

const App = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const savedEvents = localStorage.getItem("gk_events");

    if (savedEvents !== null) {
      try {
        const parsedEvents = JSON.parse(savedEvents);

        if (!Array.isArray(parsedEvents)) {
          throw new Error("Dữ liệu đã lưu không hợp lệ");
        }

        setEvents(parsedEvents);
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    } else {
      axios
        .get("/data/events.json", { signal: controller.signal })
        .then((response) => {
          setEvents(response.data);
          setError(false);
        })
        .catch((requestError) => {
          if (axios.isCancel(requestError) || requestError.code === "ERR_CANCELED") {
            return;
          }

          setError(true);
        })
        .finally(() => {
          if (!controller.signal.aborted) {
            setLoading(false);
          }
        });
    }

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      localStorage.setItem("gk_events", JSON.stringify(events));
    }
  }, [events, loading, error]);

  const addEvent = (eventData) => {
    const maxId = events.reduce((largestId, event) => Math.max(largestId, event.id), 0);
    const newEvent = {
      ...eventData,
      id: maxId + 1,
      registered: 0
    };

    setEvents((currentEvents) => [...currentEvents, newEvent]);
    return newEvent;
  };

  const deleteEvent = (id) => {
    setEvents((currentEvents) => currentEvents.filter((event) => event.id !== id));
  };

  const updateEvent = (id, updateData) => {
    setEvents((currentEvents) =>
      currentEvents.map((event) => {
        if (event.id !== id) {
          return event;
        }

        const changes = typeof updateData === "function" ? updateData(event) : updateData;
        return { ...event, ...changes };
      })
    );
  };

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout loading={loading} error={error} />}>
          <Route index element={<Home events={events} />} />
          <Route
            path="events"
            element={<EventList events={events} onDelete={deleteEvent} onUpdate={updateEvent} />}
          />
          <Route path="events/new" element={<AddEvent onAdd={addEvent} />} />
          <Route path="events/:id" element={<EventDetail events={events} />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
