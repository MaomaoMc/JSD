import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './css/css/common.css';
import './css/css/tab.css';

class Tab extends Component {
    render(){
        return <div>
            <ul className="tabUl">
                <li>
                    <Link to="/machineMarket"><span className="icon js_icon"></span><p>机市</p></Link>
                </li>
                <li>
                    <Link to="/mineralPool"><span className="icon kc_icon"></span><p>矿池</p></Link>
                </li>
                <li>
                    <Link to="/deal"><span className="icon jy_icon"></span><p>交易</p></Link>
                </li>
                <li>
                    <Link to="/account"><span className="icon my_icon"></span><p>我的</p></Link>
                </li>
            </ul>
        </div>
    }
}

export default Tab;