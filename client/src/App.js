import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Link,
  Outlet,
  NavLink
} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';



const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route  path='/'element={<Root />} >
      <Route index  element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    ),
  );



  return (
    <RouterProvider  router={router}/>
  )
}

const Root = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav mx-auto">
            <Link id='loginbtn' className='nav-link'  to='/'>Login</Link>
            <Link id='regbtn' className='nav-link'  to='/register'>Register</Link>
            <Link id='logoutbtn' className='nav-link' onClick={e => window.localStorage.clear()}  to='/'>Logout</Link>
            </div>
          </div>
        </div>
      </nav>
<Outlet />
<footer class="d-flex position-absolute bottom-0 justify-content-center w-100">
    <p className='text-muted'>Made with ❤️ for Quantum by Gurarpit Singh</p>
  </footer>
    </div>

  )}
export default App;
