import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
// import Tab from './Tab';
import './js/common.js'
import MachineM from './machineMarket/index.js';
import MineralPool from './mineralPool/index.js';
import Deal from './deal/index.js';
import GuaDan from './guadan/index.js';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={MachineM}/>
                    <Route exact path="/mineralPool" component={MineralPool}/>
                    <Route path="/deal" component={Deal} />
                    <Route path="/guadan" component={GuaDan} />
                </Switch>
            </div>
        </Router>
    ,
  document.getElementById('root')
)

// registerServiceWorker();