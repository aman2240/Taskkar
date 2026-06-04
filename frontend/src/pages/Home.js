import { useEffect, useState, useCallback } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import TaskDetails from "../components/TaskDetails";
import TaskForm from "../components/TaskForm";

const Home = () => {
    const { tasks, dispatch } = useTasksContext();
    const { user } = useAuthContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalTasks, setTotalTasks] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(searchTerm);
            setCurrentPage(1);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const fetchTasks = useCallback(async () => {
        if (!user) return;

        const response = await fetch(
            `/api/tasks?page=${currentPage}&limit=10&search=${searchQuery}`,
            {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }
        );
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'SET_TASKS', payload: json.tasks });
            setTotalPages(json.totalPages);
            setTotalTasks(json.totalTasks);
        }
    }, [dispatch, user, currentPage, searchQuery]);

    useEffect(() => {
        if (user) {
            fetchTasks();
        }
    }, [fetchTasks, user]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="home">
            <div className="tasks">
                <div className="search-container">
                    <input 
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <span className="search-info">
                        {totalTasks} {totalTasks === 1 ? 'task' : 'tasks'} found
                    </span>
                </div>

                {tasks && tasks.length > 0 ? (
                    <>
                        {tasks.map((task) => (
                            <TaskDetails key={task._id} task={task} />
                        ))}
                        
                        {totalPages > 1 && (
                            <div className="pagination">
                                <button 
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="pagination-btn"
                                >
                                    Previous
                                </button>
                                
                                <span className="pagination-info">
                                    Page {currentPage} of {totalPages}
                                </span>
                                
                                <button 
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="pagination-btn"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="no-tasks">
                        {searchTerm ? 'No tasks found matching your search.' : 'No tasks yet. Create one to get started!'}
                    </div>
                )}
            </div>
            <TaskForm />
        </div>
    );
};

export default Home;
