import {useStae} from "react"
import "./styles.css"

export default function App() {

  // useState argument => initial state
  // useState returns an array of 2 values
  // newItem = the current state
  // setNewItem = the function to update the state
  const [newItem, setNewItem] = useState("")

  return (
    <>
      <form className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input type="text" id="item" />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">To Do List: </h1>
      <ul>
        <li>
          <label>
            <input type="checkbox" />
            Item 1
          </label>
          <button className="btn btn-danger">Delete</button>
        </li>
        <li>
          <label>
            <input type="checkbox" />
            Item 2
          </label>
          <button className="btn btn-danger">Delete</button>
        </li>
      </ul>
    </>
  )
}