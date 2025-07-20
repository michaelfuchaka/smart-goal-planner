import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);


function CategoryChart({ goals = [] }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Group goals by category and calculate statistics
  const categoryStats = goals.reduce((acc, goal) => {
    const category = goal.category;
    
    if (!acc[category]) {
      acc[category] = {
        count: 0,
        totalTarget: 0,
        totalSaved: 0,
        completed: 0,
        goals: []
      };
    }
    
    acc[category].count += 1;
    acc[category].totalTarget += goal.targetAmount;
    acc[category].totalSaved += goal.savedAmount;
    acc[category].goals.push(goal);
    
    if (goal.savedAmount >= goal.targetAmount) {
      acc[category].completed += 1;
    }
    
    return acc;
  }, {});

  // Convert to array and sort by total saved (descending)
  const categoryArray = Object.entries(categoryStats)
    .map(([category, stats]) => ({
      category,
      ...stats,
      completionRate: stats.count > 0 ? (stats.completed / stats.count) * 100 : 0,
      progressRate: stats.totalTarget > 0 ? (stats.totalSaved / stats.totalTarget) * 100 : 0
    }))
    .sort((a, b) => b.totalSaved - a.totalSaved);

  // Create Chart.js chart
  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (chartRef.current && categoryArray.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      
       chartInstanceRef.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: categoryArray.map(cat => cat.category),
          datasets: [{
            data: categoryArray.map(cat => cat.totalSaved),
            backgroundColor: [
              '#4CAF50', '#2196F3', '#FF9800', '#9C27B0', 
              '#F44336', '#00BCD4', '#795548', '#607D8B',
              '#E91E63', '#3F51B5', '#FF5722', '#009688'
            ],
            borderWidth: 2,
            borderColor: '#fff'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                usePointStyle: true
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const category = categoryArray[context.dataIndex];
                  return `${context.label}: ${category.totalSaved.toFixed(2)} (${category.count} goals)`;
                }
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [categoryArray]);

  if (categoryArray.length === 0) {
    return (
      <div style={chartContainer}>
        <h2> Savings by Category</h2>
        <p style={emptyState}>No goals to display. Add some goals to see category breakdown!</p>
      </div>
    );
  }

  return (
    <div style={chartContainer}>
      <h2>Savings by Category</h2>
      
      {/* Chart.js Canvas */}
      <div style={chartWrapper}>
        <canvas ref={chartRef} width="400" height="300"></canvas>
      </div>

      {/* Category Summary Cards */}
      <div style={summaryCards}>
        <div style={summaryCard}>
          <h4> Total Categories</h4>
          <p style={summaryNumber}>{categoryArray.length}</p>
        </div>
        <div style={summaryCard}>
          <h4>Best Performing</h4>
          <p style={summaryText}>{categoryArray[0]?.category || 'None'}</p>
          <p style={summarySubtext}>${categoryArray[0]?.totalSaved.toFixed(2) || '0.00'} saved</p>
        </div>
        <div style={summaryCard}>
          <h4> Highest Completion</h4>
          <p style={summaryText}>
            {categoryArray.reduce((best, current) => 
              current.completionRate > (best?.completionRate || 0) ? current : best, null)?.category || 'None'}
          </p>
          <p style={summarySubtext}>
            {categoryArray.reduce((best, current) => 
              current.completionRate > (best?.completionRate || 0) ? current : best, null)?.completionRate.toFixed(1) || '0'}% complete
          </p>
        </div>
      </div>

      
      
    </div>
  );
}

// Styles
const chartContainer = {
  padding: '1.5rem',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  marginBottom: '2rem',
};

const emptyState = {
  textAlign: 'center',
  color: '#6c757d',
  fontSize: '1.1rem',
  padding: '2rem',
};

const chartWrapper = {
  width: '100%',
  maxWidth: '500px',
  margin: '2rem auto',
  padding: '1rem',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
};

const summaryCards = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '1rem',
  marginBottom: '2rem',
};

const summaryCard = {
  backgroundColor: '#f8f9fa',
  padding: '1rem',
  borderRadius: '8px',
  textAlign: 'center',
  border: '1px solid #e9ecef',
};

const summaryNumber = {
  fontSize: '1.8rem',
  fontWeight: 'bold',
  color: '#2c3e50',
  margin: '0.5rem 0',
};

const summaryText = {
  fontSize: '1.1rem',
  fontWeight: 'bold',
  color: '#2c3e50',
  margin: '0.5rem 0',
};

const summarySubtext = {
  fontSize: '0.9rem',
  color: '#6c757d',
  margin: 0,
};
function getCategoryColor(index) {
  const colors = [
    '#4CAF50', '#2196F3', '#FF9800', '#9C27B0', 
    '#F44336', '#00BCD4', '#795548', '#607D8B',
    '#E91E63', '#3F51B5', '#FF5722', '#009688'
  ];
  return colors[index % colors.length];
}

export default CategoryChart;