import moment from "moment";
import { formDataToObject } from "../../utils";
import { useTask } from "../TaskContext/useTask"
import PropTypes from 'prop-types';

const NewTask = ({defaultTask}) => {
  const { saveTasks, updateTask } = useTask(undefined);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = formDataToObject(formdata, true);
    if (defaultTask) {
      //console.log(data);
      await updateTask(defaultTask.id, data)
    } else {
      data["taskState"] = "PENDING";
      await saveTasks(data);
    }
  }
  //console.log(defaultTask)
  return (

    <div className="max-w-md mx-auto bg-card shadow-lg rounded-lg overflow-hidden mt-8 p-6">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-primary">✨ {defaultTask ? "Update Task" : "Create New Task"} ✨</h2>
        <p className="text-muted-foreground">Let&apos;s get things done!</p>
      </div>
      <form onSubmit={handleSubmit} id="taskForm" className="mt-4">
        <div className="mb-4">
          <label htmlFor="taskTitle" className="block text-sm font-medium text-foreground">Task Title</label>
          <input
            type="text"
            id="taskTitle"
            name="title"
            defaultValue={defaultTask?.title}
            required
            className="mt-1 block w-full border border-border rounded-lg p-2 bg-input text-foreground placeholder:text-muted-foreground focus:ring focus:ring-ring transition duration-300 hover:bg-accent"
            placeholder="Enter task title"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="taskDescription" className="block text-sm font-medium text-foreground">Description</label>
          <textarea
            id="taskDescription"
            name="description"
            className="mt-1 block w-full border border-border rounded-lg p-2 bg-input text-foreground placeholder:text-muted-foreground focus:ring focus:ring-ring transition duration-300 hover:bg-accent"
            placeholder="Enter task description"
            defaultValue={defaultTask?.description}
          >
          </textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-sm font-medium text-foreground">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            defaultValue={defaultTask?moment(defaultTask?.dueDate).format('YYYY-MM-DD'):""}
            className="mt-1 block w-full border border-border rounded-lg p-2 bg-input text-foreground placeholder:text-muted-foreground focus:ring focus:ring-ring transition duration-300 hover:bg-accent"
          />
        </div>
        <button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/80 p-2 rounded-lg w-full transition duration-300 transform hover:scale-105 shadow-lg">{defaultTask ? "Update Task" : "Create Task"}</button>
      </form>
    </div>
  )
}
NewTask.propTypes = {
  defaultTask: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    dueDate: PropTypes.string,
  }),
}
export default NewTask