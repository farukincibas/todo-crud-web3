// src/components/CreateTodo.js
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import styles from "../../styles/AddTask.module.css";
import Loader from "../../components/Loader";

const CreateTodo = ({ contract, setLoading }) => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");
  const [loader, setLoader] = useState(false);

  const handleAdd = async (event) => {
    event.preventDefault();

    let importance = 0;
    switch (priority) {
      case "Urgent":
        importance = 1;
        break;
      case "Regular":
        importance = 2;
        break;
      case "Trivial":
        importance = 3;
        break;
      default:
        console.log("No such priority exists!");
        break;
    }

    if (task.length > 0 && priority.length > 0) {
      setLoading(true);
      setLoader(true);
      // invoke the smart contract's create method
      await contract.create({ task, priority, importance });
      setTask("");
      setLoader(false);
      setLoading(false);
    } else {
      alert("Please provide name and urgent info you given empty");
    }
  };

  const handleSelection = (value) => {
    setPriority(value);
  };

  const handleInputChange = (value) => {
    var regEx = /^[a-zA-Z0-9 ]*$/;
    if (!value.match(regEx)) {
      alert("Please enter letters and numbers only.");
      const clearLastValue = value.substring(0, value.length - 1);
      setTask(clearLastValue);
      return false;
    }
    setTask(value);
  };

  return (
    <>
      <h4>Create New Job</h4>
      <div className={styles.flexRow}>
        <div className={styles.flexColumTwo}>
          <label>Job Name</label>
          <input
            value={task}
            maxLength={255}
            onChange={(e) => handleInputChange(e.target.value)}
            className={styles.inputAdd}
            type="text"
            id="jname"
            name="jname"
          ></input>
        </div>
        <Loader loader={loader}></Loader>
        <div className={styles.flexColumOne}>
          <label>Job Priority</label>
          <select
            onChange={(e) => handleSelection(e.target.value)}
            className={styles.selectPriority}
            id="standard-select"
          >
            <option disabled selected value="0">
              Choose
            </option>
            <option value="Urgent">Urgent</option>
            <option value="Regular">Regular</option>
            <option value="Trivial">Trivial</option>
          </select>
        </div>
        <div className={styles.flexColumThree}>
          <label style={{ visibility: "hidden" }}>hidden</label>
          <button onClick={handleAdd} className={styles.buttonAdd}>
            <FaPlusCircle /> Create
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateTodo;
