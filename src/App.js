import "./App.css";
import ViewCount from "./ViewCount.jsx";
import Header from "./Header";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import About from "./About";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import Home from "./Home";
import withNavigation from "./WithNavigation";
import Logout from "./Logout";
import Aroute from "./Aroute";
import UserProfile from "./UserProfile";


function App() {
  const HeaderWithNavigation = withNavigation(Header);
  return (
    <div>
      <Router>
        <HeaderWithNavigation />
          <Routes>
            <Route exact path='/' element={< ViewCount />}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route exact path='/register' element={<Register/>}></Route>
            <Route exact path='/login' element={<Login/>}></Route>
            <Route path="/home" element={<Aroute><Home/></Aroute>} />
            <Route path="/logout" element={<Aroute><Logout/></Aroute>} />
            <Route path="/profile" element={<Aroute><UserProfile/></Aroute>} />
        </Routes>
       </Router>
    </div>
  );
}
  
export default App;