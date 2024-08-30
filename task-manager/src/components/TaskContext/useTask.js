import { useContext, useEffect, useState } from 'react';
import { TaskContext } from './TaskContext';

export const useTask = (filter) => {
    const { deleteTask, updateTask, statesList, tasks, setTasks, getTasks, count, limit, saveTasks } = useContext(TaskContext);
    const [filteredTasks, setFilteredTasks] = useState(tasks);

    useEffect(() => {
        if (filter) {
            const fetchTasks = async () => {
                await getTasks(0, filter);
            };
            fetchTasks();
        } else {
            setFilteredTasks(tasks);
        }
    }, [filter, getTasks]); // Removed `tasks` from the dependency array

    useEffect(() => {
        setFilteredTasks(tasks);
    }, [tasks]);

    return { deleteTask, updateTask, statesList, saveTasks, getTasks, count, limit, tasks: filteredTasks, setTasks };
};
