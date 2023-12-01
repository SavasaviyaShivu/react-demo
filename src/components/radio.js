import React from "react";
export const Radio = React.memo(({ item, handleRadio }) => {
    return (
        <div className="radio-input">
            <span>{item.title}</span>
            <div>
                <span>${item.price}</span>
                <input
                    type="radio"
                    name="radioButton"
                    checked={item.selected}
                    onChange={() => handleRadio(item)}
                />
            </div>
        </div>
    );
})
