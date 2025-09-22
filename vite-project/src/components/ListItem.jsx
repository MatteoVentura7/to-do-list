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
  // Funzione per gestire l'eliminazione di un'attività
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Errore nella cancellazione task");
      // Aggiorna la lista delle attività dopo l'eliminazione
      onDelete(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Errore:", error);
    }
  };

  // Funzione per gestire la modifica di un'attività
  const handleEdit = (id, texts) => {
    onEdit(id); // Imposta l'ID dell'attività in modifica
    onEditText(texts); // Imposta il testo dell'attività in modifica
  };

  // Funzione per salvare l'attività modificata
  const handleEditSave = async (id) => {
    if (!id) {
      console.error("ID non definito. Impossibile aggiornare l'attività.");
      console.log("Valore di id:", id); // Log per diagnosticare il problema
      return;
    }

    console.log("Valore di id passato a handleEditSave:", id); // Log per diagnosticare il problema

    try {
      console.log("Aggiornamento dell'attività con ID:", id);

      // Aggiorna localmente la lista delle attività
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, texts: editText } : task
      );
      onSave(updatedTasks);
      onEdit(null); // Resetta lo stato di modifica
      onEditText(""); // Resetta il testo modificato

      // Invia l'attività aggiornata al server
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ texts: editText }),
      });
      if (!response.ok) throw new Error("Errore nella modifica task");

      const updatedTask = await response.json();
      // Aggiorna la lista delle attività con la risposta del server
      onSave(updatedTasks.map((task) => (task.id === id ? updatedTask : task)));
    } catch (error) {
      console.error("Errore:", error);
    }
  };

  // Funzione per alternare lo stato di completamento di un'attività
  const handleCheck = async (id) => {
    const currentTask = tasks.find((task) => task.id === id);
    if (!currentTask) return;
    try {
      const updatedCompletedStatus = !currentTask.completed; // Alterna lo stato di completamento
      const response = await fetch(
        `http://localhost:3000/tasks/${id}/completed`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: updatedCompletedStatus }),
        }
      );
      if (!response.ok) throw new Error("Errore nel check task");
      const updatedTask = await response.json();

      // Aggiorna la lista delle attività con il nuovo stato di completamento
      onCheck(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: updatedCompletedStatus } : task
        )
      );
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
