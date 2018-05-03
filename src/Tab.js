import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './css/css/common.css';
import './css/css/tab.css';

class Tab extends Component {
    render(){
        return <div>
            <ul className="tabUl">
                <li>
                    <Link to="/machineMarket"><span className="icon js_icon"></span><span>机市</span></Link>
                </li>
                <li>
                    <Link to="/mineralPool"><span className="icon kc_icon"></span><span>矿池</span></Link>
                </li>
                <li>
                    <Link to="/deal"><span className="icon jy_icon"></span><span>交易</span></Link>
                </li>
                <li>
                    <Link to="/"><span className="icon my_icon"></span><span>我的</span></Link>
                </li>
            </ul>
        </div>
    }
}

export default Tab;