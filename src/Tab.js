import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './css/css/common.css';
import './css/css/tab.css';

class Tab extends Component {
    render(){
        const hash = window.location.hash;
        const machineMarketIndex = hash.indexOf("machineMarket");
        const mineralPoolIndex = hash.indexOf("mineralPool");
        const dealIndex = hash.indexOf("deal");
        return <div>
            <ul className="tabUl">
                <li>
                    <Link to="/machineMarket"><span
                     className={machineMarketIndex !== -1 ? "icon js_icon active" : "icon js_icon"}></span><span>机市</span></Link>
                </li>
                <li>
                    <Link to="/mineralPool"><span
                     className={mineralPoolIndex !== -1 ? "icon kc_icon active" : "icon kc_icon"}></span><span>矿池</span></Link>
                </li>
                <li>
                    <Link to="/deal"><span
                    className={dealIndex !== -1 ? "icon jy_icon active" : "icon jy_icon"}></span><span>交易</span></Link>
                </li>
                <li>
                    <Link to="/"><span className="icon my_icon"
                    className={machineMarketIndex === -1 && mineralPoolIndex === -1 && dealIndex === -1 ? "icon my_icon active" : "icon my_icon"}></span><span>我的</span></Link>
                </li>
            </ul>
        </div>
    }
}

export default Tab;