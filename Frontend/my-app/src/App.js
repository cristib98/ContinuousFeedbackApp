import React from 'react'
import RegisterForm from './RegisterForm'
import LogIn from './LogIn'
import NewActivity from './NewActivity'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import AddNewActivity from './AddNewActivity'
import Home from './Home'
import Reactions from './Reactions'
import ProfView from './ProfView'
import { Redirect } from 'react-router'
 
class App extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path='/register' exact>
            <RegisterForm />
          </Route>
          <Route path='/LogIn' exact>
            <LogIn />
          </Route>
          <Route path='/newActivity' exact>
            <NewActivity />
          </Route>
          <Route path='/addNewActivity' exact>
            <AddNewActivity />
          </Route>
          <Route path='/Home' exact>
            <Home/>
          </Route>
          <Route path='/Reactions' exact>
            <Reactions/>
          </Route>
          <Route path='/ProfView' exact>
            <ProfView/>
          </Route>
          <Redirect from="/" to="/LogIn" />
        </Switch>
      </Router>
    )
  }
}
 
export default App