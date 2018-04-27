import React, {Component} from 'react';

const wechat_gzh = require("../img/wechatgzh.jpg");
const wechat = require("../img/icon_weixin.png");
class ClientService extends Component{
    render (){
        return <div>
            <div className="title"><span className="arrow back_arrow"></span>客服中心<span className="refresh"></span></div>
            <div className="clientService fc_white fz_24">
                <p>
                    <img className="wechat" src={wechat}></img>
                    <span>JSD微信官方公众号：</span>
                </p>
                <img className="weChatgzh" src={wechat_gzh} alt=""/>
                <p>
                    <span className="icon kefu"></span>
                    <span>官方微信客服</span>
                </p>
                <div>
                    <p>官方微信客服1：jsd2325652</p>
                    <p>官方微信客服2：jsd2325652</p>
                    <p>官方微信客服3：jsd2325652</p>
                    <p>官方微信客服4：jsd2325652</p>
                    <p>官方微信客服5：jsd2325652</p>
                </div>
            </div>
        </div>
    }
}

export default ClientService;