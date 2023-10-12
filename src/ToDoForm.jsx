import { useState } from "react";

function ToDoForm({ onSubmit }) {
  const [newItem, setNewItem] = useState("");

  function handleSubmit(e) {
    // Preventing form's default behaviour
    e.preventDefault();

    if (newItem === "") return;
    onSubmit(newItem);

    // Reset the input bar to empty
    setNewItem("");
  }
  return (
    <form className="new-item-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="item" className="text-center">
          New Item
        </label>
        <input
          type="text"
          id="item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
      </div>
      <button className="btn">Add</button>
    </form>
  );
}

export default ToDoForm;
