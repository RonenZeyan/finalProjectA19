import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Home from './components/Home';
import AdminHome from './components/AdminHome';
import UserHome from './components/UserHome';
import UsersTable from './components/UsersTable';
import MissionsTable from './components/MissionsTable';
import DisplayUserMissions from './components/DisplayUserMissions';
import UserNewMissions from './components/UserNewMissions';
import UserExistingMissions from './components/UserExistingMissions';
import EditUserData from './components/EditUserData';
import { AuthProvider } from './components/AuthContext'; 
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import EditUserByAdmin from './components/editUserByAdmin';
import CreateMSG from './components/CreateMSG';
import DisplayMSG from './components/DisplayMSG';


function App() {
  return (
<AuthProvider>
      <BrowserRouter>
        <Header />
        <div className="site-container">
          <Routes>
            {/* admin pages */}
              <Route path='/' element={<Home />} />
              <Route path='/AdminHome' element={<AdminHome />} />
              <Route path='/adminLogin' element={<Login />} />
              <Route path='/users' element={<UsersTable />} />
              <Route path='/editUser/:id' element={<EditUserByAdmin />} />
              <Route path='/users/user/missions/:id' element={<DisplayUserMissions />} />
              <Route path='/missions' element={<MissionsTable />} />
              <Route path='/createMSG' element={<CreateMSG />} />
              <Route path='/displayMSG' element={<DisplayMSG />} />
            {/* userPages */}
              <Route path='/userNewMissions' element={<UserNewMissions />} />
              <Route path='/userExistingMissions' element={<UserExistingMissions />} />
              <Route path='/profile' element={<EditUserData />} />
              <Route path='/UserHome' element={<UserHome />} />

          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
</AuthProvider>


  );
}

export default App;
