import ListItem from "./ListItem";
import { useState } from "react";


export default function List({ tasks, onAdd }) {

     const [editId, setEditId] = useState(null);
         const [editText, setEditText] = useState('');
    

    return (
        <div>
            <section>
                <h2>To Do</h2>
                <ul className='mb-2'>
                    {tasks.map(task => (
                        <ListItem
                            key={task.id}
                            task={task}
                            onAdd={onAdd}
                            tasks={tasks}
                            onEdit={setEditId} 
                            editId={editId} 
                            onEditText={setEditText} 
                            editText={editText} 
                        />
                    ))}
                </ul>
            </section>
        </div>
    );
}