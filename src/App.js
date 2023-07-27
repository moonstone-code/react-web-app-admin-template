import 'animate.css';
import './App.css';
import $ from "jquery";
import { Route, BrowserRouter  as Router, Routes, HashRouter } from 'react-router-dom';
import Auth from './Login/auth';
import Main from './Layout/main';
import Bpmn from './Layout/bpmn';
import RpaDashboard from './Layout/rpa_dashboard';
import ProfileIndex from './Profile';
import ToDoList from './Layout/Todo/to_do_list';


function App() { 
  return (
    <>
    {/* <HashRouter> */}
      <Router>
        <Routes>
          <Route path="*" element={<Auth />} />

          <Route path="main" element={<Main />}> 
              <Route path="list" element={<ToDoList />} />
          </Route>
          <Route path='/bpm' element={<Bpmn />} />

          <Route path='rpa-dashboard' element={<RpaDashboard />} />
          <Route path='/user/profile' element={<ProfileIndex />} />
        </Routes>
      </Router>
      {/* </HashRouter> */}
    </>
  );
}

export default App;
