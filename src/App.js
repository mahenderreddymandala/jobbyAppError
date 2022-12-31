import {Route, Switch} from 'react-router-dom'

import Login from './components/Login'

import Home from './components/Home'

import Jobs from './components/Jobs'

import './App.css'

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/jobs" component={Jobs} />
    </Switch>
  </div>
)

export default App
