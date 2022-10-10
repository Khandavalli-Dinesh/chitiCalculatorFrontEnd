import ChitiPage from './pages/ChitiPage';
import MonthPage from './pages/MonthPage';
import CandidatePage from './pages/CandidatePage';
import UsersPage from './pages/UsersPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import Header from './Components/UI/Header/Header';
import ProtectedRoute from './Components/ProtectedRoute';
import { Switch , Route} from 'react-router';
// import { useSelector } from 'react-redux';

function App() {
  // const storeIsLoggedIn = useSelector(state=>state.users.isLoggedIn);
  // const isLoggedIn = localStorage.getItem('prevUser') !== undefined || storeIsLoggedIn;
  return (
    <>
      <Header/>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/chiti'>
          <ProtectedRoute>
            <ChitiPage />
          </ProtectedRoute>
        </Route>
        <Route path='/:chitiId/months'>
          <ProtectedRoute>
          <MonthPage />
          </ProtectedRoute>
        </Route>
        <Route path='/candidates'>
          <ProtectedRoute>
            <CandidatePage />
          </ProtectedRoute>
        </Route>
        <Route path='/users'>
          <ProtectedRoute>
            <UsersPage />  
          </ProtectedRoute>
        </Route>
        <Route path='/profile'>
          <ProtectedRoute>
            <ProfilePage />  
          </ProtectedRoute>
        </Route>
        <Route path='*'>
          <p>Cannot get page</p>
        </Route>
      </Switch>
    </>
    
  );
}

export default App;
