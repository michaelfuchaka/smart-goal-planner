import React from "react";

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
    <div style={dashboardStyle}>
      <h2>📊 Financial Overview</h2>
      
      {/* Main Statistics Cards */}
      <div style={statsContainer}>
        <div style={statCard}>
          <h3> Total Goals</h3>
          <p style={statNumber}>{totalGoals}</p>
        </div>
        
        <div style={statCard}>
          <h3> Total Saved</h3>
          <p style={statNumber}>${totalSaved.toFixed(2)}</p>
        </div>
        
        <div style={statCard}>
          <h3> Completed</h3>
          <p style={statNumber}>{completedCount}</p>
          <p style={statSubtext}>({totalGoals > 0 ? ((completedCount / totalGoals) * 100).toFixed(1) : 0}%)</p>
        </div>
        
        <div style={statCard}>
          <h3> Overall Progress</h3>
          <p style={statNumber}>{overallProgress.toFixed(1)}%</p>
          <div style={progressBarContainer}>
            <div style={{...progressBar, width: `${overallProgress}%`}}></div>
          </div>
        </div>
      </div>

      {/* Goal Status Breakdown */}
      <div style={statusContainer}>
        <h3>Goal Status Breakdown</h3>
        <div style={statusGrid}>
          <div style={{...statusCard, borderLeft: '4px solid #4CAF50'}}>
            <h4> Active Goals</h4>
            <p style={statusNumber}>{activeGoals.length}</p>
            <p style={statusSubtext}>On track</p>
          </div>
          
          <div style={{...statusCard, borderLeft: '4px solid #FF9800'}}>
            <h4> Near Deadline</h4>
            <p style={statusNumber}>{nearDeadlineGoals.length}</p>
            <p style={statusSubtext}>Within 30 days</p>
          </div>
          
          <div style={{...statusCard, borderLeft: '4px solid #F44336'}}>
            <h4> Overdue</h4>
            <p style={statusNumber}>{overdueGoals.length}</p>
            <p style={statusSubtext}>Past deadline</p>
          </div>
          
          <div style={{...statusCard, borderLeft: '4px solid #2196F3'}}>
            <h4> Completed</h4>
            <p style={statusNumber}>{completedCount}</p>
            <p style={statusSubtext}>Goals achieved</p>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div style={summaryContainer}>
        <h3>Financial Summary</h3>
        <div style={summaryGrid}>
          <div style={summaryItem}>
            <span>Target Amount:</span>
            <span style={summaryValue}>${totalTarget.toFixed(2)}</span>
          </div>
          <div style={summaryItem}>
            <span>Amount Saved:</span>
            <span style={summaryValue}>${totalSaved.toFixed(2)}</span>
          </div>
          <div style={summaryItem}>
            <span>Remaining to Save:</span>
            <span style={summaryValue}>${(totalTarget - totalSaved).toFixed(2)}</span>
          </div>
          <div style={summaryItem}>
            <span>Average per Goal:</span>
            <span style={summaryValue}>${totalGoals > 0 ? (totalSaved / totalGoals).toFixed(2) : '0.00'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles
const dashboardStyle = {
  padding: '1rem',
  backgroundColor: '#f8f9fa',
  borderRadius: '12px',
  marginBottom: '2rem',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const statsContainer = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '1rem',
  marginBottom: '2rem',
};

const statCard = {
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
  textAlign: 'center',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e9ecef',
};

const statNumber = {
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#2c3e50',
  margin: '0.5rem 0',
};

const statSubtext = {
  fontSize: '0.9rem',
  color: '#6c757d',
  margin: 0,
};

const statusContainer = {
  marginBottom: '2rem',
};

const statusGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: '1rem',
};

const statusCard = {
  backgroundColor: 'white',
  padding: '1rem',
  borderRadius: '8px',
  textAlign: 'center',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const statusNumber = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  margin: '0.5rem 0',
};

const statusSubtext = {
  fontSize: '0.8rem',
  color: '#6c757d',
  margin: 0,
};

const summaryContainer = {
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const summaryGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '1rem',
};

const summaryItem = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.5rem',
  borderBottom: '1px solid #e9ecef',
};

const summaryValue = {
  fontWeight: 'bold',
  color: '#2c3e50',
};

const progressBarContainer = {
  width: '100%',
  backgroundColor: '#e0e0e0',
  borderRadius: '10px',
  marginTop: '0.5rem',
  height: '8px',
};

const progressBar = {
  height: '8px',
  backgroundColor: '#4caf50',
  borderRadius: '10px',
  transition: 'width 0.3s ease',
};


export default OverviewDashboard;