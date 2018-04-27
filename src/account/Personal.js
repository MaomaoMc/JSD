import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Tab from '../Tab';
import PersonalData from "./PersonalData";
import Bill from "./Bill";
import ClientService from "./ClientService";
import SystemNotice from "./SystemNotice";
import SystemSet from "./SystemSet";
import OilCard from "./OilCard";
import ExChangeYtf from "./ExChangeYtf";
import SwMarket from "./SwMarket";
import RobPacket from "./RobPacket";
import LuckDial from "./LuckDial";
import Lottery from "./Lottery";

import '../css/css/asset.css';
const accountMenus = [
    {
        pic: require("../img/icon_grzl_nor.png"),
        picActive: require("../img/icon_grzl_hot.png"),
        link: "/account/PersonalData",
        component: PersonalData,
        text: "个人资料"
    },
    {
        pic: require("../img/icon_zdzx_nor.png"),
        picActive: require("../img/icon_zdzx_hot.png"),
        link: "/account/Bill",
        component: Bill,
        text: "账单中心"
    },
    {
        pic: require("../img/icon_kfzx_nor.png"),
        picActive: require("../img/icon_kfzx_hot.png"),
        link: "/account/service",
        component: ClientService,
        text: "客服中心"
    },
    {
        pic: require("../img/icon_xttz_nor.png"),
        picActive: require("../img/icon_xttz_hot.png"),
        link: "/account/systemNotice",
        component: SystemNotice,
        text: "系统通知"
    },
    {
        pic: require("../img/icon_wdzd_nor.png"),
        picActive: require("../img/icon_wdzd_hot.png"),
        link: "/account/PersonalData",
        component: PersonalData,
        text: "我的战队"
    },
    {
        pic: require("../img/icon_xtss_nor.png"),
        picActive: require("../img/icon_xtss_hot.png"),
        link: "/account/systemSet",
        component: SystemSet,
        text: "系统设置"
    },
    {
        pic: require("../img/icon_ykcz_nor.png"),
        picActive: require("../img/icon_ykcz_hot.png"),
        link: "/account/oilCard",
        component: OilCard,
        text: "油卡充值"
    },
    {
        pic: require("../img/icon_ytf_nor.png"),
        picActive: require("../img/icon_ytf_hot.png"),
        link: "/account/exchangeYtf",
        component: ExChangeYtf,
        text: "兑换以太坊"
    },
    {
        pic: require("../img/icon_swsc_nor.png"),
        picActive: require("../img/icon_swsc_hot.png"),
        link: "/account/swMarket",
        component: SwMarket,
        text: "实物商城"
    },
    {
        pic: require("../img/icon_qhb_nor.png"),
        picActive: require("../img/icon_qhb_hot.png"),
        link: "/account/robPacket",
        component: RobPacket,
        text: "抢红包"
    },
    {
        pic: require("../img/icon_xuzp_nor.png"),
        picActive: require("../img/icon_xuzp_hot.png"),
        link: "/account/luckDial",
        component: LuckDial,
        text: "幸运转盘"
    },
    {
        pic: require("../img/icon_ggl_nor.png"),
        picActive: require("../img/icon_ggl_hot.png"),
        link: "/account/lottery",
        component: Lottery,
        text: "刮刮乐"
    }
];
class Personal extends Component {
    render (){
        return <div>
           <div className="assetTotal">
            <div style={{height: '100%', padding:  '0 .5rem'}}>
                <p className="fc_white fz_30 text_center" style={{lineHeight: '.35rem'}}>资产总额</p>
                <p className="fc_yellow fz_70 text_center" style={{lineHeight: '.75rem'}}>10.37612454</p>
                <div className="fc_30 fz_30 text_center over_hidden">
                    <span className="fc_blue f_lt"><span>可用JSD：</span><span className="fc_white">10.37</span></span>
                    <span className="fc_blue f_rt"><span>冻结JSD：<span className="fc_white">0</span></span></span>
                </div>
            </div>
           </div>
           <div className="account_menus f_flex">
            {
                accountMenus.map(function(item, i){
                    // let linkStyle;
                    // if(this.state.hover){
                    //     linkStyle = {backgroundImage: "url(" + item.pic + ")"}
                    // }else{
                    //     linkStyle = {backgroundImage: "url(" + item.picActive + ")"}
                    // }
                    return <div className="menus_item mt_40" key={i}>
                        <Link to = {item.link} component = {item.component}>
                            <span className="icon" style={{backgroundImage: "url(" + item.pic + ")"}} activestyle={{backgroundImage: "url(" + item.picActive + ")"}}></span>
                        </Link>
                        <div className="text fc_white fz_26 mt_10">{item.text}</div>
                    </div>
                })
            }
           </div>
           <Tab />
        </div>
    }
}

export default Personal;