import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
// import Tab from './Tab';
import './js/common.js'
import MachineM from './machineMarket/index.js';
import KuangChi from './kuangchi/index.js';
import Deal from './deal/index.js';
// import './index.css';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(
//     <MachineM />,
//      document.getElementById('root')
// );
ReactDOM.render(
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={MachineM}/>
                    <Route exact path="/kuangchi" component={KuangChi}/>
                    <Route path="/deal" component={Deal} />
                </Switch>
            </div>
        </Router>
    ,
  document.getElementById('root')
)

// registerServiceWorker();