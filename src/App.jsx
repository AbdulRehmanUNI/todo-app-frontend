import TaskList from "./components/TaskList"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
 export const URL="https://todo-app-fnlc-api.onrender.com"; 
function App() {
  return (
    <div className="app">
      <div className="task-container">
        <TaskList />
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
