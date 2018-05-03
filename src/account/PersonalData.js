import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Title from '../Title';
import Tab from '../Tab';
import Certify from './Certify';
import ChangeLoginPwd from './ChangeLoginPwd';
import ChangeTradePwd from './ChangeTradePwd';
import CreditCertify from './CreditCertify';
import SetHead from './SetHead';

const personal_data = {
    profile_pic: require("../img/icon_grzl_nor.png")
};
class PersonalData extends Component {
    constructor (props){
        super(props);
        const sundryData = localStorage.getItem("sundryData");
        console.log(window.baseUrl + JSON.parse(sundryData).adminpic, 'sundryData')
        this.state = {
            profile_pic: (window.baseUrl + JSON.parse(sundryData).adminpic)
        }
    }
    uploadedFile (e){ //修改头像
        const self = this;
        let file = document.getElementById("photo").files[0]
        let formData = new FormData()  // 创建form对象
        formData.append('pic', file)  // 通过append向form对象添加数据
        axios.post(window.baseUrl +  "/home/Base/uploadPic?token=" + localStorage.getItem("token"), formData, {
            transformRequest: [(data) => data],
            headers: {}
        }).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 10002){
                localStorage.removeItem("logined");
            }
            if(code === 1){ //成功
                self.setState({
                    profile_pic: window.baseUrl +  data.data
                })
            }
            self.setState({
                code: code
            })
        })
    }
    render (){
        return <div className="personalData">
            <Title title="个人资料"/>
            <div className="file" style={{backgroundImage: "url(" + this.state.profile_pic + ")"}}>
                <form action="" id="form">
                    <input type="file" name="photo" id="photo" 
                        onChange = {e => {this.uploadedFile({value: e.target.value, obj: e.target})}}
                        />
                </form>
            </div>  
            <ul className="fz_30 f_flex overview">
                <li>
                    <p className="fc_blue">上级ID</p>
                    <p className="fc_white">35025</p>
                </li>
                <li>
                    <p className="fc_blue">我的ID</p>
                    <p className="fc_white">35025</p>
                </li>
                <li>
                    <p className="fc_blue">等级</p>
                    <p className="fc_white">普通矿工</p>
                </li>
            </ul>
            <ul className="lists f_flex fz_26 mb_100">
                <li>
                    <span className="f_lt fc_blue">手机号验证</span>
                    <span className="f_rt">
                        <span className="fc_white">13952663325</span>
                        <span className="mark authenticated">已认证</span>
                    </span>
                </li>
                <li>
                    <span className="f_lt fc_blue">实名认证</span>
                    <span className="f_rt">
                        <span className="fc_white">林阿龙</span>
                        <span className="mark authenticated"><Link to = "/account/certify" component = {Certify}>已认证</Link></span>
                    </span>
                </li>
                <li>
                    <span className="f_lt fc_blue">银行卡认证</span>
                    <span className="f_rt">
                        <span className="fc_white">建设银行</span>
                        <span className="mark authenticated"><Link to = "/account/creditCertify" component = {CreditCertify}>已认证</Link></span>
                    </span>
                </li>
                <li>
                    <span className="f_lt fc_blue">刷脸认证</span>
                    <span className="f_rt">
                        <span className="mark unauthorized">未认证</span>
                    </span>
                </li>
                <li style={{height: ".21rem"}}></li>
                <li>
                    <span className="f_lt fc_blue">微信</span>
                    <span className="f_rt">
                        <span className="fc_white">13952663325</span>
                        <span className="go_arrow"></span>
                    </span>
                </li>
                <li>
                    <span className="f_lt fc_blue">支付宝</span>
                    <span className="f_rt">
                        <span className="fc_white">13952663325</span>
                        <span className="go_arrow"></span>
                    </span>
                </li>
                <li>
                    <span className="f_lt fc_blue">虚拟钱包</span>
                    <span className="f_rt">
                        <span className="go_arrow"></span>
                    </span>
                </li>
                <li>
                    <span className="f_lt fc_blue">修改登录密码</span>
                    <span className="f_rt">
                    <Link to="/account/changeLoginPwd" component = {ChangeLoginPwd}><span className="go_arrow"></span></Link>
                    </span>
                </li>
                <li>
                    <span className="f_lt fc_blue">修改交易密码</span>
                    <span className="f_rt">
                       <Link to="/account/changeTradePwd" component = {ChangeTradePwd}> <span className="go_arrow"></span> </Link>
                    </span>
                </li>
            </ul>
           <Tab />
        </div>
    }
}

export default PersonalData;