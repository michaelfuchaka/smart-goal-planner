import React, { useState } from "react";

function GoalCard({ goal, onDeleteGoal ,  onUpdateGoal }) {
  const { id, name, targetAmount, savedAmount, category, deadline  } = goal;
  const [depositAmount, setDepositAmount] = useState("");

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

  // Check deadline warnings
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const daysUntilDeadline = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
  const isNearDeadline = daysUntilDeadline <= 30 && savedAmount < targetAmount;
  const isOverdue = daysUntilDeadline < 0 && savedAmount < targetAmount;

  return (
    <div className="goal-card" style={cardStyle}>
      <h3>{name}</h3>
    <p><strong>Category:</strong> {category}</p>
      <p><strong>Target Amount:</strong> ${targetAmount}</p>
      <p><strong>Saved Amount:</strong> ${savedAmount}</p>
      <p><strong>Remaining:</strong> ${remainingAmount}</p>
      <p><strong>Deadline:</strong> {deadline}</p>
      
      {/* Progress Bar */}
      <div style={progressBarContainer}>
        <div style={{...progressBar, width: `${progressPercentage}%`}}></div>
      </div>
      <p>{progressPercentage.toFixed(1)}% Complete</p>

      {/* Deadline Warnings */}
      {isOverdue && <p style={{color: 'red'}}><strong>OVERDUE</strong></p>}
      {isNearDeadline && !isOverdue && <p style={{color: 'orange'}}><strong>WARNING: Deadline within 30 days!</strong></p>}

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
  border: "1px solid #ccc",
  borderRadius: "10px",
  padding: "1rem",
  marginBottom: "1rem",
  backgroundColor: "#f9f9f9",
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
