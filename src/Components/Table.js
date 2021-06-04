import React, { useState, useEffect } from "react";
import axios from "axios";
import RowEntry from "./RowEntry";
import NewRowEntry from "./NewRowEntry";

const Table = () => {
  const [data, setData] = useState([]);
  const [totalDebt, setTotalDebt] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [checkedRows, setCheckedRows] = useState(0);
  const [pendingRemoval, setPendingRemoval] = useState([]);
  const [newRow, setNewRow] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const { data: debtData } = await axios.get(
        `https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json`
      );
      setData(debtData);
      getTotals(debtData);
    };
    getData();
  }, []);

  // Calculate Total Values
  const getTotals = (allData) => {
    let debtTotal = 0;
    let totalRows = 0;
    allData.forEach((entry) => {
      debtTotal += entry.balance;
      totalRows++;
    });
    setTotalDebt(debtTotal);
    setTotalRows(totalRows);
    setCheckedRows(totalRows);
  };

  // Handler for checking/unchecking checkbox for all rows
  const handleAllCheck = (e) => {
    const checkboxes = document.getElementsByTagName("input");
    if (!e.target.checked) {
      for (let i = 1; i < checkboxes.length; i++) {
        setTotalDebt(0);
        setCheckedRows(0);
        checkboxes[i].checked = false;
      }
      let newPendingRemoval = [];
      data.forEach((entry) => newPendingRemoval.push(entry.id));
      setPendingRemoval([...newPendingRemoval]);
    } else {
      for (let i = 1; i < checkboxes.length; i++) {
        checkboxes[i].checked = true;
        getTotals(data);
        setPendingRemoval([]);
      }
    }
  };

  // Handler for checking/unchecking a single row's checkbox
  const handleSingleCheck = (e, entry) => {
    let newTotal = totalDebt;
    let newCheckedTotal = checkedRows;
    if (!e.target.checked) {
      newTotal = totalDebt - entry.balance;
      newCheckedTotal = checkedRows - 1;
      setPendingRemoval([...pendingRemoval, entry.id]);
    } else {
      newTotal = totalDebt + entry.balance;
      newCheckedTotal = checkedRows + 1;
      let newPendingRemoval = pendingRemoval;
      newPendingRemoval = newPendingRemoval.filter((id) => id !== entry.id);
      setPendingRemoval(newPendingRemoval);
    }
    setTotalDebt(newTotal);
    setCheckedRows(newCheckedTotal);
  };

  // Handler for adding of new row and updating totals
  const handleNewEntry = (newEntry) => {
    setData([...data, newEntry]);
    setTotalDebt(totalDebt + newEntry.balance);
    setCheckedRows(checkedRows + 1);
    setTotalRows(totalRows + 1);
  };

  // Toggle handler for opeing up new entry form
  const addDebt = async () => {
    setNewRow(true);
  };

  // Handler for deleting selected unselected rows
  const removeDebt = async () => {
    let newData = data;
    newData = newData.filter((entry) => !pendingRemoval.includes(entry.id));
    setData(newData);
    getTotals(newData);
    // await axios.delete(`https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json`)
  };

  return (
    <div className="container">
      {newRow && (
        <NewRowEntry
          setNewRow={setNewRow}
          data={data}
          handleNewEntry={handleNewEntry}
        />
      )}
      {data.length ? (
        <table>
          <tbody>
            <tr>
              <th className="checkbox-col">
                <input
                  type="checkbox"
                  defaultChecked
                  onChange={handleAllCheck}
                ></input>
              </th>
              <th>Creditor</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Min Pay %</th>
              <th>Balance</th>
            </tr>
            {data.map((entry) => (
              <RowEntry
                key={entry.id}
                entry={entry}
                handleSingleCheck={handleSingleCheck}
                pendingRemoval={pendingRemoval}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <h3>No Current Entries</h3>
      )}
      <button className="add btn" onClick={addDebt}>
        Add Debt
      </button>
      {data.length ? (
        <button className="delete btn" onClick={removeDebt}>
          Remove Debt
        </button>
      ) : (
        ""
      )}
      <div className="debt-total">
        Total: <span>${totalDebt.toFixed(2)}</span>
      </div>
      <div className="row-totals">
        <p>Total Row Count: {totalRows}</p>
        <p>Checked Row Count: {checkedRows}</p>
      </div>
    </div>
  );
};

export default Table;
