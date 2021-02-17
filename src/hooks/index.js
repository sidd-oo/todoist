import moment from 'moment';
import {useState, useEffect} from 'react';
import {firebase} from '../firebase';
import { collatedTasksExist} from './helpers/index'
// import moment from 'moment';

export const useTask = (selectedProject)=>{
    const [tasks, setTasks] = useState([]);
    const [archievedTasks, setArchievedTasks] = useState([]);

    useEffect(() => {
        let unsubscribe = firebase
            .firestore()
            .collection('tasks')
            .where('userId', '==',"jh342jhg7632t763xtb5");

        //On each condition go get the particular task
        if(selectedProject && !collatedTasksExist(selectedProject)){
            unsubscribe = unsubscribe.where('project', '==', selectedProject)
        }else{
            if(selectedProject === 'TODAY'){
                unsubscribe = unsubscribe.where('date','==',moment().format('DD/MM/YYYY'))
            }else{
                if(selectedProject === 'INBOX' || selectedProject === 0){
                    unsubscribe = unsubscribe.where('date','==','')
                }else{
                    unsubscribe;
                }
            }
        }
    
        unsubscribe = unsubscribe.onSnapShot(onSnapShot => {
            const newTasks = snapshot.docs.map(task=>({
                id: task.id,
                ...task.data(),
            }));
        })

        setTasks(
            selectedProject === 'NEXT_7' ? newTasks.filter(
                task => moment(task.data, 'DD-MM-YYYY').diff(moment(),'days') <= 7 && task.archieved != true
            ) : newTasks.filter(task => task.archieved !== true)
        );

        setArchivedTasks(newTasks.filter(task => task.archieved !== false));

        return ()=>{
            unsubscribe();
        }
       
    }, [selectedProject])

    return {tasks, archievedTasks};
} 


    

