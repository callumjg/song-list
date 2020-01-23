import React, { useState, useEffect } from "react";
import Loader from "../../components/util_components/Loader";
import "./SongSelector.scss";

interface Props {
  songs: any[];
  isLoading: boolean;
  onSelect: (arg: any) => void;
}
const SongSelector: React.FC<Props> = ({ songs, isLoading, onSelect }) => {
  const [open, setOpen] = useState(" open");

  useEffect(() => {
    songs.length || isLoading ? setOpen(" open") : setOpen("");
  }, [songs, isLoading]);

  const onSelectWrapper = (song: any) => {
    onSelect(song);
    setOpen("");
  };

  return (
    <div className={`song-selector${open}`}>
      <Loader loading={isLoading}>
        <div className="song-selector-container">
          {songs.map(s => (
            <div key={s._id} onClick={() => onSelectWrapper(s)}>
              {s.title}
              <i className="ui plus icon" />
            </div>
          ))}
        </div>
      </Loader>
    </div>
  );
};

export default SongSelector;
