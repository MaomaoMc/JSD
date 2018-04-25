import React, {Component} from 'react';
import Route from 'react-router-dom';
import {Link} from 'react-router-dom';
import '../css/css/deal.css';
import Ptp from './Ptp';

class DealTab extends Component {
    render (){
        return <div>
            <ul className="deal_tab f_flex fz_30">
                <li className="active" style={{ borderTopLeftRadius: '.25rem', borderBottomLeftRadius: '.25rem'}}>
                    <Link to="/deal/price"><span>价格</span></Link>
                </li>
                <li>
                    <Link to="/deal/ptp"><span>点对点</span></Link>
                </li>
                <li style={{ borderTopRightRadius: '.25rem', borderBottomRightRadius: '.25rem'}}>
                    <Link to="/deal/dealItem"><span>交易记录</span></Link>
                </li>
            </ul>
        </div>
    }
}

export default DealTab;