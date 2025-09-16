import ListItem from "./ListItem";


export default function List({ tasks, onEdit, editId, onEditText, editText, onAdd }) {
    

    return (
        <div>
            <section>
                <h2>To Do</h2>
                <ul className='mb-2'>
                    {tasks.map(task => (
                        <ListItem
                            key={task.id}
                            task={task}
                            onEdit={onEdit}
                            editId={editId}
                            onEditText={onEditText}
                            editText={editText}
                            onAdd={onAdd}
                            tasks={tasks}
                        />
                    ))}
                </ul>
            </section>
        </div>
    );
}