import React, { useState, useEffect, useContext } from 'react';
import HomePage from './pages/home/Home';
import WriteSection from './components/Write/Write';
import SettingsSection from './pages/settings/Settings';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Context } from './context/Context';
import Loader from './components/Loader/Loader'; // Import the Loader component
import Contact from './pages/contact/Contact';
import SingleBlogPage from './components/SingleBlog/SingleBlogPage';

function App() {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <div className="App">
          <Switch>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route path='/signup'>
              {user ? <HomePage /> : <Signup />}
            </Route>
            <Route path='/login'>
              {user ? <HomePage /> : <Login />}
            </Route>
            <Route path='/settings'>
              {user ? <SettingsSection /> : <Signup />}
            </Route>
            <Route path='/write'>
              {user ? <WriteSection /> : <Signup />}
            </Route>
            <Route path='/post/:postid'>
              <SingleBlogPage />
            </Route>
            <Route path='/contact'>
              <Contact />
            </Route>
          </Switch>
        </div>
      )}
    </Router>
  );
}

export default App;
