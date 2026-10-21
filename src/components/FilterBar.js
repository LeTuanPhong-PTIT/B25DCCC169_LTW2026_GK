const FilterBar = ({ query, status, onQueryChange, onStatusChange }) => (
  <div className="filter-bar">
    <div className="form-field">
      <label htmlFor="event-query">Tìm kiếm</label>
      <input
        id="event-query"
        type="text"
        value={query}
        onChange={onQueryChange}
        placeholder="Tìm kiếm theo tên sự kiện"
      />
    </div>
    <div className="form-field">
      <label htmlFor="event-status">Tình trạng</label>
      <select
        id="event-status"
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
      >
        <option value="all">Tất cả</option>
        <option value="available">Còn chỗ</option>
        <option value="full">Đã đầy</option>
      </select>
    </div>
  </div>
);

export default FilterBar;
