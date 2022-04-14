import React, { useState } from "react";

export function MultiToggler(props) {
  const { initialState, states } = props;
  const [selectedState, setSelectedState] = useState(initialState);

  const handleClick = (s) => {
    setSelectedState(s);
    props.onClick(s);
  };

  return (
    <div className="state-wrapper">
      {states.map((s, i) => {
        return (
          <div
            className={s === selectedState ? "selected-state" : "state"}
            key={"state" + i}
            onClick={() => handleClick(s)}
          >
            {s}
          </div>
        );
      })}
    </div>
  );
}
