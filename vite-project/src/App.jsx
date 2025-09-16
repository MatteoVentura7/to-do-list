import { useState } from 'react'
import FormAdd from './components/FormAdd.jsx'
import List from './components/List.jsx'


function App() {

        const [tasks, setTasks] = useState([
        { id: Date.now(), text: 'ciao', done: false },
    ]);
    
  

    return (
        <>
            <FormAdd onAdd={setTasks} tasks={tasks}/>
            <List 
            tasks={tasks}
            onDelete={setTasks}
            onCheck={setTasks}
            onSave={setTasks}
            />

        </>
    );
}

export default App
