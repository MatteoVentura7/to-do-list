import ListItem from "./ListItem";
import { useState } from "react";

export default function List({ tasks, onDelete, onCheck, onSave }) {
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  return (
    <div>
      <section>
        <h2>To Do</h2>
        <ul className="mb-2">
          {tasks.map((task) => (
            <ListItem
              key={task.id} 
              task={task}
              onDelete={onDelete}
              onCheck={onCheck}
              onSave={onSave}
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
