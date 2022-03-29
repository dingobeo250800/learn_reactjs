import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Movie from "./components/Movie/Movie";
import Select from "./components/Select/Select";
import Student from "./components/Student/Student";
import UserProfile from "./components/UserProfile ";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Movie" element={<Movie />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/Student" element={<Student />} />
          <Route path="/Select" element={<Select />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
