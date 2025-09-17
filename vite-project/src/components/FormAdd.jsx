import { useState } from 'react'
import Button from './button';

export default function FormAdd({onAdd, tasks}) {


    const handleAdd = async () => {
        if (typeof input !== 'string' || input.trim() === '') return;
        try {
            const response = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ texts: input, completed: false }),
            });
            if (!response.ok) throw new Error('Errore nella creazione task');
            const newTask = await response.json();
            onAdd([...tasks, newTask]);
            setInput('');
        } catch (error) {
            console.error('Errore:', error);
        }
    };

    const [input, setInput] = useState('');

        
        
    return (
           <div className='flex justify-center pt-5'>
                <input
                    className='border-2 p-1 mr-2'
                    type='text'
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder='Nuova attività'
                />
            <Button onClick={handleAdd}>Aggiungi attività</Button> 
                
            </div>
    )
    } 
        