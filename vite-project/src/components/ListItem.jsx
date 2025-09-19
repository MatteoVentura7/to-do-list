import Button from "./button";

export default function ListItem({
  onEdit,
  editId,
  onEditText,
  editText,
  tasks,
  task,
  onSave,
  onDelete,
  onCheck,
}) {
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Errore nella cancellazione task");
      onDelete(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Errore:", error);
    }
  };

  const handleEdit = (id, texts) => {
    onEdit(id);
    onEditText(texts);
  };

  const handleEditSave = async (id) => {
    if (!id) {
      console.error("ID is undefined. Cannot update task.");
      return;
    }

    try {
      console.log("Updating task with ID:", id);

      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, texts: editText } : task
      );
      onSave(updatedTasks);
      onEdit(null);
      onEditText("");

      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ texts: editText }),
      });
      if (!response.ok) throw new Error("Errore nella modifica task");

      const updatedTask = await response.json();
      onSave(updatedTasks.map((task) => (task.id === id ? updatedTask : task)));
    } catch (error) {
      console.error("Errore:", error);
    }
  };

  const handleCheck = async (id) => {
    const currentTask = tasks.find((task) => task.id === id);
    if (!currentTask) return;
    try {
      const response = await fetch(
        `http://localhost:3000/tasks/${id}/completed`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: !currentTask.completed }),
        }
      );
      if (!response.ok) throw new Error("Errore nel check task");
      const updatedTask = await response.json();
      onCheck(tasks.map((task) => (task.id === id ? updatedTask : task)));
    } catch (error) {
      console.error("Errore:", error);
    }
  };

  return (
    <li className="mb-2 flex items-center">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => handleCheck(task.id)}
        className="mr-2"
      />
      {editId === task.id ? (
        <>
          <input
            className="border-2 p-1 mr-2"
            value={editText}
            onChange={(e) => onEditText(e.target.value)}
          />
          <Button onClick={() => handleEditSave(task.id)}>Salva</Button>
        </>
      ) : (
        <>
          <span
            className={
              "mr-2" + (task.completed ? " line-through text-gray-400" : "")
            }
          >
            {task.texts}
          </span>
          <Button onClick={() => handleDelete(task.id)}>Elimina</Button>
          <Button onClick={() => handleEdit(task.id, task.texts)}>
            Modifica attività
          </Button>
        </>
      )}
    </li>
  );
}
