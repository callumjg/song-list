import React from "react";

const SongSearch = ({ search, setSearch }) => {
  return (
    <div className="my-3">
      <input
        type="text"
        className="form-control "
        placeholder="Search title or author..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SongSearch;
