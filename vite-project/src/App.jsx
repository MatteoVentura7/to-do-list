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
            onAdd={setTasks} 
            tasks={tasks}
            />

        </>
    );
}

export default App
