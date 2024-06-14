import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/index";
import ExpenseTracker from "./pages/expense-tracker/index";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
        </Routes>
      </Router>
      <Toaster position={'top-center'} theme={"dark"}/>
    </div>
  );
}

export default App;