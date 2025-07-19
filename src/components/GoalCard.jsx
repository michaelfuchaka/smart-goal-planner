import React from "react";

function GoalCard({ goal, onDeleteGoal }) {
  const { id, title, description, category } = goal;

  return (
    <div className="goal-card" style={cardStyle}>
      <h3>{title}</h3>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Category:</strong> {category}</p>
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

export default GoalCard;
