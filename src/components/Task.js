import React from "react";
import { FaCheckDouble, FaEdit, FaRegTrashAlt } from "react-icons/fa";

const Task = ({
  task,
  index,
  deleteTask,
  getSingleTask,
  setComplete,
  setNotComplete,
}) => {
  return (
    <div className={task.completed ? "task completed" : "task"}>
      <p>
        <b>{index + 1}. </b>
        {task.task}
      </p>
      <div className="task-icons">
        
          {task.completed && <FaCheckDouble color="red" onClick={() => setNotComplete(task)} />}
        
          <FaCheckDouble color="green" onClick={() => setComplete(task)} />
      

        <FaEdit color="purple" onClick={() => getSingleTask(task)} />
        <FaRegTrashAlt color="red" onClick={() => deleteTask(task._id)} />
      </div>
    </div>
  );
};

export default Task;
