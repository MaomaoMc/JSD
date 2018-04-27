import React, {Component} from 'react';

const oilCard_pic = require("../img/icon_ykcz_nor.png")
class OilCard extends Component{
    render (){
        return <div className="text_center">
            <div className="title"><span className="arrow back_arrow"></span>油卡充值<span className="refresh"></span></div>
           <div className="profile">
            <img src={oilCard_pic} alt=""/>
           </div>
            <ul className="lists f_flex fz_26" style={{marginTop: 0}}>
                <li>
                    <span className="f_lt fc_blue">油卡类型</span>
                    <span className="f_rt">
                        <span className="fc_white">中石油</span>
                        <span className="go_arrow"></span>
                    </span>
                </li>
                <li>
                    <span className="f_lt fc_blue">卡号</span>
                    <span className="f_rt">
                    <span className="fc_white">254487461445</span>
                        <span className="go_arrow"></span>
                    </span>
                </li>
                <li>
                    <span className="f_lt fc_blue">请输入充值金额<span className="fc_gray fz_24">（最低额度100元）</span></span>
                    <span className="f_rt">
                        <input className="czAmount" type="text" value="100"/>
                    </span>
                </li>
            </ul>
            <div style={{padding: '0 .2rem'}}>
                <span className="btn btn_primary fz_26" style={{width: "100%", height: ".45rem", lineHeight: '.45rem'}}>充值</span>
            </div>
        </div>
    }
}

export default OilCard;