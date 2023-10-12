import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ToDoForm from "./ToDoForm";
import ToDoList from "./ToDoList";
import crypto from "crypto";
import Cookies from "js-cookie";
import "./styles.css";

function App() {
  // useState argument => initial state
  // useState returns an array of 2 values
  // newItem = the current state
  // setNewItem = the function to update the state
  // setNewState => must be inside return statement, else will render infinity loop
  // crypto.randomUUID() => 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed
  // setUseState functions => different betwwen passing in values and callback functions

  /*** LocalStorage ***/
  const [toDos, setToDos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue === null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(toDos));
  }, [toDos]);

  /*** Session Storage ***/
  // const [toDos, setToDos] = useState(() => {
  //   const localValue = sessionStorage.getItem("ITEMS");
  //   if (localValue === null) return [];
  //   return JSON.parse(localValue);
  // });

  // useEffect(() => {
  //   sessionStorage.setItem("ITEMS", JSON.stringify(toDos));
  // }, [toDos]);

  /*** Cookie Storage ***/
  // const [toDos, setToDos] = useState(() => {
  //   const cookieValue = Cookies.get("ITEMS"); // Retrieve cookie
  //   if (cookieValue === undefined) return [];
  //   return JSON.parse(cookieValue);
  // });

  // useEffect(() => {
  //   Cookies.set("ITEMS", JSON.stringify(toDos), { expires: 7 });
  // }, [toDos]);

  /*** In Memory Storage ***/
  // Stores only in JS Variables and will disappear when refreshed
  // const [toDos, setToDos] = useState([]);

  /*** IndexedDB ***/
  // Built in in most modern browsers
  // const [toDos, setToDos] = useState([]);

  // useEffect(() => {
  //   // Load todos from IndexedDB on component mount
  //   getToDosFromIndexedDB().then(setToDos);
  // }, []);

  // useEffect(() => {
  //   // Save todos to IndexedDB whenever they change
  //   saveToDosToIndexedDB(toDos);
  // }, [toDos]);

  // async function getToDosFromIndexedDB() {
  //   return new Promise((resolve, reject) => {
  //     const request = indexedDB.open("toDoDatabase", 1);

  //     request.onerror = () => reject("Could not open IndexedDB.");
  //     request.onsuccess = () => {
  //       const db = request.result;
  //       const transaction = db.transaction("toDos", "readonly");
  //       const objectStore = transaction.objectStore("toDos");
  //       const getAllRequest = objectStore.getAll();

  //       getAllRequest.onerror = () => reject("Could not retrieve todos.");
  //       getAllRequest.onsuccess = () => resolve(getAllRequest.result);
  //     };
  //     request.onupgradeneeded = (event) => {
  //       const db = event.target.result;
  //       db.createObjectStore("toDos", { keyPath: "id" });
  //     };
  //   });
  // }

  // function saveToDosToIndexedDB(toDos) {
  //   const request = indexedDB.open("toDoDatabase", 1);

  //   request.onerror = () => console.error("Could not open IndexedDB.");
  //   request.onsuccess = () => {
  //     const db = request.result;
  //     const transaction = db.transaction("toDos", "readwrite");
  //     const objectStore = transaction.objectStore("toDos");

  //     // Listen to complete / error
  //     transaction.oncomplete = () => {
  //       console.log("Transaction completed: database modification finished.");
  //     };

  //     transaction.onerror = () => {
  //       console.log("Transaction not opened due to error.");
  //     };

  //     // Clear existing todos
  //     objectStore.clear();

  //     // Save new todos
  //     toDos.forEach((todo) => objectStore.add(todo));
  //   };
  // }

  function addToDo(title) {
    setToDos((currentToDos) => {
      return [
        ...currentToDos,
        {
          id: uuidv4(),
          title: title,
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
