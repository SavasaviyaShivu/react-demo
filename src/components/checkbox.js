import React from "react";

export const Checkbox = React.memo(({ item, handleCheckbox }) => {
  return (
    <div className="checkbox-input">
      <span>{item.title}</span>
      <div>
        <span>${item.price}</span>
        <input
          type="checkbox"
          checked={item.selected}
          onChange={() => handleCheckbox(item)}
        />
      </div>
    </div>
  );
});
