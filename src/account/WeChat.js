import React, {Component} from 'react';
import Title from '../Title';

const wechat_gzh = require("../img/wechatgzh.jpg");
const wechat = require("../img/icon_weixin.png");
class WeChat extends Component{
    render (){
        return <div>
            <Title title = "微信公众号"/>
            <div className="text_center fz_24">
                <p class="fc_white" style={{lineHeight: '.8rem'}}>
                    <img className="wechat" src={wechat} alt="" />
                    <span>JSD微信官方公众号：</span>
                </p>
                <img className="weChatgzh" src={wechat_gzh} alt=""/>
            </div>
        </div>
    }
}

export default WeChat;