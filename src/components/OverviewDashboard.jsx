import React from "react";
import "./OverviewDashboard.css";


function OverviewDashboard({ goals = [] }) {
  // Calculate overview statistics
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount);
  const completedCount = completedGoals.length;
  
  // Calculate progress percentage for all goals combined
  const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;
  
  // Calculate goals by status
  const today = new Date();
  const overdueGoals = goals.filter(goal => {
    const deadlineDate = new Date(goal.deadline);
    const daysUntilDeadline = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    return daysUntilDeadline < 0 && goal.savedAmount < goal.targetAmount;
  });
  
  const nearDeadlineGoals = goals.filter(goal => {
    const deadlineDate = new Date(goal.deadline);
    const daysUntilDeadline = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    return daysUntilDeadline <= 30 && daysUntilDeadline >= 0 && goal.savedAmount < goal.targetAmount;
  });

  const activeGoals = goals.filter(goal => {
    const deadlineDate = new Date(goal.deadline);
    const daysUntilDeadline = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    return daysUntilDeadline > 30 && goal.savedAmount < goal.targetAmount;
  });

  return (
    <div >
      <h2>📊 Financial Overview</h2>
      
      {/* Main Statistics Cards */}
      <div  className="stats-grid" >
        <div >
          <h3> Total Goals</h3>
          <p >{totalGoals}</p>
        </div>
        
        <div >
          <h3> Total Saved</h3>
          <p >${totalSaved.toFixed(2)}</p>
        </div>
        
        <div >
          <h3> Completed</h3>
          <p >{completedCount}</p>
          <p >({totalGoals > 0 ? ((completedCount / totalGoals) * 100).toFixed(1) : 0}%)</p>
        </div>
        
        <div >
          <h3> Overall Progress</h3>
          <p >{overallProgress.toFixed(1)}%</p>
          <div >
           <div className="progress-bar" style={{ width: `${overallProgress}%` }}></div>

          </div>
        </div>
      </div>

      {/* Goal Status Breakdown */}
      <div >
        <h3>Goal Status Breakdown</h3>
        <div >
          <div className="status-card" >

            <h4> Active Goals</h4>
            <p >{activeGoals.length}</p>
            <p >On track</p>
          </div>
          
          <div   className="status-card"  >
            <h4> Near Deadline</h4>
            <p >{nearDeadlineGoals.length}</p>
            <p >Within 30 days</p>
          </div>
          
          <div  className="status-card" >
            <h4> Overdue</h4>
            <p >{overdueGoals.length}</p>
            <p >Past deadline</p>
          </div>
          
          <div  className="status-card" >
            <h4> Completed</h4>
            <p >{completedCount}</p>
            <p >Goals achieved</p>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div >
        <h3>Financial Summary</h3>
        <div >
          <div >
            <span>Target Amount:</span>
            <span >${totalTarget.toFixed(2)}</span>
          </div>
          <div>
            <span>Amount Saved:</span>
            <span >${totalSaved.toFixed(2)}</span>
          </div>
          <div >
            <span>Remaining to Save:</span>
            <span >${(totalTarget - totalSaved).toFixed(2)}</span>
          </div>
          <div >
            <span>Average per Goal:</span>
            <span >${totalGoals > 0 ? (totalSaved / totalGoals).toFixed(2) : '0.00'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}




export default OverviewDashboard;