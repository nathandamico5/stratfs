import React, { useState, useEffect } from "react";

const RowEntry = ({ entry, handleSingleCheck, pendingRemoval }) => {
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    pendingRemoval.includes(entry.id)
      ? setIsChecked(false)
      : setIsChecked(true);
  }, [pendingRemoval]);

  const handleClick = (e) => {
    setIsChecked(!isChecked);
    handleSingleCheck(e, entry);
  };

  return (
    <tr className={isChecked ? "" : "unchecked"}>
      <td className="checkbox-col">
        <input type="checkbox" defaultChecked onClick={handleClick}></input>
      </td>
      <td>{entry.creditorName}</td>
      <td>{entry.firstName}</td>
      <td>{entry.lastName}</td>
      <td>{entry.minPaymentPercentage.toFixed(2)}%</td>
      <td>${entry.balance.toFixed(2)}</td>
    </tr>
  );
};

export default RowEntry;
