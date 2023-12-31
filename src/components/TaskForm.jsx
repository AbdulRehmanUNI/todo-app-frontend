

function TaskForm({createTask, 
  handleInputChange, name,isEditing,updateTask}) {
    
    return (
      <form className="task-form" 
          onSubmit={isEditing ? updateTask:createTask}>
          <input type="text" 
          placeholder={isEditing ? "Please update the Task" : "Please add a Task"}
          name="name" value={name} 
          onChange={handleInputChange}
          />
          <button type="submit">{
            isEditing ? "Edit" : "Add"
    }</button>
      </form>
    )
  }
  
  export default TaskForm
  