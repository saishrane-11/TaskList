import {  useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { MdCancel } from "react-icons/md";
import { toast } from 'react-hot-toast';

const CreateTask = ({ tasks, setTasks }) => {

    const [filteredData, setFilteredData] = useState(tasks);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [task, setTask] = useState({
        id: "",
        name: "",
        desc: "",
        assigne: "",
        team: "",
        date: new Date(),
        priority: 0,
        status: "todo"
    })

    const closeModal = () => setShowModal(false);

    const handleCloseButton = (
        <button style={{ border: "none", backgroundColor: "transparent" }} className="" onClick={closeModal}>
            <MdCancel />
        </button>
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.name.length < 3) {
            toast.error("length should be greater than 3");
            return
        }
        setTasks((prev) => {
            const newTask = [...prev, task];
            localStorage.setItem("tasks", JSON.stringify(newTask));
            return newTask;
        })
        window.location.reload();
        toast.success("Task added successfully");
        setTask({
            id: "",
            name: "",
            desc: "",
            assigne: "",
            team: "",
            date: "",
            priority: 0,
            status: "todo"
        })

    }

    const mainModal = (
        <>
            <div className="modal-wrapper">

            </div>
            <div className="modal-container">
                <form   onSubmit={handleSubmit} className="container-createTask ">
                    <div style={{backgroundColor:"white",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px",borderTopLeftRadius:"6px",borderTopRightRadius:"6px" }}>
                        <dir>ADD TASK</dir>
                        {handleCloseButton}
                    </div>
                    <input placeholder='Title' value={task.name} type="text" className='create-task-detail' onChange={(e) => {
                        console.log("test");
                        setTask({ ...task, id: uuidv4(), name: e.target.value })
                    }} id="input-task" />

                    <input placeholder='Description' className='create-task-detail' value={task.desc} type="text" onChange={(e) => {

                        setTask({ ...task, id: uuidv4(), desc: e.target.value })
                    }} id="input-task" />
                    <input className='create-task-detail' placeholder='Assigne' value={task.assigne} type="text" onChange={(e) => {

                        setTask({ ...task, id: uuidv4(), assigne: e.target.value })
                    }} id="input-task" />
                    <input className='create-task-detail' placeholder='Team' value={task.team} type="text" 
                    onChange={(e) => {
                        setTask({ ...task, id: uuidv4(), team: e.target.value })
                    }}
                     id="input-task" />
                    <br />
                    <label>
                    <p style={{marginBottom:"10px"}}>Priority:</p>
                    <select style={{marginBottom:"10px"}} className="edit-select-opt"
                       value={task.priority}
                       onChange={(e) => {
                        setTask({ ...task, id: uuidv4(), priority: e.target.value })
                    }}
                    >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>
                </label> 
                    <input  type="submit" id="add-task" value="Add Task" />
                </form>
            </div>
        </>

    );

    //Filters by Date
    function filterByDate(event) {
        let targetDate = new Date(event.target.value);
        console.log(targetDate);
        let filteredObjects = tasks.filter(obj => {

            // Extract the date from each object in the array
            let objDate = new Date(obj.date);

            // Compare the extracted date with the target date
            return objDate.toDateString() === targetDate.toDateString(); // Compare only date portion
        });
        console.log(filteredObjects);
        setTasks(filteredObjects);
    }

  

    // Function to handle input change
    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        filterData(value);
    };

    // Function to filter data by name
    const filterData = (value) => {
        const filtered = tasks.filter(item =>
            item.assigne.toLowerCase().includes(value.toLowerCase())
        );
        console.log(filtered);

        setTasks(filtered);
        setFilteredData(filtered);

        console.log(filteredData);
    };

    return (
        <div className='inner-container-div'>

            <div className='inner-container-div-box'>
                <div className='inner-container-div-box-1' >
                    <span>Filter By: </span>
                    <span className='filterBox'>
                        <input className='filterInputAssigne filter' placeholder='Assignee Name' type="text" name="" id="" value={searchTerm}
                            onChange={handleInputChange} />

                        <input className='filterInputDate filter' type="date" name="" id="" onChange={filterByDate} />
                    </span>

                </div>
                <div className='inner-container-div-box-2'>
                    <span>Sort  By:</span>
                    <input type="text" className='filterInputSort filter' name="" placeholder='Priority' readOnly id="" />
                </div>

            </div>
            <button className="model-btn addNewTsk filter" onClick={() => setShowModal(true)}>
                Add New Task
            </button>
            {showModal && mainModal}
        </div>
    )
}
export default CreateTask;