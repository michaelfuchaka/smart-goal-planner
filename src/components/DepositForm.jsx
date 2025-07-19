import { useState } from "react";

function DepositForm({ goals, onUpdateGoal }) {
  const [formData, setFormData] = useState({
    goalId: "",
    depositAmount: ""
  });

  // Updating only the field being typed in, without losing the others
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const selectedGoal = goals.find(goal => goal.id === formData.goalId);
    const depositAmount = parseFloat(formData.depositAmount);

    if (selectedGoal && depositAmount > 0) {
      // Prepare updated goal data
      const updatedGoal = {
        ...selectedGoal,
        savedAmount: selectedGoal.savedAmount + depositAmount
      };

      // Send PATCH request to update savedAmount
      fetch(`http://localhost:3000/goals/${selectedGoal.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ savedAmount: updatedGoal.savedAmount }),
      })
        .then(res => res.json())
        .then((updatedGoalFromServer) => {
          onUpdateGoal(updatedGoalFromServer); // Update App state
          setFormData({ goalId: "", depositAmount: "" }); // Clear form
        });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Make a Deposit</h2>
      
      <select
        name="goalId"
        value={formData.goalId}
        onChange={handleChange}
        required
      >
        <option value="">Select a Goal</option>
        {goals.map((goal) => (
          <option key={goal.id} value={goal.id}>
            {goal.name} (${goal.savedAmount}/${goal.targetAmount})
          </option>
        ))}
      </select>

      <input
        type="number"
        name="depositAmount"
        placeholder="Deposit Amount"
        value={formData.depositAmount}
        onChange={handleChange}
        min="0"
        step="0.01"
        required
      />

      <button type="submit">Make Deposit</button>
    </form>
  );
}

export default DepositForm;