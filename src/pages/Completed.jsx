import React, { useState, useEffect } from "react";
import "../App.css";
import iphone from "../iphonetransparent.png";
import taskmatetitle from "../taskmatenewtitle2.png";
import { useNavigate } from "react-router-dom";
import returnicon from "../returnicon.png";

function Todo() {
  const [openedTask, setOpenedTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [completeTasks, setCompleteTasks] = useState([]);

  const navigate = useNavigate();

  const returnClick = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    const existingTasks = JSON.parse(localStorage.getItem("task")) || [];
    setTasks(existingTasks);
    console.log(existingTasks);
  }, []);

  const descriptionClick = (index) => {
    setOpenedTask(!openedTask);
  };

  const formatDate = (taskDateTime) => {
    const dateObject = new Date(taskDateTime);

    const options = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    return dateObject.toLocaleString(undefined, options);
  };

  useEffect(() => {
    const getCompleteTasks = JSON.parse(localStorage.getItem("complete")) || [];
    setCompleteTasks(getCompleteTasks);
  }, []);

  const deleteTask = (index) => {
    const tasks = JSON.parse(localStorage.getItem("complete")) || [];

    const update = tasks.filter((_, divIndex) => divIndex !== index);

    localStorage.setItem("complete", JSON.stringify(update));

    setCompleteTasks(update);
  };

  return (
    <div>
      <div className="main-body">
        <div className="iphone-centered">
          <div className="iphone-background"></div>

          <img src={taskmatetitle} alt="TaskMate title" className="title" />
          <img
            src={iphone}
            alt="Transparent iphone border"
            className="iphone-border"
          />
          <img
            src={returnicon}
            alt="Arrow facing backwards icon"
            className="return-icon"
          />
          <button className="return-button" onClick={returnClick}></button>
          <div className="scroll-div-todo">
            <div className="completed-list-title">Completed List</div>
            {completeTasks.length > 0 ? (
              completeTasks.map((task, index) => (
                <div key={index} className="todo-list-task-wrapper">
                  {openedTask ? (
                    <div>
                      <div className="grey-screen-description"></div>
                      <div className="info-box">
                        <div className="info-box-title">{task.title}</div>
                        <div className="info-box-due-date">
                          {formatDate(task.due)}
                        </div>
                        <div className="info-box-description">
                          {task.description}
                        </div>
                        <img
                          src={returnicon}
                          alt="Arrow facing backwards icon"
                          className="return-icon return-icon-in-info"
                          onClick={descriptionClick}
                        />
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <div
                    className="x-button-in-todo"
                    onClick={() => deleteTask(index)}
                  >
                    x
                  </div>
                  <div className="task-title-in-todo">{task.title}</div>
                  <button
                    className="details-in-todo"
                    onClick={descriptionClick}
                  >
                    Details
                  </button>
                </div>
              ))
            ) : (
              <p>Nothing here yet!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
