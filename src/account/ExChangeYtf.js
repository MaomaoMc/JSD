import React, {Component} from 'react';
import Title from '../Title';

const ytf_pic = require("../img/icon_ytf_nor.png")
class ExchangeYtf extends Component{
    render (){
        return <div className="text_center">
        <Title title="兑换以太坊"/>
           <div className="profile">
            <img src={ytf_pic} alt=""/>
           </div>
            <ul className="lists f_flex fz_26" style={{marginTop: 0}}>
                <li>
                    <span className="f_lt fc_blue">请输入兑换金额</span>
                    <span className="f_rt">
                        <input className="czAmount" type="text" value="100"/>
                    </span>
                </li>
            </ul>
            <div style={{padding: '0 .2rem'}}>
                <span className="btn btn_primary fz_26" style={{width: "100%", height: ".45rem", lineHeight: '.45rem'}}>兑换</span>
            </div>
        </div>
    }
}

export default ExchangeYtf;