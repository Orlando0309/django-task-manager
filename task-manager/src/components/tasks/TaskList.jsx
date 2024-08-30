import Task from "./Task";
import Modal from "../Modal/Modal";
import NewTask from "./NewTask";
import { useTask } from "../TaskContext/useTask";
import { Pagination } from "../Pagination/Pagination";
import { useEffect, useState } from "react";
import Nodata from "../NoData/Nodata";

const TaskList = () => {
    const [filter, setFilter] = useState(undefined);
    const [once,setOnce]=useState(undefined);
    const { statesList, tasks, limit, count, getTasks } = useTask(filter)
    useEffect(()=>{
        if(!once){
            getTasks(0)
            setOnce(true)
        }
    },[getTasks, once])
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-6xl font-extrabold text-foreground mb-8 text-center">Task Manager</h1>
            <Modal btnClassName="bg-primary text-primary-foreground hover:bg-primary/80 p-4 rounded-full mb-6 transition-all duration-200 shadow-lg transform hover:scale-110">
                <Modal.Label>Create Task</Modal.Label>
                <Modal.Body>
                    <NewTask />
                </Modal.Body>
            </Modal>
            <div className="mb-6">
                <label htmlFor="task-filter" className="block text-muted-foreground mb-2">Filter by Status:</label>
                <div className="relative">
                    <select onChange={(e) => setFilter(e.target.value)} id="task-filter" className="bg-input text-foreground border border-border rounded-md p-2 shadow-md hover:shadow-lg transition-shadow duration-200 focus:outline-none focus:ring focus:ring-ring focus:border-primary">
                        <option value="ALL">All</option>
                        {
                            statesList?.sort((a, b) => a.level - b.level).map((i, index) => <option key={`option-filter-${index}`} value={i.abbr}>{i.label}</option>)
                        }
                    </select>
                </div>
            </div>
            {
                tasks.length > 0 ? (
                    <>
                        <div className="flex-1 mb-5">
                            <Pagination filters={filter} totalPage={Math.ceil(count / limit)} perPage={limit} onClick={getTasks} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {
                                tasks?.map((task, index) => <Task task={task} key={index} />)
                            }
                        </div></>
                ) : (<Nodata />)
            }

        </div>
    )
}

export default TaskList;