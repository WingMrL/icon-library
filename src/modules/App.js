import React from 'react';
import styles from './App.css';
import { Route, BrowserRouter as Router, IndexRoute} from 'react-router-dom';
import Index from './Index/Index';
import InnerGroup from './InnerGroup/InnerGroup';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          
          <Route exact path="/" component={Index}>
            
            
          </Route>
          <Route path="/innergroup" component={InnerGroup}/>
        </div>
      </Router>
    );
  }
}

export default App;