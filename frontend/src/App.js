import { Route, Routes ,Navigate} from "react-router-dom";
import CreateEmployee from "./Pages/CreateEmployee";
import Employees from "./Pages/Employees";
import LogIn from "./Pages/LogIn";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Employees" replace />} />
      <Route path="/Employees" element={<Employees />} />
      <Route path="/CreateEmployee" element={<CreateEmployee />} />
      <Route path="/LogIn" element={<LogIn />} />
    </Routes>
  );
}

export default App;
