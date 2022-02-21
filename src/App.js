import "./App.css";
import ViewCount from "./ViewCount.jsx";
import Header from "./Header";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import About from "./About";

function App() {
  return (
    <div>
      <Router>
        <Header />
          <Routes>
            <Route exact path='/' element={< ViewCount />}></Route>
            <Route exact path='/about' element={<About/>}></Route>
        </Routes>
       </Router>
    </div>
  );
}
  
export default App;