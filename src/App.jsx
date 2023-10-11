import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import crypto from "crypto"
import "./styles.css"

export default function App() {

  // useState argument => initial state
  // useState returns an array of 2 values
  // newItem = the current state
  // setNewItem = the function to update the state
  // setNewState => must be inside return statement, else will render infinity loop
  // crypto.randomUUID() => 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed
  // setUseState functions => different betwwen passing in values and callback functions

  const [newItem, setNewItem] = useState("")
  const [toDos, setToDos] = useState([])

  function handleSubmit(e) {
    // Preventing form's default behaviour
    e.preventDefault()

    setToDos((currentToDos) => {
      return [...currentToDos, {
        id: uuidv4(),
        title: newItem,
        completed: false
      },]
    })

    // Reset the input bar to empty
    setNewItem("")
  }

  function toggleToDo(id, checked) {
    setToDos((currentToDos) => {
      return currentToDos.map((todo) => {
        if (todo.id == id) {
          // Create a new object same as todo except the completed property
          return { ...todo, completed: checked }
        }
        return todo
      })
    })
  }

  function deleteToDo(id) {
    setToDos((currentToDos) => 
      currentToDos.filter((todo) => todo.id != id)
    )
  }

  return (
    <>
      <form className="new-item-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="item" className="text-center">New Item</label>
          <input type="text" id="item" value={newItem} onChange={e => setNewItem(e.target.value)} />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">To Do List: </h1>
      <ul>
        {toDos.length === 0 && <p>List is empty</p>}
        {toDos.map((toDo) => {
          return (
            <li key={toDo.id}>
              <label>
                <input type="checkbox" checked={toDo.completed} onChange={e => toggleToDo(toDo.id, e.target.checked)} />
                {toDo.title}
              </label>
              <button onClick={() => deleteToDo(toDo.id)} className="btn btn-danger">Delete</button>
            </li>
          )
        })}
      </ul>
    </>
  )
}