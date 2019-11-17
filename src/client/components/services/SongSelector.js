import React, { useState, useEffect } from "react";
import Loader from "../util_components/Loader";
import "./SongSelector.scss";

function SongSelector(props) {
  const [open, setOpen] = useState(" open");
  useEffect(() => {
    props.songs.length || props.isLoading ? setOpen(" open") : setOpen("");
  }, [props.songs, props.isLoading]);

  function onSelect(song) {
    props.onSelect(song);
    setOpen("");
  }
  return (
    <div className={`song-selector${open}`}>
      <Loader loading={props.isLoading}>
        <div className="song-selector-container">
          {props.songs.map(s => (
            <div key={s._id} onClick={() => onSelect(s)}>
              {s.title}
              <i className="ui plus icon" />
            </div>
          ))}
        </div>
      </Loader>
    </div>
  );
}

export default SongSelector;
