import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const newerGuad_icon = require("../img/icon_xinshou_nor.png");
const expertGuad_icon = require("../img/icon_gaoshou_nor.png");

class GuaDanTab extends Component {
    render (){
        return <div>
            <ul className="guadanTab fz_30 f_flex">
                <li>
                    <Link to="/deal/newerGuad"><img src={newerGuad_icon} /><p>新手挂单</p></Link>
                </li>
                <li>
                    <Link to="/deal/expertGuad"><img src={expertGuad_icon} /><p>高手挂单</p></Link>
                </li>
            </ul>
        </div>
    }
}

export default GuaDanTab;