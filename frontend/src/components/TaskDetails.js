import React, { useState } from 'react';
import { useTasksContext } from '../hooks/useTasksContext';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const TaskDetails = ({ task }) => {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status
  });

  const handleDelete = async () => {
    if (!user) return;

    const response = await fetch("/api/tasks/" + task._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json(); 
    if (response.ok) {
      dispatch({ type: 'DELETE_TASK', payload: json });
    }
  }

  const handleMarkComplete = async () => {
    if (!user) return;

    const response = await fetch("/api/tasks/" + task._id + "/complete", {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'UPDATE_TASK', payload: json });
    }
  }

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status
    });
  }

  const handleSaveEdit = async () => {
    if (!user) return;

    const response = await fetch("/api/tasks/" + task._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(editedTask)
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'UPDATE_TASK', payload: json });
      setIsEditing(false);
    }
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'low': return '#3498db';
      default: return '#95a5a6';
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#27ae60';
      case 'in-progress': return '#f39c12';
      case 'pending': return '#95a5a6';
      default: return '#95a5a6';
    }
  }

  if (isEditing) {
    return (
      <div className="task-details editing">
        <div className="edit-form">
          <label>Title:</label>
          <input 
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
          />
          
          <label>Description:</label>
          <textarea 
            value={editedTask.description}
            onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
            rows="3"
          />
          
          <label>Priority:</label>
          <select 
            value={editedTask.priority}
            onChange={(e) => setEditedTask({...editedTask, priority: e.target.value})}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          
          <label>Status:</label>
          <select 
            value={editedTask.status}
            onChange={(e) => setEditedTask({...editedTask, status: e.target.value})}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          
          <div className="edit-actions">
            <button onClick={handleSaveEdit} className="save-btn">Save</button>
            <button onClick={handleCancelEdit} className="cancel-btn">Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-details ${task.status === 'completed' ? 'completed' : ''}`}>
      <h4>{task.title}</h4>
      <p className="task-description">{task.description}</p>
      <div className="task-meta">
        <span className="priority-badge" style={{backgroundColor: getPriorityColor(task.priority)}}>
          {task.priority.toUpperCase()}
        </span>
        <span className="status-badge" style={{backgroundColor: getStatusColor(task.status)}}>
          {task.status.toUpperCase().replace('-', ' ')}
        </span>
      </div>
      <p className="task-time">{formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</p>
      <div className="task-actions">
        {task.status !== 'completed' && (
          <span className='material-symbols-outlined' onClick={handleMarkComplete} title="Mark as completed">
            check_circle
          </span>
        )}
        <span className='material-symbols-outlined' onClick={handleEdit} title="Edit task">
          edit
        </span>
        <span className='material-symbols-outlined' onClick={handleDelete} title="Delete task">
          delete
        </span>
      </div>
    </div>
  );
}

export default TaskDetails;
