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
     <div className="overview-dashboard">
    <h2>📊 Financial Overview</h2>

    {/* Main Statistics Cards */}
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Total Goals</h3>
        <p className="stat-number">{totalGoals}</p>
      </div>

      <div className="stat-card">
        <h3>Total Saved</h3>
        <p className="stat-number">${totalSaved.toFixed(2)}</p>
      </div>

      <div className="stat-card">
        <h3>Completed</h3>
        <p className="stat-number">{completedCount}</p>
        <p className="stat-percentage">
          ({totalGoals > 0 ? ((completedCount / totalGoals) * 100).toFixed(1) : 0}%)
        </p>
      </div>

      <div className="stat-card">
        <h3>Overall Progress</h3>
        <p className="stat-number">{overallProgress.toFixed(1)}%</p>
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default OverviewDashboard;
