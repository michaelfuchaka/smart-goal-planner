# Smart Goal Planner 

A comprehensive savings goal tracking application built with React and Vite. Track your financial goals, monitor progress, make deposits, and visualize your savings journey with interactive charts.


## 🚀 Live Demo

Check out the deployed app here: [Smart Goal Planner Live](https://michaelfuchaka.github.io/smart-goal-planner/)



## Features

###  Dashboard Overview
- Real-time financial statistics
- Overall progress tracking
- Completion rates and metrics
- Visual progress indicators

###  Goal Management
- Create new savings goals with targets and deadlines
- Edit existing goals (name, target amount, category, deadline)
- Delete goals when no longer needed
- Make deposits to track progress

###  Visual Analytics
- Interactive doughnut charts showing savings by category
- Category-wise statistics and performance metrics
- Best performing categories tracking

###  Smart Notifications
- Deadline warnings for goals due within 30 days
- Overdue goal alerts
- Goal completion celebrations

### 📱 Responsive Design
- Mobile-friendly interface
- Adaptive layouts for all screen sizes
- Professional card-based design

## Tech Stack

- **Frontend**: React 18 with Vite
- **Charts**: Chart.js with react-chartjs-2
- **Styling**: Custom CSS with modern design patterns
- **Backend**: JSON Server (local development)
- **State Management**: React useState and useEffect

## Project Structure

```
src/
├── components/
│   ├── GoalForm.js          # Create new goals
│   ├── GoalForm.css         # Form styling
│   ├── GoalList.js          # Display goals grid
│   ├── GoalList.css         # Grid layout styling
│   ├── GoalCard.js          # Individual goal management
│   ├── OverviewDashboard.js # Financial statistics
│   ├── OverviewDashboard.css# Dashboard styling
│   ├── CategoryChart.js     # Data visualization
│   └── CategoryChart.css    # Chart styling
├── App.js                   # Main application component
├── App.css                  # Layout and global styles
└── main.jsx                 # Vite entry point
db.json                      # Local database file
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd smart-goal-planner
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Install JSON Server (if not already installed)
```bash
npm install -g json-server
```

### 4. Start the Backend Server
```bash
json-server --watch db.json --port 3000
```

### 5. Start the Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Database Schema

The `db.json` file contains the goals data with the following structure:

```json
{
  "goals": [
    {
      "id": 1,
      "name": "Emergency Fund",
      "targetAmount": 10000,
      "savedAmount": 2500,
      "category": "Emergency",
      "deadline": "2024-12-31",
      "createdAt": "2024-01-15"
    }
  ]
}
```

## API Endpoints

- `GET /goals` - Fetch all goals
- `POST /goals` - Create a new goal
- `PATCH /goals/:id` - Update a goal
- `DELETE /goals/:id` - Delete a goal

## Usage

### Adding a New Goal
1. Use the form in the left sidebar
2. Fill in goal name, target amount, category, and deadline
3. Click "Add Goal" to save

### Making Deposits
1. Find your goal in the main area
2. Enter deposit amount in the deposit form
3. Click "Make Deposit" to update progress

### Editing Goals
1. Click "Edit Goal" on any goal card
2. Modify the details as needed
3. Click "Save Changes" or "Cancel"

### Viewing Analytics
- Scroll down to see the category breakdown chart
- View statistics for best performing categories
- Monitor overall progress in the dashboard

## Responsive Design

The application adapts to different screen sizes:

- **Desktop (1200px+)**: Full sidebar layout with 4-column stats grid
- **Tablet (768px-1199px)**: Stacked layout with 2-column stats grid
- **Mobile (<768px)**: Single column layout optimized for touch

## Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
