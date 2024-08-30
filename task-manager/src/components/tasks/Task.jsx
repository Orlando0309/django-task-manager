import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { stateColors } from '../../constant';
import moment from 'moment';
import { useTask } from '../TaskContext/useTask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import NewTask from './NewTask';


const Tag = ({
    state = "PENDING"
}) => {
    const getBackGround = (state) => {
        return stateColors[state] || "bg-gray-500";  // Default to gray if the state is not found
    };

    return (

        <span className={`inline-block ${getBackGround(state)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>{state.toUpperCase()}</span>
    )
}
const Task = ({
    task = {
        id: 0,
        title: "Task title",
        description: "Description",
        dueDate: "No due date",
        taskState: "ONGOING"
    }
}) => {
    const [background, setBackGround] = useState("bg-green");
    const [nextStep, setNextStep] = useState(undefined);
    const [prevStep, setPrevStep] = useState(undefined);
    const [update, setUpdate] = useState(false);
    const { statesList, updateTask, deleteTask } = useTask(undefined)

    const next = useCallback(() => {
        if (statesList?.length > 0) {
            const currentState = statesList.filter(s => s.abbr === task.taskState);
            if (currentState.length > 0) {
                const next = statesList.filter(s => currentState[0].level + 1 === s.level)
                //console.log(next)
                if (next.length > 0) {
                    setNextStep(next[0])
                }
            }
        }
    }, [statesList, task.taskState])
    const prev = useCallback(() => {
        if (statesList?.length > 0) {
            const currentState = statesList.filter(s => s.abbr === task.taskState);
            if (currentState.length > 0) {
                const prev = statesList.filter(s => currentState[0].level - 1 === s.level)
                //console.log(prev)
                if (prev.length > 0) {
                    setPrevStep(prev[0])
                }
            }
        }
    }, [statesList, task.taskState])
    const getBackGrounds = useCallback((state) => {
        switch (state) {
            case "ONGOING":
                return "bg-green";
            case "PENDING":
                return "bg-yellow";
            case "DONE":
                return "bg-blue";
            default:
                return "bg-green"; // Default to green if no match
        }
    }, []);
    useEffect(() => {
        next()
        prev()
        setBackGround(getBackGrounds(task.taskState));
    }, [getBackGrounds, next, prev, task.taskState]);

    const updateState = useCallback((state) => {
        const data = {
            taskState: state,
            title: task.title
        }
        updateTask(task.id, data)
    }, [task.id, task.title, updateTask])

    const onClose = useCallback(() => {
        if (task.id) {
            deleteTask(task.id)
        }
    }, [deleteTask, task.id])
    return (
        <div className={`${background}-200 p-6 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl border-l-4 border-${background}-100 relative overflow-hidden`}>
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
                &times;
            </button>
            <h2 className="text-4xl font-bold text-foreground mb-2">
                {task.title}
            </h2>

            <FontAwesomeIcon
                icon={faPenToSquare}
                className="ml-2 text-lg transition-transform duration-200 ease-in-out transform hover:scale-125"
                style={{ color: '#4A5568' }}  // Initial color
                onClick={() => setUpdate(!update)}
                onMouseEnter={(e) => e.currentTarget.style.color = '#2B6CB0'}  // Hover color
                onMouseLeave={(e) => e.currentTarget.style.color = '#4A5568'} />

            {
                update ? (
                    <NewTask defaultTask={task} />
                ) : (
                    <>
                        <p className="text-muted-foreground mb-4">{task.description}</p>
                        <Tag state={task.taskState} />
                        <p className="text-muted-foreground mb-4">Due Date: <span className="font-semibold">{moment(task.dueDate).format("YYYY/MM/DD")}</span></p>
                        <div className="mt-4 flex space-x-3">

                            {
                                nextStep && nextStep.abbr !== task.taskState && <button onClick={() => updateState(nextStep.abbr)} className={`${stateColors[nextStep.abbr] || 'bg-green-300'} text-white hover:bg-blue-500 p-2 rounded-lg transition-all duration-200`}>Mark as {nextStep.label}</button>

                            }
                            {
                                prevStep && prevStep.abbr !== task.taskState && <button onClick={() => updateState(prevStep.abbr)} className="bg-red-600 text-white hover:bg-red-500 p-2 rounded-lg transition-all duration-200">Mark as {prevStep.label}</button>

                            }
                        </div>
                    </>)
            }
        </div>
    );
};

Task.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        dueDate: PropTypes.string,
        taskState: PropTypes.string,
    }),
};

Tag.propTypes = {
    state: PropTypes.string
}
export default Task;
