import { useState } from "react";
import "./GoalForm.css"

// Holding values of input as one object
function GoalForm({ onAddGoal }) {
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    category: "",
    deadline: "",

  });


  // Updating only the field being typed in, without losing the others
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault(); 


    // Prepare data with required fields
    const goalData = {
      ...formData,
      targetAmount: parseFloat(formData.targetAmount),
      savedAmount: 0, // Start with 0 saved
      createdAt: new Date().toISOString().split('T')[0] // Today's date
    };

    // Send to server
    fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(goalData),
    })
      .then(res => res.json())
      .then((newGoal) => {
        onAddGoal(newGoal); // send to App state
        setFormData({  name: "", targetAmount: "", category: "", deadline: ""  }); // clear form
      });
  }

  return (
    <div className="goal-form-container">
    <form onSubmit={handleSubmit} className="goal-form" >
      <h2>Add a New Goal</h2>
      
      <input
        type="text"
        name="name"
        placeholder="Goal Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="targetAmount"
        placeholder="Target Amount"
        value={formData.targetAmount}
        onChange={handleChange}
        min="0"
        step="0.01"
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

      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
        required
      />

      <button type="submit">Add Goal</button>
    </form>
    </div>
  );
}

export default GoalForm;
