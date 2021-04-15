import logo from './logo.svg';
import './App.css';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import { GeistProvider, CssBaseline } from '@geist-ui/react'
import StudentDashoard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';

function App() {
  return (
    <GeistProvider>
       <CssBaseline />
    <BrowserRouter>
    <Switch>
      <Route exact path='/login' component={Login} />
      <Route exact path='/' component={Home} />
      <Route path='/admin-dashboard' component={AdminDashboard} />
      <Route path='/student-dashboard' component={StudentDashoard} />
      <Route path='/teacher-dashboard' component={TeacherDashboard} />
      </Switch>
      
    </BrowserRouter>
    </GeistProvider>
  );
}

export default App;
