import { useState } from 'react';
import { useTasksContext } from '../hooks/useTasksContext';
import { useAuthContext } from '../hooks/useAuthContext';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const [error, setError] = useState(null);
    const { dispatch } = useTasksContext();
    const { user } = useAuthContext();
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            setError('You must be logged in');
            return;
        }

        const task = { title, description, priority };
        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if(response.ok) {
            setTitle('');
            setDescription('');
            setPriority('medium');
            setError(null);
            setEmptyFields([]);
            dispatch({ type: 'CREATE_TASK', payload: json });
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add New Task</h3>
            
            <label>Task Title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
                placeholder="Enter task title"
            />
            
            <label>Description:</label>
            <textarea 
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
                placeholder="Enter task description"
                rows="4"
            />
            
            <label>Priority:</label>
            <select 
                onChange={(e) => setPriority(e.target.value)}
                value={priority}
                className={emptyFields.includes('priority') ? 'error' : ''}
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            
            <button type="submit">Add Task</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default TaskForm;
