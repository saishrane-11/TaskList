import { useDrag,useDrop } from "react-dnd";
import toast from 'react-hot-toast'
import Header from './Header';

import Task from './Task';
const Section = ({ status, tasks, setTasks, todos, inProgress, closed ,deffered,deployed})=>{
    
    //Drop the Drag items
    const [{ isOver}, drop] = useDrop(() => ({
        accept: "task",
        drop:(item)=> addItemToSection(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    const  addItemToSection=(id)=>{
        setTasks((prev)=>{
            const mTask = prev.map(t=>{
                if(t.id === id){
                    return {...t, status: status}
                }
                return t;
            })
            localStorage.setItem("tasks",JSON.stringify(mTask));
            toast("Task status changed",{icon: "😀"});
            return mTask;
        })
    }
    let text = "Todo";
    let bg = "gray";
    let tasksToMap = todos;
    if (status === "inprogress") {
        text = "In Progress";
        bg = "orange";
        tasksToMap = inProgress;
    }
    if (status === "closed") {
        text = "Closed";
        bg = "green";
        tasksToMap = closed;
    }
    if (status === "deffered") {
        text = "deffered";
        bg = "#e94343";
        tasksToMap = deffered;
    }
    if (status === "deployed") {
        text = "deployed";
        bg = "#26266d";
        tasksToMap = deployed;
    }

    return(
        <div className="section-div" ref={drop} >
        <Header text={text} bg={bg} count={tasksToMap.length} />


        <div className="all-tasks">
        {tasksToMap.length > 0 && tasksToMap.map((task) => <Task key={task.id} tasks={tasks} setTasks={setTasks} task={task} />)}   
        </div>
    </div>
    )
}
export default Section;