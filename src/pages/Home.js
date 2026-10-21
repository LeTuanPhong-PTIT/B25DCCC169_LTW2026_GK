const Home = ({ events }) => {
  const totalEvents = events.length;
  const totalRegistrations = events.reduce((total, event) => total + event.registered, 0);
  const fullEvents = events.filter((event) => event.registered === event.capacity).length;

  return (
    <section>
      <h1>Sự kiện CLB</h1>
      <div className="statistics">
        <p>Tổng số sự kiện: {totalEvents}</p>
        <p>Tổng số lượt đăng ký: {totalRegistrations}</p>
        <p>Số sự kiện đã đầy: {fullEvents}</p>
      </div>
    </section>
  );
};

export default Home;
