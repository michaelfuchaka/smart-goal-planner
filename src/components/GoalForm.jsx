import { useState } from "react";

// Holding values of input as one object
function GoalForm({ onAddGoal }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });


  // Updating only the field being typed in, without losing the others
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault(); 

    // Send to server
    fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then((newGoal) => {
        onAddGoal(newGoal); // send to App state
        setFormData({ title: "", description: "", category: "" }); // clear form
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Goal</h2>
      
      <input
        type="text"
        name="title"
        placeholder="Goal Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
      />

      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;
