import { useState, useEffect } from 'react'
import FormAdd from './components/FormAdd.jsx'
import List from './components/List.jsx'


function App() {

    const [tasks, setTasks] = useState([
        { id: Date.now(), text: 'ciao', done: false },
    ]);

    useEffect(() => {
        fetch('http://localhost:3000/tasks')
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error('Errore:', error));
    }, []);

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
