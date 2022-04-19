// src/components/TodoList.js
import { useEffect, useState } from "react";
import styles from "../../styles/Table.module.css";
import addTaskStyles from "../../styles/AddTask.module.css";
import { RiDeleteBin5Fill, RiEdit2Fill } from "react-icons/ri";
import CustomPopup from "../../components/Popup";

const TodoList = ({ contract, loading }) => {
  const [tasks, setTasks] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [visibilityDelete, setVisibilityDelete] = useState(false);
  const [visibilityUpdate, setVisibilityUpdate] = useState(false);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("all");
  const [importance, setImportance] = useState(0);

  useEffect(() => {
    contract.get().then((task) => setTasks(task));
  }, [contract, loading]);

  const popupCloseHandler = () => {
    setVisibility(false);
    setVisibilityDelete(false);
    setVisibilityUpdate(false);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    contract.del({ id }).then(() => {
      contract.get().then((task) => setTasks(task));
    });
    popupCloseHandler();
  };

  const handleChange = ({ id, name, priority, importance }) => {
    let task = name;

    contract
      .update({ id, updates: { task, priority, importance } })
      .then(() => {
        contract.get().then((task) => setTasks(task));
      });

    if (name.length > 0 && priority !== "all") {
      //dispatch({ type: ActionTypes.updateTask, payload: { ...updateTask } });
      popupCloseHandler();
    } else {
      alert("if you want to update it! Please provide name and urgent info...");
    }
  };

  const FilterableTaskTable = ({ tasks }) => {
    const [filterText, setFilterText] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("all");
    return (
      <div>
        <div className={styles.colorBisque}>
          <div className={styles.flexRow}>
            <SearchBar filterText={filterText} setFilterText={setFilterText} />
            <FilterSelectBox setPriorityFilter={setPriorityFilter} />
          </div>
        </div>
        <TaskTable
          tasks={tasks}
          filterText={filterText}
          priorityFilter={priorityFilter}
        />
      </div>
    );
  };

  const FilterSelectBox = ({ setPriorityFilter }) => (
    <div className={addTaskStyles.flexColumOne}>
      <select
        onChange={(e) => setPriorityFilter(e.target.value)}
        className={addTaskStyles.selectPriority}
        id="standard-select"
      >
        <option selected value="all">
          Priority(all)
        </option>
        <option value="Urgent">Urgent</option>
        <option value="Regular">Regular</option>
        <option value="Trivial">Trivial</option>
      </select>
    </div>
  );

  const SearchBar = ({ filterText, setFilterText }) => (
    <form className={addTaskStyles.flexColumTwo}>
      <input
        className={styles.taskInput}
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
    </form>
  );

  const TaskRow = ({ task }) => {
    let colorPriority = "white";

    switch (task.priority) {
      case "Urgent":
        colorPriority = "red";
        break;
      case "Regular":
        colorPriority = "rgb(229 229 20)";
        break;
      case "Trivial":
        colorPriority = "blue";
        break;
      default:
        console.log("No such priority exists!");
        break;
    }

    const priorityStyle = {
      color: colorPriority,
    };

    return (
      <tr>
        <td>{task.task}</td>
        <td>
          <span style={priorityStyle}>{task.priority}</span>
        </td>
        <td>
          <button
            onClick={() => {
              setVisibility(true);
              setId(task.id);
              setVisibilityUpdate(true);
              setPriority("all");
            }}
          >
            <RiEdit2Fill />
          </button>{" "}
          <button
            onClick={() => {
              setVisibility(true);
              setId(task.id);
              setVisibilityDelete(true);
            }}
          >
            <RiDeleteBin5Fill />
          </button>
        </td>
      </tr>
    );
  };

  const sortByUrgent = (tasks) => {
    const sortedMinToMax = [...tasks].sort(
      (a, b) => a.importance - b.importance
    );
    return sortedMinToMax;
  };

  const handlePriorityValue = (priorityVal) => {
    setPriority(priorityVal);
    let importance = 0;
    switch (priorityVal) {
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
    setImportance(importance);
  };

  const TaskTable = ({ tasks, filterText, priorityFilter }) => {
    const rows = [];
    let taskList = sortByUrgent(tasks);

    taskList.forEach((taskValues) => {
      if (
        taskValues.task.toLowerCase().indexOf(filterText.toLowerCase()) === -1
      ) {
        return;
      }
      if (
        taskValues.priority
          .toLowerCase()
          .indexOf(priorityFilter.toLowerCase()) === -1 &&
        priorityFilter !== "all"
      ) {
        return;
      }

      rows.push(<TaskRow task={taskValues} key={taskValues.id} />);
    });

    return (
      <table className={styles.taskTable}>
        <thead>
          <tr>
            <th className={styles.width60}>Name</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  };

  return (
    <>
      <h4>Job List</h4>
      <FilterableTaskTable tasks={tasks}></FilterableTaskTable>

      <CustomPopup onClose={popupCloseHandler} show={visibility}>
        {visibilityDelete && (
          <>
            <h1>Are you sure want to delete it!</h1>
            <div className={styles.flexRowPopup}>
              <button onClick={popupCloseHandler}>Cancel</button>
              <button onClick={(e) => handleDelete(e, id)}>Approve</button>
            </div>
          </>
        )}

        {visibilityUpdate && (
          <>
            <h1>Job Edit</h1>
            <div className={styles.flexColumnPopup}>
              <label>Job Name</label>
              <input
                className={styles.paddingElements}
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label>Job Priority</label>
              <select
                onChange={(e) => handlePriorityValue(e.target.value)}
                className={styles.paddingElements}
                id="standard-select"
              >
                <option disabled selected value="all">
                  Choose
                </option>
                <option value="Urgent">Urgent</option>
                <option value="Regular">Regular</option>
                <option value="Trivial">Trivial</option>
              </select>
              <div className={styles.flexRowPopup}>
                <button onClick={popupCloseHandler}>Cancel</button>
                <button
                  onClick={(e) =>
                    handleChange({ id, name, priority, importance })
                  }
                >
                  Save
                </button>
              </div>
            </div>
          </>
        )}
      </CustomPopup>
    </>
  );
};

export default TodoList;
