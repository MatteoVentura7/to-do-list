import { useState } from 'react'

export default function List({tasks, }) {

     const [editId, setEditId] = useState(null);
     const [editText, setEditText] = useState('');


     const handleDelete = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

     const handleEdit = (id, text) => {
        onEdit(id);
        onEditText(text);
    };

       const handleEditSave = (id) => {
        onEdit(tasks.map(task => task.id === id ? {  text: editText } : task));
        onEdit(null);
        onEditText('');
    };

     const handleCheck = (id) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task));
    };

    return (
        <div>
                <section>
                    <h2>To Do</h2>
                    <ul className='mb-2'>
                        {tasks.map(task => (
                            <li key={task.id} className='mb-2 flex items-center'>
                                <input
                                    type='checkbox'
                                    checked={task.done}
                                    onChange={() => handleCheck(task.id)}
                                    className='mr-2'
                                />
                                {editId === task.id ? (
                                    <>
                                        <input
                                            className='border-2 p-1 mr-2'
                                            value={editText}
                                            onChange={e => setEditText(e.target.value)}
                                        />
                                        <button className='caret-amber-200 border-2 p-1 mr-2' onClick={() => handleEditSave(task.id)}>
                                            Salva
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        { <span className={'mr-2' + (task.done ? ' line-through text-gray-400' : '')}>{task.text}</span> }
                                        <button className='caret-amber-200 p-1 mr-2 border-2 cursor-pointer' onClick={() => handleDelete(task.id)}>
                                            Elimina
                                        </button>
                                        <button className='caret-amber-200 border-2 p-1' onClick={() => handleEdit(task.id, task.text)}>
                                            Modifica attività
                                        </button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
    )
}