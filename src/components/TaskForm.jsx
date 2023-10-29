

function TaskForm({createTask, handleInputChange, name, isEditing, updateTask}) {
  const buttonText = name === "" && isEditing ? "Add" : "Edit";

  return (
    <form className="task-form" onSubmit={isEditing ? updateTask : createTask}>
      <input
        type="text"
        placeholder="Please add a Task"
        name="name"
        value={name}
        onChange={handleInputChange}
      />
      <button type="submit">{buttonText}</button>
    </form>
  );
}

export default TaskForm;
  