import {Route, Switch} from 'react-router-dom'

import Login from './components/Login'

import Home from './components/Home'

import Jobs from './components/Jobs'

import JobItemDetails from './components/JobItemDetails'

import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/jobs" component={Jobs} />
      <Route exact path="/jobs/:id" component={JobItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
