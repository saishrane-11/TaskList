import { useEffect, useState } from 'react'
import CreateTask from './components/CreateTask';
import ListTask from './components/ListTask';
import { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {

  const [tasks, setTasks] = useState([]);

  //sets the task that are already added in task list
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, [])



  return (
    <DndProvider backend={HTML5Backend}>
      <div className='container'>
        <p style={{fontSize:"80px"}}>Task Board</p>
      <div className="box">

    
        <div className="innerContainer">

          <Toaster />
          <CreateTask tasks={tasks} setTasks={setTasks} />

        </div>
        <ListTask tasks={tasks} setTasks={setTasks} />
        </div>
      </div>

    </DndProvider>
  )
}

export default App
