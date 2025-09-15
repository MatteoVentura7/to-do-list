import { useState } from 'react'
import FormAdd from './components/FormAdd.jsx'
import List from './components/List.jsx'


function App() {

        const [tasks, setTasks] = useState([
        { id: 1, text: 'ciao', done: false },
    ]);
    
     const [editId, setEditId] = useState(null);
     const [editText, setEditText] = useState('');
   

  

    


    return (
        <>
            <FormAdd onAdd={setTasks} tasks={tasks}/>
            <List onEdit={setEditId} editId={editId} onEditText={setEditText} editText={editText} onAdd={setTasks} tasks={tasks}/>

        </>
    );
}

export default App
