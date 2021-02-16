import {collatedTasks} from '../constants'

export const collatedTasksExit = selectedProject => {
    collatedTasksExit.find(task => task.key === selectedProject);
}