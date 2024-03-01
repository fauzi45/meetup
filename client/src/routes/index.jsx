import MainLayout from '@layouts/MainLayout';
import Login from '@pages/Auth/Login';
import Register from '@pages/Auth/Register';
import EditProfile from '@pages/EditProfile';

import Home from '@pages/Home';
import NotFound from '@pages/NotFound';
import Profile from '@pages/Profile';
import CreateMeetup from '@pages/User/CreateMeetup';
import DetailMeetup from '@pages/User/DetailMeetup';

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
  {
    path: '/meetup/:id',
    name: 'Detail Meetup',
    protected: false,
    component: DetailMeetup,
    layout: MainLayout,
  },
  {
    path: '/my-profile',
    name: 'Profile',
    protected: false,
    component: Profile,
    layout: MainLayout,
  },
  {
    path: '/edit-profile',
    name: 'Edit Profile',
    protected: false,
    component: EditProfile,
    layout: MainLayout,
  },
  
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
