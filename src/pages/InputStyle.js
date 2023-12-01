import React, { useState } from "react";
import JsonData from "../data.json";
import { Checkbox } from "../components/checkbox";
import { Radio } from "../components/radio";
import "../style.css";

const InputStyle = () => {
  const [selectedItems, setSelectedItems] = useState(JsonData);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleCheckbox = (item) => {
    updateDataArray("checkBox", item, (dataItem) => ({
      ...dataItem,
      selected: !dataItem.selected,
    }));
  };

  const handleRadio = (item) => {
    updateDataArray("radioButton", item, (dataItem) => ({
      ...dataItem,
      selected: true,
    }));
  
    // Unselect other radio buttons in the same group
    const updatedDataArray = selectedItems.map((group) => {
      if (group.type === "radioButton" && group.group === item.group) {
        group.data = group.data.map((dataItem) => ({
          ...dataItem,
          selected: dataItem._id === item._id,
        }));
      }
      return group;
    });
  
    setSelectedItems(updatedDataArray);
    calculateTotalPrice(updatedDataArray);
  };
  
  const updateDataArray = (type, selectedItem, updateCallback) => {
    const updatedDataArray = selectedItems.map((group) => {
      if (group.type === type) {
        group.data = group.data.map((dataItem) =>
          dataItem._id === selectedItem._id
            ? updateCallback(dataItem)
            : dataItem
        );
      }
      return group;
    });

    setSelectedItems(updatedDataArray);
    calculateTotalPrice(updatedDataArray);
  };

  const calculateTotalPrice = (data) => {
    const total = data
      .flatMap((group) => group.data)
      .filter((item) => item.selected)
      .reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
  };

  return (
    <div>
      {selectedItems.map((group) => (
        <div key={group.type}>
          <h3>
            {group?.type === "checkBox" ? "CheckBox" : "RadioButton"} List
          </h3>
          <div className="inputstyle">
            {group.type === "radioButton"
              ? group.data.map((item) => (
                  <Radio
                    key={item._id}
                    item={item}
                    handleRadio={() => handleRadio(item)}
                  />
                ))
              : group.data.map((item) => (
                  <Checkbox
                    key={item._id}
                    item={item}
                    handleCheckbox={() => handleCheckbox(item)}
                  />
                ))}
          </div>
        </div>
      ))}
      <div>
        <h2>Total : ${totalPrice}</h2>
      </div>
    </div>
  );
};

export default InputStyle;
