import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ToDoForm from "./ToDoForm";
import ToDoList from "./ToDoList";
import crypto from "crypto";
import "./styles.css";

function App() {
  // useState argument => initial state
  // useState returns an array of 2 values
  // newItem = the current state
  // setNewItem = the function to update the state
  // setNewState => must be inside return statement, else will render infinity loop
  // crypto.randomUUID() => 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed
  // setUseState functions => different betwwen passing in values and callback functions

  const [toDos, setToDos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue === null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(toDos));
  }, [toDos]);

  function addToDo(titile) {
    setToDos((currentToDos) => {
      return [
        ...currentToDos,
        {
          id: uuidv4(),
          title: titile,
          completed: false,
        },
      ];
    });
  }

  function toggleToDo(id, checked) {
    setToDos((currentToDos) => {
      return currentToDos.map((todo) => {
        if (todo.id == id) {
          // Create a new object same as todo except the completed property
          return { ...todo, completed: checked };
        }
        return todo;
      });
    });
  }

  function deleteToDo(id) {
    setToDos((currentToDos) => currentToDos.filter((todo) => todo.id != id));
  }

  return (
    <>
      <ToDoForm onSubmit={addToDo} />
      <h1 className="header">To Do List: </h1>
      <ToDoList toDos={toDos} toggleToDo={toggleToDo} deleteToDo={deleteToDo} />
    </>
  );
}

export default App;
