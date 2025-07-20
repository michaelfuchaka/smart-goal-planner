import React, { useState } from "react";

function GoalCard({ goal, onDeleteGoal ,  onUpdateGoal }) {
  const { id, name, targetAmount, savedAmount, category, deadline  } = goal;
  const [depositAmount, setDepositAmount] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
  name: name,
  targetAmount: targetAmount,
  category: category,
  deadline: deadline
});

  // Calculate progress percentage
  const progressPercentage = (savedAmount / targetAmount) * 100;
  const remainingAmount = targetAmount - savedAmount;

  // Handle deposit
  function handleDeposit(e) {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (amount > 0) {
      const updatedGoal = {
        ...goal,
        savedAmount: savedAmount + amount
      };
      onUpdateGoal(updatedGoal);
      setDepositAmount("");
    }
  }
  // Add edit handlers
function handleEditSubmit(e) {
  e.preventDefault();
  const updatedGoal = {
    ...goal,
    ...editData,
    targetAmount: parseFloat(editData.targetAmount)
  };
  onUpdateGoal(updatedGoal);
  setIsEditing(false);
}

function handleEditChange(e) {
  const { name, value } = e.target;
  setEditData({ ...editData, [name]: value });
}


  // Check deadline warnings
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const daysUntilDeadline = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
  const isNearDeadline = daysUntilDeadline <= 30 && savedAmount < targetAmount;
  const isOverdue = daysUntilDeadline < 0 && savedAmount < targetAmount;
// Calculate time remaining
const timeRemaining = daysUntilDeadline > 0 ? `${daysUntilDeadline} days left` : 'Deadline passed';


  return (
    <div className="goal-card" style={cardStyle}>
      <h3>{name}</h3>
    <p><strong>Category:</strong> {category}</p>
      <p><strong>Target Amount:</strong> ${targetAmount}</p>
      <p><strong>Saved Amount:</strong> ${savedAmount}</p>
      <p><strong>Remaining:</strong> ${remainingAmount}</p>
      <p><strong>Deadline:</strong> {deadline}</p>
      <p><strong>Time Remaining:</strong> {timeRemaining}</p>

      {/* Progress Bar */}
      <div style={progressBarContainer}>
        <div style={{...progressBar, width: `${progressPercentage}%`}}></div>
      </div>
      <p>{progressPercentage.toFixed(1)}% Complete</p>

      {/* Deadline Warnings */}
      {isOverdue && <p style={{color: 'red'}}><strong>OVERDUE</strong></p>}
      {isNearDeadline && !isOverdue && <p style={{color: 'orange'}}><strong>WARNING: Deadline within 30 days!</strong></p>}
        {savedAmount >= targetAmount && <p style={{color: 'green'}}><strong>COMPLETED! </strong></p>}

         {/* Edit Button and Form */}
      {!isEditing ? (
        <button onClick={() => setIsEditing(true)}>Edit Goal</button>
      ) : (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Goal name"
            value={editData.name}
            onChange={handleEditChange}
            required
          />
          <input
            type="number"
            name="targetAmount"
            placeholder="Target amount"
            value={editData.targetAmount}
            onChange={handleEditChange}
            min="0"
            step="0.01"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={editData.category}
            onChange={handleEditChange}
            required
          />
          <input
            type="date"
            name="deadline"
            value={editData.deadline}
            onChange={handleEditChange}
            required
          />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      )}

      {/* Deposit Form */}
      <form onSubmit={handleDeposit}>
        <input
          type="number"
          placeholder="Deposit amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          min="0"
          step="0.01"
        />
        <button type="submit">Make Deposit</button>
      </form>

      <button onClick={() => onDeleteGoal(id)}>Delete</button>
    </div>
  );
}

const cardStyle = {
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  padding: "24px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

const progressBarContainer = {
  width: "100%",
  backgroundColor: "#e0e0e0",
  borderRadius: "10px",
  marginBottom: "0.5rem",
};

const progressBar = {
  height: "20px",
  backgroundColor: "#4caf50",
  borderRadius: "10px",
  transition: "width 0.3s ease",
};

export default GoalCard;
