import { useEffect, useState } from 'react'
import Navbar from './Component/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    let t = todos.filter(item => item.id === id);
    setTodo(t[0].todo);
    setStartTime(t[0].startTime); // Set the start time for editing
    setEndTime(t[0].endTime); // Set the end time for editing
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, startTime, endTime, isCompleted: false }]);
    setTodo("");
    setStartTime(""); // Reset the start time input
    setEndTime(""); // Reset the end time input
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-gray-100 min-h-[80vh] flex flex-col items-center">
        <div className="addTodo text-center">
          <h1 className='text-lg font-bold my-5 text-gray-800'>Add a Todo</h1>
          <div className="flex flex-col items-center">
            <input onChange={handleChange} value={todo} type="text" className="w-80 mb-2 p-2 border border-gray-300 rounded" placeholder="Enter todo" />
            <div className="flex">
              <input onChange={handleStartTimeChange} value={startTime} type="time" className="w-40 mb-2 p-2 border border-gray-300 rounded" placeholder="Start time" />
              <input onChange={handleEndTimeChange} value={endTime} type="time" className="w-40 mb-2 ml-4 p-2 border border-gray-300 rounded" placeholder="End time" />
            </div>
            <button onClick={handleAdd} className="bg-teal-600 hover:bg-teal-700 p-2 font-bold py-1 text-white rounded-md text-sm mt-2">Add</button>
          </div>
        </div>

        <h1 className="text-xl font-bold mt-5 text-gray-800">Your Todos</h1>
        <div className="todos text-center w-full max-w-md mx-auto">
          {todos.length === 0 ? <div className="m-5 text-gray-500">No todo to Display</div> : ""}
          {todos.map(item => {
            return (
              <div key={item.id} className="todo flex justify-between items-center mb-4 bg-white p-4 rounded shadow-md">
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through mx-2 text-gray-500" : "mx-2 text-gray-800"}>
                  {item.todo} from {item.startTime} to {item.endTime}
                </div>
                <div className="button flex">
                  <button onClick={(e) => handleEdit(e, item.id)} className="bg-teal-600 hover:bg-teal-700 p-2 font-bold py-1 text-white rounded-md mx-1 text-sm">Edit</button>
                  <button onClick={(e) => handleDelete(e, item.id)} className="bg-red-600 hover:bg-red-700 p-2 font-bold py-1 text-white rounded-md mx-1 text-sm">Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;