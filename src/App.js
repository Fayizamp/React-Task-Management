import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AddTask from './components/AddTask'
import EditTask from "./components/EditTask";
// import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddTask/>} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
