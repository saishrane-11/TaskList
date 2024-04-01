import { useDrag, useDrop } from "react-dnd";
import { useEffect, useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { toast } from 'react-hot-toast';



const Task = ({ task, tasks, setTasks }) => {


    const [setPr, setSetPr] = useState(task.priority);
    const [status, setStatus] = useState(task.status);

    //To Drag the items
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);

    //To close the Modal which is open for editing task
    const handleCloseButton1 = (
        <button style={{ border: "none", backgroundColor: "transparent" }} className="" onClick={closeModal}>
            <MdCancel />
        </button>
    );

    //Modal to Edit the Task
    const EditModal = (
        <>
            <div className="modal-wrapper">

            </div>
            <div className="modal-container edit-div" style={{ fontFamily: "sans-serif" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "white", padding: "12px", marginBottom: "14px", borderTopRightRadius: "6px", borderTopLeftRadius: "6px" }}>
                    <dir>EDIT TASK</dir>
                    {handleCloseButton1}
                </div>

                <p>Title:</p>
                <input type="text" className="edit-task-detail" name="" readOnly value={task.name} id="" />
                <br />
                <p>Desc:</p>
                <input type="text" className="edit-task-detail" name="" readOnly value={task.desc} id="" /> <br />
                <p>Team:</p>
                <input type="text" className="edit-task-detail" name="" readOnly value={task.team} id="" /> <br />
                <p>Assigne:</p>
                <input type="text" className="edit-task-detail" name="" readOnly value={task.assigne} id="" /> <br />
                <div style={{ margin: "4px" }}></div>
                <label>
                    <p>Priority:(Editable)</p>
                    <select className="edit-select-opt"
                        value={setPr}
                        onChange={e => setSetPr(e.target.value)}
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
                </label> <br />
                <label>
                    <p>Status:(Editable)</p>
                    <select className="edit-select-opt"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                    >
                        <option value="todo">todo</option>
                        <option value="inprogress">inprogress</option>
                        <option value="closed">closed</option>
                        <option value="deffered">deffered</option>
                        <option value="deployed">deployed</option>
                    </select>
                </label> <br />

                <button id="buttn" style={{ marginTop: "10px", backgroundColor: "#01055b", width: "100%", border: "1px solid #dcdcdc33", borderRadius: "10px", fontWeight: "Bolder", color: "white", cursor: "pointer", padding: "10px" }} onClick={() => editPriority(task.id, setPr, status)}>Edit
                    <p style={{ fontSize: "16px", color: "#dcdcdc94" }}>(Double click to arrange it in priority)</p>
                </button>
            </div>

        </>

    );

    //Function to Edit the priority and status of the task 
    function editPriority(id, pr, st) {
        let setPr = pr;
        let status = st;
        if (setPr == "" || setPr == null) {
            setPr = task.priority;
        }
        if (status == "" || status == null) {
            status = task.status;
        }
        localStorage.setItem("id", id);
        localStorage.setItem("setPr", setPr);
        localStorage.setItem("status", status);
        const ftask = tasks.filter(editPr);
        localStorage.setItem("tasks", JSON.stringify(ftask));
        setTasks(ftask);
        toast("Updation Successful", { icon: "👍" })
    }
    function editPr(obj) {
        const id = localStorage.getItem("id");
        if (id == null) {
            return;
        }
        if (obj.id == id) {
            const newStatus = localStorage.getItem("status");
            const newPr = localStorage.getItem("setPr");
            return (obj.priority = newPr, obj.status = newStatus);
            localStorage.setItem("id", null);
        }

        return obj;
    }

    //function to remove the task from the task list
    const handleRemove = (id) => {
        const fTasks = tasks.filter(t => t.id !== id);
        localStorage.setItem("tasks", JSON.stringify(fTasks));
        setTasks(fTasks);
        toast("Tasks removed ", { icon: "🩻" })
    }

    return <> <div ref={drag} className="task-container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ padding: "12px", fontWeight: "bold" }}>{task.name}</p>
            <p style={{ backgroundColor: "#0363d5", display: "flex", alignItems: "center", justifyContent: "center", color: "white", margin: "10px", padding: "24px", borderRadius: "4px", height: "40px", width: "40px" }} >P{task.priority}</p>
        </div>
        <hr />
        <p style={{ marginLeft: "8px", color: "rgb(115 115 115)", fontSize: "24px", padding: "4px", marginBottom: "8px", marginTop: "10px" }}>{task.desc}</p>
        <div style={{ marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ color: "black", fontSize: "x-large", padding: "4px", borderRadius: "4px", width: "auto", marginLeft: "4px" }}>@{task.assigne}</p>
            <button style={{ border: "none", marginRight: "14px" }} onClick={() => setShowModal(true)}><FaRegEdit style={{ fontSize: "26px", fontWeight: "bold" }} />
            </button>
        </div>
        <p style={{ fontSize: "x-large", textAlign: "center", marginBottom: "10px", marginLeft: "8px", color: "white", backgroundColor: "rgb(3, 99, 213)", padding: "8px", width: "156px", borderRadius: "4px" }}>{task.status}</p>
        <div style={{ margin: "8px", display: "flex", justifyContent: "space-between" }}>
            <div style={{ marginLeft: "2px", marginTop: "10px", fontSize: "18px", color: "#998484" }}>
                Date:{task.date}
            </div>

            <button style={{ justifyContent: "center", alignItems: "center", display: "flex" }} className="task-cancel-btn"
                onClick={() => handleRemove(task.id)
                }
            >
                <MdCancel style={{ fontSize: "28px", color: "red", marginRight: "1px" }} />
            </button>
        </div>
    </div>
        {showModal && EditModal}
    </>
}
export default Task;