import { useState, useEffect } from "react";
import GoalForm from "./components/GoalForm";
import GoalList from "./components/GoalList";
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
  setGoals(goals.filter(goal => goal.id !==id));
 };

  return (
    <div className="App">
      <h1>Smart Goal Planner</h1>
      <p>Total Goals: {goals.length}</p>

      
      {/* Render the form */}
    <GoalForm 
      onAddGoal={handleAddGoal} /> 

      
      {/* Render the goal list */}
      <GoalList goals={goals}
      onDeleteGoal={handleDeleteGoal} />  
    </div>
  )
}




export default App;
  