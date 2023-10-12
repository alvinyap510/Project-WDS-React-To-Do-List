import { useState } from "react";
import ToDoItem from "./ToDoItem";

function ToDoList({ toDos, toggleToDo, deleteToDo }) {
  return (
    <ul>
      {/* Short circuit statement */}
      {toDos.length === 0 && <p>List is empty</p>}
      {toDos.map((toDo) => {
        return (
          <ToDoItem
            {...toDo}
            title={toDo.title}
            toggleToDo={toggleToDo}
            deleteToDo={deleteToDo}
          />
        );
      })}
    </ul>
  );
}

export default ToDoList;
