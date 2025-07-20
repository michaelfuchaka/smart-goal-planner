import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import "./CategoryChart.css";


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
            '#10b981', '#4a90e2', '#f59e0b', '#8b5cf6', 
            '#ef4444', '#06b6d4', '#84cc16', '#f97316'

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
      <div >
        <h2> Savings by Category</h2>
        <p >No goals to display. Add some goals to see category breakdown!</p>
      </div>
    );
  }

  return (
    <div >
      <h2>Savings by Category</h2>
      
      {/* Chart.js Canvas */}
      <div  className="chart-container" >
        <canvas ref={chartRef} width="400" height="300"></canvas>
      </div>

      {/* Category Summary Cards */}
      <div >
        <div >
          <h4> Total Categories</h4>
          <p >{categoryArray.length}</p>
        </div>
        <div >
          <h4>Best Performing</h4>
          <p >{categoryArray[0]?.category || 'None'}</p>
          <p >${categoryArray[0]?.totalSaved.toFixed(2) || '0.00'} saved</p>
        </div>
        <div >
          <h4> Highest Completion</h4>
          <p >
            {categoryArray.reduce((best, current) => 
              current.completionRate > (best?.completionRate || 0) ? current : best, null)?.category || 'None'}
          </p>
          <p >
            {categoryArray.reduce((best, current) => 
              current.completionRate > (best?.completionRate || 0) ? current : best, null)?.completionRate.toFixed(1) || '0'}% complete
          </p>
        </div>
      </div>

    
    </div>
  );
}




export default CategoryChart;