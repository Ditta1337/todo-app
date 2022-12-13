import React from "react";
import style from "../styles/modules/checkbox.module.css";

// fancy checkbox component stolen from the interner and modified a little

function CheckBox({
  isChecked,
  handleCheck,
}: {
  isChecked: boolean;
  handleCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className={style.toggle}>
      <input
        type="checkbox"
        className={style.toggleInput}
        id="uniqueID"
        checked={isChecked}
        onChange={handleCheck}
      />
      <span className={style.toggleTrack}>
        <span className={style.toggleIndicator}>
          <span className={style.checkMark}>
            <svg
              viewBox="0 0 24 24"
              id="ghq-svg-check"
              role="presentation"
              aria-hidden="true"
            >
              <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
            </svg>
          </span>
        </span>
      </span>
    </label>
  );
}

export default CheckBox;
