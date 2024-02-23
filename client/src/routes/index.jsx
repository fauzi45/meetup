import MainLayout from '@layouts/MainLayout';
import Login from '@pages/Auth/Login';
import Register from '@pages/Auth/Register';

import Home from '@pages/Home';
import NotFound from '@pages/NotFound';
import CreateMeetup from '@pages/User/CreateMeetup';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/register',
    name: 'Register',
    protected: false,
    component: Register,
    layout: MainLayout,
  },
  {
    path: '/login',
    name: 'Login',
    protected: false,
    component: Login,
    layout: MainLayout,
  },
  {
    path: '/create-meetup',
    name: 'Create Meetup',
    protected: false,
    component: CreateMeetup,
    layout: MainLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
