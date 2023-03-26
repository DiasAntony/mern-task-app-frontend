import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Task from "./Task";
import TaskForm from "./TaskForm";
import axios from "axios";
import loadingImg from "../assets/loader.gif";
// import { Toast } from "react-toastify/dist/components";


const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState("");

  const [formData, setFormData] = useState({
    task: "",
    completed: false,
  });

  const { task, completed } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (task === "") {
      return toast.error("Input Field Cannot Be Empty ");
    }
    try {
      await axios.post("/api/tasks", formData);
      getTasks();

      setFormData({ ...formData, task: "" });
      toast.success("Task Added Successfully!!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getTasks = async () => {
    setIsloading(true);
    try {
      const { data } = await axios.get("/api/tasks");
      console.log(data);
      setTasks(data);
      setIsloading(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setIsloading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // if we touch edit button on any task the task will be added on the input

  // task.task==> db task and .task is a actual task name
  const getSingleTask = async (task) => {
    setFormData({ task: task.task, completed: false });
    setTaskId(task._id);
    setIsEditing(true);
  };

  const cancelSingleTask = () => {
    setFormData({ task: "" });
    setIsEditing(false);
  };

  // update task
  const updateTask = async (e) => {
    e.preventDefault();
    if (task === "") {
      return toast.error("Input field can't be empty!!");
    }
    try {
      // this task id from edit task id from useState  (setTaskId(task._id))

      await axios.put(`/api/tasks/${taskId}`, formData);
      toast.success("Task Edited successfully!!");
      setFormData({ ...formData, task: "" });
      setIsEditing(false);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const setComplete = async (task) => {
    const newFormData = {
      task: task.task,
      completed: true,
    };
    try {
      await axios.put(`/api/tasks/${task._id}`, newFormData);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };
  const setNotComplete = async (task) => {
    const newFormData = {
      task: task.task,
      completed: false,
    };
    try {
      await axios.put(`/api/tasks/${task._id}`, newFormData);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const cTask = tasks.filter((task) => {
      return task.completed === true;
    });
    setCompletedTasks(cTask)
  }, [tasks]);

  return (
    <div>
      <h2>Task Maganger</h2>
      <TaskForm
        task={task}
        handleChange={handleChange}
        submitHandler={submitHandler}
        isEditing={isEditing}
        updateTask={updateTask}
        cancelSingleTask={cancelSingleTask}
      />
      {tasks.length > 0 && (
        <div className="--flex-between --pb">
          <p>
            <b>Total Task:</b> {tasks.length}
          </p>
          <p>
            <b>Completed Task:</b> {completedTasks.length}
          </p>
        </div>
      )}

      <hr />
      {isLoading && (
        <div className="--flex-center">
          <img src={loadingImg} alt="loading" />
        </div>
      )}
      {!isLoading && tasks.length === 0 ? (
        <p className="--py">No Task added..Please Add a Task</p>
      ) : (
        <>
          {tasks.map((task, index) => {
            return (
              <Task
                key={task._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
                isEditing={isEditing}
                setComplete={setComplete}
                setNotComplete={setNotComplete}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default TaskList;
