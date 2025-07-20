import { useState, useEffect } from "react";
import GoalForm from "./components/GoalForm";
import GoalList from "./components/GoalList" ;
import OverviewDashboard from "./components/OverviewDashboard";
import CategoryChart from "./components/CategoryChart";


import "./App.css";

function App() {
  // Main state to hold all goals

  const [goals, setGoals] = useState([]);
  


  // Fetch all goals from json-server
  useEffect(() => {
    fetch('http://localhost:3000/goals')
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch(error => console.log(error))
  }, [])


  // Add goal
 const handleAddGoal = (newGoal) => {
  setGoals([...goals, newGoal]);
 };

//  Delete goal
const handleDeleteGoal = (id) =>{

 // Delete from server
  fetch(`http://localhost:3000/goals/${id}`, {
    method: "DELETE"
  })
    .then(() => {
      // Update local state
      setGoals(goals.filter(goal => goal.id !== id));
    })
    .catch(error => console.log(error));
};

    // Update goal (for deposits)
const handleUpdateGoal = (updatedGoal) => {
  // Update on server
  fetch(`http://localhost:3000/goals/${updatedGoal.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedGoal),
  })
    .then(res => res.json())
    .then(() => {
      // Update local state
      setGoals(goals.map(goal => 
        goal.id === updatedGoal.id ? updatedGoal : goal
      ));
    })
    .catch(error => console.log(error));
};


  return (
    <div className="App main-layout" > 
    <header className="app-header">
  <h1>Smart Goal Planner</h1>
</header>


  <section className="main-content">
   <OverviewDashboard goals={goals} />
   {/* Render the goal list */}
      <GoalList goals={goals} onDeleteGoal={handleDeleteGoal} onUpdateGoal={handleUpdateGoal}  />
        <CategoryChart goals={goals} />

    </section>

      {/* Render the form */}
      <aside className="sidebar">
    <GoalForm 
      onAddGoal={handleAddGoal} /> 
</aside>
     
      
        

    </div>
  )
}




export default App;
  