import { useEffect, useState } from 'react'
import Navbar from './Component/Navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])


useEffect(()=>{
  let todoString =localStorage.getItem("todos")
  if(todoString){
    let todos=JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
  }
},[])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))

  }


  const handleEdit = (e, id) => {
    let t = todos.filter(item => item.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id != id
    })
    setTodos(newTodos)
    saveToLS()

  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id != id
    })
    setTodos(newTodos)
    saveToLS()


  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()


  }
  const handleChange = (e) => {
    setTodo(e.target.value)

  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    console.log(`the id is${id}`)
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    console.log(index)
    let newTodos = [...todos];
    setTodos(newTodos)
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    saveToLS()


  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <div className="addTodo">
          <h1 className='text-lg font-bold my-5'>Add a Todo</h1>
          <input onChange={handleChange} value={todo} type="text" className="w-80" />
          <button onClick={handleAdd} className="bg-violet-800 hover:bg-violet-950 p-2 font-bold py-1 text-white rounded-md mx-6 text-sm ">Add
          </button>
        </div>

        <h1 className="text-xl font-bold">Your Todos</h1>
        <div className="todos">
          {todos.length === 0 ? <div className="m-5">No todo to Display</div> : ""}
          {todos.map(item => {


            return <div key={item.id} className="todo flex w-1/3 justify-between mb-4 ">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" value={item.isCompleted} id="" />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              <div className="button">
                <button onClick={(e) => { handleEdit(e, item.id) }} className="bg-violet-800 hover:bg-violet-950 p-2 font-bold py-1 text-white rounded-md mx-1 text-sm">Edit</button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className="bg-violet-800 hover:bg-violet-950 p-2 font-bold py-1 text-white rounded-md mx-1 text-sm">Delete</button>
              </div>

            </div>
          })}
        </div>

      </div>
    </>
  )
}

export default App
