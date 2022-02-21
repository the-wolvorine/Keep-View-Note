import "./App.css";
import ViewCount from "./ViewCount.jsx";
import Header from "./Header";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import About from "./About";
import Register from "./Register.jsx";

function App() {
  return (
    <div>
      <Router>
        <Header />
          <Routes>
            <Route exact path='/' element={< ViewCount />}></Route>
            <Route exact path='/about' element={<About/>}></Route>
            <Route exact path='/register' element={<Register/>}></Route>
        </Routes>
       </Router>
    </div>
  );
}
  
export default App;