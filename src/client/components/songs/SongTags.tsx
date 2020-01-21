import React, { useState } from "react";
import Tags from "./Tags";

const SongTags: React.FC = ({ tags, setTags, exclude, setExclude }) => {
  const T = new Tags(tags, exclude);
  const [activeCat, setActiveCat] = useState("Category A");
  const catButtons = ["Category A", "Category B (Hymn)"];
  const buttonClasses = "btn btn-outline-primary no-glow btn-sm";
  const [showArchived, setShowArchived] = useState("");

  function getCatClasses(c) {
    return activeCat === c ? buttonClasses + " active" : buttonClasses;
  }
  function handleCatClick(c) {
    setActiveCat(c);
    T.addTag(c).addExclude(c === catButtons[0] ? catButtons[1] : catButtons[0]);
    setTags(T.getTags());
    setExclude(T.getExclude());
  }
  return (
    <div>
      <div className="btn-group btn-group-toggle mr-2">
        {catButtons.map((c, i) => (
          <button
            className={getCatClasses(c)}
            onClick={() => handleCatClick(c)}
            key={i}
          >
            {c}
          </button>
        ))}
      </div>
      <button
        className={buttonClasses + showArchived}
        onClick={() => {
          if (!showArchived) {
            setShowArchived(" active");
            setTags(T.addTag("archived").getTags());
            setExclude(T.getExclude());
          } else {
            setShowArchived("");
            setTags(T.addExclude("archived").getTags());
            setExclude(T.getExclude());
          }
        }}
      >
        <i className="ui archive icon" /> Archived
      </button>
    </div>
  );
};

export default SongTags;
