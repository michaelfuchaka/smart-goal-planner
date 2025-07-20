import React from "react";
import "./OverviewDashboard.css";

function OverviewDashboard({ goals = [] }) {
  // Calculate overview statistics
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const completedGoals = goals.filter(
    (goal) => goal.savedAmount >= goal.targetAmount
  );
  const completedCount = completedGoals.length;

  // Calculate progress percentage for all goals combined
  const overallProgress =
    totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  // Calculate goals by status
  const today = new Date();
  const overdueGoals = goals.filter((goal) => {
    const deadlineDate = new Date(goal.deadline);
    const daysUntilDeadline = Math.ceil(
      (deadlineDate - today) / (1000 * 60 * 60 * 24)
    );
    return daysUntilDeadline < 0 && goal.savedAmount < goal.targetAmount;
  });

  const nearDeadlineGoals = goals.filter((goal) => {
    const deadlineDate = new Date(goal.deadline);
    const daysUntilDeadline = Math.ceil(
      (deadlineDate - today) / (1000 * 60 * 60 * 24)
    );
    return (
      daysUntilDeadline <= 30 &&
      daysUntilDeadline >= 0 &&
      goal.savedAmount < goal.targetAmount
    );
  });

  const activeGoals = goals.filter((goal) => {
    const deadlineDate = new Date(goal.deadline);
    const daysUntilDeadline = Math.ceil(
      (deadlineDate - today) / (1000 * 60 * 60 * 24)
    );
    return daysUntilDeadline > 30 && goal.savedAmount < goal.targetAmount;
  });

  return (
    <div>
      <h2>📊 Financial Overview</h2>

      {/* Main Statistics Cards */}
      <div className="stats-grid">
        <div>
          <h3> Total Goals</h3>
          <p>{totalGoals}</p>
        </div>

        <div>
          <h3> Total Saved</h3>
          <p>${totalSaved.toFixed(2)}</p>
        </div>

        <div>
          <h3> Completed</h3>
          <p>{completedCount}</p>
          <p>
            (
            {totalGoals > 0
              ? ((completedCount / totalGoals) * 100).toFixed(1)
              : 0}
            %)
          </p>
        </div>

        <div>
          <h3> Overall Progress</h3>
          <p>{overallProgress.toFixed(1)}%</p>
          <div>
            <div
              className="progress-bar"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>
        {/* Category Breakdown Cards */}
        <div className="category-section">
          <h3>Category Breakdown</h3>
          <div className="category-cards">
            {/* Category cards will go here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewDashboard;
