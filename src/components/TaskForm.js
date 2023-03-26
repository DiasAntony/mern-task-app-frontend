import React from "react";
import {TbEditOff} from 'react-icons/tb'

const TaskForm = ({ task, submitHandler, handleChange ,isEditing,updateTask,cancelSingleTask}) => {
  return (
    <form onSubmit={isEditing ? updateTask : submitHandler} className="task-form">
      <input
        type="text"
        placeholder="Add a Task"
        name="task"
        value={task}
        onChange={handleChange}
      />
      <button type="submit">{isEditing ?"Edit":"Add"}</button>
     {isEditing && <TbEditOff color='blue' size={30} onClick={cancelSingleTask} />}

    </form>
  );
};

export default TaskForm;
