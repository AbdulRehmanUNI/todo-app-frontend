import { toast } from "react-toastify";
import Task from "./Task"
import TaskForm from "./TaskForm"
import { useState } from "react"
import axios  from "axios";
import {URL} from "../App"
import { useEffect } from "react";
import loadingImg from "../assets/loader.gif"

function TaskList() {
    const [tasks,setTasks]=useState([]);
    const [completedTasks,setCompletedTasks]=useState([]);
    const [isLoading,setIsLoading]=useState(false);

    const [formData, setFormData] = useState({
        name: "",
        completed: false,
      });
      const { name } = formData;
      const [isEditing,setIsEditing]=useState(false);
      const [taskID,setTaskID]=useState(null);
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const getTasks = async () => {
        setIsLoading(true);
        try {
          const { data } = await axios.get(`${URL}/api/tasks`);
          setTasks(data);
          setIsLoading(false);
        } catch (error) {
          toast.error(error.message);
          setIsLoading(false);
        }
      };
    
      useEffect(() => {
        getTasks();
      }, []);

   const createTask = async (e) => {
    e.preventDefault();
    if(name === "") return toast.error("Input field cannot empty");
    try{
        await axios.post(`${URL}/api/tasks`, 
        formData);
        setFormData({...formData,name :""});
        toast.success("Task created successfully");
        getTasks();
      }catch(err){
        toast.error(err.message);
        console.log(err);
    }
}  

//delete
const deleteTask= async (id)=>{
  try{
    await axios.delete(`${URL}/api/tasks/${id}`)
    toast.success("Task deleted successfully"); 
    getTasks();
  }catch(err){
    toast.error(err.message);
    console.log(err);
  }
}

const getSingleTask=async (task)=>{
  setFormData({name:task.name,completed:false})
  setTaskID(task._id);
  setIsEditing(true);
}

const updateTask=async (e)=>{
  e.preventDefault();
  if(name==="") toast.error("Input field cannot empty");  
  try{
    if(name===formData.name) {
      toast.error("Task is same as previous one");
    }
    else{
      await axios.put(`${URL}/api/tasks/${taskID}`,formData);
      toast.success("Task updated successfully");
    }
    setIsEditing(false);
    setFormData({name:"",completed:false});
    // setFormData({...formData,name :""});
    getTasks();
  }catch(err){
    toast.error(err.message);
    console.log(err);
  }
}
const setToComplete=async (task)=>{
  // console.log(task);
  const newFormData={
    name:task.name,
    completed:true
  }
  try{
    await axios.put(`${URL}/api/tasks/${task._id}`,newFormData);
    toast.success("Task completed successfully");
    getTasks();
  }catch(err){
    toast.error(err.message);
    console.log(err);
  }
}

useEffect(()=>{
  const completed=tasks.filter(
    (task)=>task.completed===true
  )
  setCompletedTasks(completed);
},[tasks])



  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm name={name}
       handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
         />
      {tasks.length > 0 && (
        <div className="--flex-between --pb">
        <p>
            <b>Total Tasks:</b> {tasks.length}
        </p>
        <p>
            <b>Completed Tasks:</b>   {completedTasks.length}
        </p>
      </div>
      )}
      <hr />
      {isLoading && (
        <div className="--flex-center">
          <img src={loadingImg} alt="Loading" />
        </div>
      )}
      {!isLoading && tasks.length === 0 ? (
        <p className="--py">No task added. Please add a task</p>
      ) : (
        <>
          {tasks.map((task, index) => {
            return (
              <Task
                key={task._id}
                task={task}
                index={index}
                name={task.name}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
                setToComplete={setToComplete}
              />
            );
          })}
        </>
      )}
      
    </div>
  )
}

export default TaskList
