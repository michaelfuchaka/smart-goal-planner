import GoalCard from "./GoalCard";

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
             <GoalCard 
                key={goal.id} 
             goal={goal} 
               onDeleteGoal={onDeleteGoal}
                      />

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GoalList;
