import { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { secureAxiosInstance } from '../../axiosConfig';
import qs from 'qs'
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [statesList, setStatesList] = useState([]);
    const [limit] = useState(6);
    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(0);

    const getTasks= useCallback(async (offset,state)=>{
        let key={
            offset,
            limit
        }
        if(state && state!=="ALL"){
            key["taskState"]=state;
        }
        const task=await secureAxiosInstance.get(`/task/?${qs.stringify(key)}`);
        if(task.status === 200){
            setTasks(task.data.results);
            setOffset(offset)
            setCount(task.data.count)
        }
    },[limit])

    const getStates=useCallback(async ()=>{
        let key={
            limit:100
        }
        const task=await secureAxiosInstance.get(`/taskstate/?${qs.stringify(key)}`);
        if(task.status === 200){
            setStatesList(task.data.results);
        }
    },[])

    const saveTasks= useCallback(async (data)=>{
        const savedTask=await secureAxiosInstance.post('/task/',data);
        if(savedTask.status === 201){
            if(offset ===0){
                getTasks()
            }
        }
},[getTasks, offset])
    const updateTask= useCallback(async (id,data)=>{
        const updatedTask=await secureAxiosInstance.put(`/task/${id}/`,data);
        if(updatedTask.status === 200){
                const index=tasks.findIndex(o=> o.id === updatedTask.data.id);
                if(index !== -1){
                    const temp=[...tasks]
                    temp[index] = updatedTask.data
                    setTasks(temp)
                }
        }
    },[tasks])
    const deleteTask= useCallback(async (id)=>{
        const deletedTask=await secureAxiosInstance.delete(`/task/${id}/`);
        if(deletedTask.status === 204){
                const index=tasks.findIndex(o=> o.id === id);
                if(index !== -1){
                    getTasks()
                 
                }
        }
    },[tasks])


    // useEffect( () => {
    //      getTasks(offset);
    // }, [getTasks, offset]);

    useEffect(()=>{
        if(statesList.length==0){
            getStates()
        }
    },[getStates, statesList])

    return (
        <TaskContext.Provider value={{deleteTask,updateTask,statesList,saveTasks, tasks,getTasks, setTasks,count,limit,offset }}>
            {children}
        </TaskContext.Provider>
    );
};

TaskProvider.propTypes = {
    children: PropTypes.node.isRequired,  // Ensures that the children passed to the provider are a valid React node
};

