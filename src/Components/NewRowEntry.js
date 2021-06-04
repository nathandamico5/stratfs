import React, { useState } from "react";

const NewRowEntry = ({ setNewRow, data, handleNewEntry }) => {
  const [creditorName, setCreditorName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [minPaymentPercentage, setMinPaymentPercentage] = useState(0);
  const [balance, setBalance] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: data.length + 1,
      creditorName,
      firstName,
      lastName,
      minPaymentPercentage,
      balance,
    };
    handleNewEntry(newEntry);
    setCreditorName("");
    setFirstName("");
    setLastName("");
    setMinPaymentPercentage(0);
    setBalance(0);

    // await axios.post(`https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json`, {
    //   creditorName,
    //   firstName,
    //   lastName,
    //   minPaymenyPercentage,
    //   balance
    // })
  };

  return (
    <div className="new-entry">
      <div className="form-title">
        <h1>Enter New Row</h1>
        <button className="btn delete" onClick={() => setNewRow(false)}>
          Cancel
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Creditor</label>
        <input
          type="text"
          value={creditorName}
          onChange={(e) => setCreditorName(e.target.value)}
        />
        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label>Minimim Payment %</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={minPaymentPercentage}
          onChange={(e) => setMinPaymentPercentage(Number(e.target.value))}
        />
        <label>Balance</label>
        <input
          type="number"
          min="0"
          value={balance}
          onChange={(e) => setBalance(Number(e.target.value))}
        />
        <button className="btn add" type="submit">
          Add Entry
        </button>
      </form>
    </div>
  );
};

export default NewRowEntry;
