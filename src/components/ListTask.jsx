import { useEffect, useState } from "react";
import Section from "./Section";
import Task from "./Task";

const ListTask = ({tasks, setTasks})=>{
    const [todos, setTodos] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [closed, setClosed] = useState([]);
    const[deffered,setDeffered]=useState([]);
    const[deployed,setDeployed]=useState([]);
   
    useEffect(()=>{
        const ftodo = tasks.filter(task => task.status === "todo");
       
        const finProgress = tasks.filter(task => task.status === "inprogress");
        const fclosed = tasks.filter(task => task.status === "closed");
        const fdeployed = tasks.filter(task => task.status === "deployed");
        const fdeffered= tasks.filter(task => task.status === "deffered");
        
        //sorting is done to arrange it in proper priority
        tasks.sort((a, b) => a.priority - b.priority);

        setTodos(ftodo);
        setInProgress(finProgress);
        setClosed(fclosed);
        setDeffered(fdeffered);
        setDeployed(fdeployed);
    },[tasks,Task])

    const statuses = ["todo", "inprogress", "closed", "deffered", "deployed"];
  
    return(
        <div className="section">
            {statuses.map((status, index) => <Section key={index} status={status} tasks={tasks} setTasks={setTasks} todos={todos} inProgress={inProgress} closed={closed} deffered={deffered} deployed={deployed} />)}
        </div>
    )
}
export default ListTask;