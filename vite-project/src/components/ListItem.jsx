import Button from "./button";

export default function ListItem({ onEdit, editId, onEditText, editText, onAdd, tasks, task }) {

     const handleDelete = (id) => {
        onAdd(tasks.filter(task => task.id !== id));
    };

   
    const handleEdit = (id, text) => {
        onEdit(id);
        onEditText(text);
    };

   
    const handleEditSave = (id) => {
        onAdd(tasks.map(task => task.id === id ? { ...task, text: editText } : task));
        onEdit(null);
        onEditText('');
    };

    const handleCheck = (id) => {
        onAdd(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task));
    };

    return (
        <li className='mb-2 flex items-center'>
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
                        onChange={e => onEditText(e.target.value)}
                    />
                    <Button onClick={() => handleEditSave(task.id)}>Salva</Button> 
                </>
            ) : (
                <>
                    <span className={'mr-2' + (task.done ? ' line-through text-gray-400' : '')}>{task.text}</span>
                
                    <Button onClick={() => handleDelete(task.id)}>Elimina</Button> 
                    <Button onClick={() => handleEdit(task.id, task.text)}>Modifica attività</Button> 
                </>
            )}
        </li>
    );
}