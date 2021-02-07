import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AddComponent from "./components/AddComponent";
import EditComponent from "./components/EditComponent";
import ListComponent from "./components/ListComponent";
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import '@aws-amplify/ui/dist/style.css';

function App() {
  return (
    <div className="container">
      <AmplifySignOut />
      <Router>
        <div className="col-md-6">
          <Switch>
            <Route path="/" exact component={ListComponent} />
            <Route path="/list" component={ListComponent} />
            <Route path="/add" component={AddComponent} />
            <Route path="/edit" component={EditComponent} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default withAuthenticator(App);
