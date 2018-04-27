import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import WeChat from './WeChat';
import AboutJsd from './AboutJsd';

class SystemSet extends Component{
    render (){
        return <div>
            <div className="title"><span className="arrow back_arrow"></span>系统设置<span className="refresh"></span></div>
            <ul className="lists f_flex fz_26" style={{marginTop: 0}}>
                <li>
                    <span className="f_lt fc_blue">关于JSD</span>
                    <span className="f_rt">
                        <Link to="/account/systemSet/about" component = {WeChat}><span className="go_arrow"></span>
                        </Link>
                    </span>
                </li>
                <li>
                    <span className="f_lt fc_blue">名词解释</span>
                    <span className="f_rt">
                        {/* <span className="fc_white">13952663325</span> */}
                        <span className="go_arrow"></span>
                    </span>
                </li>
                <li>
                    <span className="f_lt fc_blue">微信公众号</span>
                    <span className="f_rt">
                    <Link to="/account/systemSet/wechat" component = {WeChat}><span className="fc_white">J_SD</span>
                    </Link>
                    </span>
                </li>
                <li>
                    <span className="f_lt fc_blue">当前版本</span>
                    <span className="f_rt">
                    <span className="fc_white">1.14</span>
                    </span>
                </li>
            </ul>
            <div style={{padding: '0 .2rem'}}>
                <span className="btn btn_primary fz_26" style={{width: "100%", height: ".45rem", lineHeight: '.45rem'}}>退出程序</span>
            </div>
        </div>
    }
}

export default SystemSet;