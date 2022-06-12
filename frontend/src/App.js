import './App.css';
import {BrowserRouter,Routes, Route,  Navigate} from 'react-router-dom';
import Home from "./page/Home/Home";
import Navigation from './component/shared/Navigation/Navigation';
import Authenticate from './page/Authenticate/Authenticate';
import Activate from './page/Activate/Activate';
import Rooms from './page/Rooms/Rooms';
import { useSelector  } from 'react-redux';

function App() {
    return(
      <BrowserRouter>
          <Navigation/>
          <Routes>
              <Route path='/' element={<GuestRoute><Home/></GuestRoute>}/>
              <Route path='/activate' element={<Semiprotected><Activate/></Semiprotected>}/>
              <Route path='/authenticate' element={<GuestRoute><Authenticate/></GuestRoute>}/>
              <Route path = '/rooms' element={<Protected><Rooms/></Protected>}/>
          </Routes>
      </BrowserRouter>
    );
  
}
const Semiprotected = ({children}) => {
    const {user,isAuth} = useSelector((state)=>state.auth);
   return !isAuth?<Navigate to="/"/>:isAuth && !user.activated?(children):<Navigate to="/rooms"/>
}
const Protected = ({children}) => {
    const {user,isAuth} = useSelector((state)=>state.auth);
    return !isAuth?<Navigate to="/"/>:isAuth && !user.activated?<Navigation to="activity"/>:(children)
 }
 
const GuestRoute = ({children}) => {
  const {isAuth} = useSelector((state)=>state.auth)
  return isAuth?<Navigate to="/rooms"/>:children
}
export default App; 
