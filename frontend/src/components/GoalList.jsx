import GoalCard from "./GoalCard";
import "./GoalList.css";
import { useState } from "react";

function GoalList({ goals, onDeleteGoal, onUpdateGoal }) {
  const [showAll, setShowAll] = useState(false);

  const displayedGoals = showAll ? goals : goals.slice(0, 4);
  const hasMoreGoals = goals.length > 4;

  return (
    <div className="goal-list-section">
      <div className="goal-list-header">
        <h2>Your Goals</h2>
        {hasMoreGoals && (
          <button
            className="view-toggle-btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? `Show Less` : `View All (${goals.length})`}
          </button>
        )}
      </div>

      {goals.length === 0 ? (
        <div className="no-goals">
          <p>No goals yet. Start by adding one!</p>
        </div>
      ) : (
        <div className="goals-grid">
          {displayedGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onDeleteGoal={onDeleteGoal}
              onUpdateGoal={onUpdateGoal}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default GoalList;
