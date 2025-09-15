import { useState } from 'react'



function App() {

        const [tasks, setTasks] = useState([
        { id: 1, text: 'ciao', done: false },
    ]);
    const [input, setInput] = useState('');
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');

     const handleAdd = () => {
        if (input.trim() === '') return;
        setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
        setInput('');
    };

     const handleDelete = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

     const handleEdit = (id, text) => {
        setEditId(id);
        setEditText(text);
    };

       const handleEditSave = (id) => {
        setTasks(tasks.map(task => task.id === id ? {  text: editText } : task));
        setEditId(null);
        setEditText('');
    };

     const handleCheck = (id) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task));
    };


    return (
        <>
            <div className='flex justify-center pt-5'>
                <input
                    className='border-2 p-1 mr-2'
                    type='text'
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder='Nuova attività'
                />
                <button className='caret-amber-200 p-1 mr-2 border-2 cursor-pointer' onClick={handleAdd}>
                    Aggiungi attività
                </button>
            </div>
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
        </>
    );
}

export default App
