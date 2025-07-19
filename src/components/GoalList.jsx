
function GoalList({ goals, onDeleteGoal }) {
  return (
    <div>
      <h2>Your Goals</h2>

      {goals.length === 0 ? (
        <p>No goals yet. Start by adding one!</p>
      ) : (
        <ul>
            
            {/* Looping through the array to show each goal */}
          {goals.map((goal) => (    
            <li key={goal.id}>
              <h3>{goal.title}</h3>
              <p>{goal.description}</p>
              <small>Category: {goal.category}</small>
              <br />

              {/* optional delete */}
              {onDeleteGoal && (
                <button onClick={() => onDeleteGoal(goal.id)}>
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GoalList;
