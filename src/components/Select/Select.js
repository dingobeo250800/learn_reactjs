import React from "react";

const options = [
  {
    label: "Apple",
    value: "apple",
  },
  {
    label: "Mango",
    value: "mango",
  },
  {
    label: "Banana",
    value: "banana",
  },
  {
    label: "Pineapple",
    value: "pineapple",
  },
];
function Select(props) {
  return (
    <div id="abc">
      
      {/* <div className="select-container">
        <select>
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </div> */}
      
    </div>
  );
}

export default Select;