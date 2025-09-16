import { useState } from 'react'
import Button from './button';

export default function FormAdd({onAdd, tasks}) {

       const handleAdd = () => {
        if (input.trim() === '') return;
        onAdd([...tasks, { id: Date.now(), text: input, done: false }]);
        setInput('');
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
        