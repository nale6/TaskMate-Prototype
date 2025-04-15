import React, { useState, useEffect } from "react";
import "../App.css";
import iphone from "../iphonetransparent.png";
import taskmatetitle from "../taskmatenewtitle2.png";
import listicon from "../listicon.png";
import completeicon from "../checkmarkicon.png";
import greencheckicon from "../greencheckmarkicon.png";
import { useNavigate } from "react-router-dom";
import questionmarkicon from "../questionmarkicon.png";
import cogicon from "../cogicon.png";
import profileicon from "../profileicon.png";

function Landing() {
  const [addTask, setAddTask] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due: "",
  });
  const [validTasks, setValidTasks] = useState([]);
  const [completeTasks, setCompleteTasks] = useState([]);
  const [profileClick, setProfileClick] = useState(false);
  const [helpClick, setHelpClick] = useState(false);
  const [settingsClick, setSettingsClick] = useState(false);

  const navigate = useNavigate();

  const helpClicked = () => {
    setHelpClick(!helpClick);
  };

  const settingsClicked = () => {
    setSettingsClick(!settingsClick);
  };

  const setAdd = () => {
    setAddTask(!addTask);
  };

  const onSubmitForm = (effect) => {
    effect.preventDefault();
    const existingTasks = JSON.parse(localStorage.getItem("task")) || [];
    const updateTasks = [...existingTasks, formData];
    localStorage.setItem("task", JSON.stringify(updateTasks));
    setAdd();
    console.log(existingTasks);
    console.log(updateTasks);
    setValidTasks(getTasks());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const todoClick = () => {
    navigate("/todo");
  };

  const completeClick = () => {
    navigate("/completed");
  };

  const loginCheck = (loggedIn) => {
    if (!loggedIn) {
      navigate("/login");
    }
  };

  useEffect(() => {
    const tasks = getTasks();
    setValidTasks(tasks);
  }, []);

  const getTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("task")) || [];

    const currentTime = new Date();

    return tasks.filter((task) => {
      const taskDateTime = new Date(`${task.due}`);
      console.log(taskDateTime, currentTime);
      return taskDateTime > currentTime;
    });
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

  const deleteTask = (index) => {
    const tasks = JSON.parse(localStorage.getItem("task")) || [];
    const completedTasks = JSON.parse(localStorage.getItem("complete")) || [];

    const updateTasks = tasks.filter((_, divIndex) => divIndex !== index);
    const completedTask = tasks[index];
    const setCompleteTasks = [...completedTasks, completedTask];

    localStorage.setItem("task", JSON.stringify(updateTasks));
    localStorage.setItem("complete", JSON.stringify(setCompleteTasks));

    setValidTasks(updateTasks);
  };

  const clickedOnProfile = () => {
    setProfileClick(!profileClick);
  };

  const logOutFunction = () => {
    navigate("/");
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
          <p className="todo-title">To Do</p>
          <img src={listicon} alt="Icon of a list" className="list-icon" />
          <button className="todo-button" onClick={todoClick}></button>
          <p className="complete-title">Completed</p>
          <img
            src={completeicon}
            alt="Icon of a checklist"
            className="complete-icon"
          />
          <img
            src={greencheckicon}
            alt="Green checkmark icon"
            className="green-checkmark-icon"
          />
          <button className="complete-button" onClick={completeClick}></button>
          <img
            src={profileicon}
            className="profile"
            onClick={clickedOnProfile}
          />
          <div className="users-name">Guest</div>
          {profileClick ? (
            <div className="logout" onClick={logOutFunction}>
              Log Out
            </div>
          ) : (
            <div />
          )}
          <img src={cogicon} className="settings" onClick={settingsClicked} />
          {settingsClick ? (
            <div>
              <div className="darken"></div>
              <div className="settings-box">
                <p className="setting-title">User Preferences</p>
                <p className="settings-text">
                  Language:{" "}
                  <select className="setting-option">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>Chinese</option>
                    <option>French</option>
                  </select>
                </p>
                <p className="settings-text">
                  Screen Mode:{" "}
                  <select className="setting-option">
                    <option>Light Mode</option>
                    <option>Dark Mode</option>
                  </select>
                </p>
                <p className="settings-text">
                  Text To Speech{" "}
                  <select className="setting-option">
                    <option>Off</option>
                    <option>On</option>
                  </select>
                </p>
                <button className="settings-confirm">Apply</button>
                <p className="settings-text">
                  User preferences is purely to showcase settings screen UI and
                  does not have functionality.
                </p>
                <div className="settings-x" onClick={settingsClicked}>
                  x
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <img src={questionmarkicon} className="help" onClick={helpClicked} />
          {helpClick ? (
            <div>
              <div className="darken"></div>
              <div className="help-box">
                <p>Welcome to TaskMate!</p>
                <p>
                  To begin, please click on 'Add a Task' to add your very first
                  task!
                </p>
                <p>
                  Any tasks that aren't past their due date will show up in
                  'Currently Working on...' in the order entered.
                </p>
                <p>
                  The To Do button shows you all your entered tasks with
                  functionality to see entered details. The Completed button
                  shows you all completed tasks and lets you delete them.
                </p>
                <p>
                  Note that the "Working On..." section will only show tasks
                  with due dates that haven't been passed yet. If you set a task
                  to be due yesterday, it won't show up.
                </p>
                <p>
                  Please note that tasks are currently stored on your browser's
                  localStorage and are not actually uploaded to a cloud or
                  anywhere else.
                </p>
                <div className="help-x" onClick={helpClicked}>
                  x
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <button className="add-task" onClick={setAdd}>
            Add Task
          </button>
          {addTask ? (
            <div>
              <div className="darken"></div>
              <div className="submit-wrapper">
                <button className="x-button" onClick={setAdd}>
                  X
                </button>
                <p className="add-task-title">Add A Task!</p>
                <form onSubmit={onSubmitForm}>
                  <div>
                    <label htmlFor="title" className="title-input">
                      Title:
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="title-input title-input-bar"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="description-input">
                      Description:
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      className="description-input description-input-bar"
                      rows="4"
                      cols="33"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="due" className="due-input">
                      Due:
                    </label>
                    <input
                      id="due"
                      name="due"
                      type="datetime-local"
                      className="due-input due-input-bar"
                      value={formData.due}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <button type="submit" className="submit-button-task">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div />
          )}
          <div className="working-on">Working on...</div>
          <div className="scroll-div">
            {validTasks.length > 0 ? (
              validTasks.map((task, index) => (
                <div key={index} className="task-in-landing-wrapper">
                  <button
                    className="x-button-in-working-tasks"
                    onClick={() => deleteTask(index)}
                  >
                    X
                  </button>
                  <p className="landing-task-title">{task.title}</p>
                  <p className="landing-task-due-date">
                    Due: {formatDate(task.due)}
                  </p>
                </div>
              ))
            ) : (
              <p>Currently free!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
