import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Title from '../Title';
import Tab from '../Tab';
import WarningDlg from './../WarningDlg';

const personal_data = {
    profile_pic: require("../img/icon_grzl_nor.png")
};
const baseUrl = window.baseUrl;
const sundryData = localStorage.getItem("sundryData");
const token = localStorage.getItem("token");
class PersonalData extends Component {
    constructor (props){
        super(props);
        
        this.state = {
            profile_pic: (baseUrl + JSON.parse(sundryData).adminpic), //头像
            data: {},  //个人数据
            warningDlgShow: false,
            warningText: ""
        }
    }
    hanleWarningDlgTimer (){  //定时关闭 警告弹窗
        const self = this;
        setTimeout(
            function(){
                self.setState({
                    warningDlgShow: false
                })
            }
        , 1000)
    }
    setPhotoEvent (){
        const self = this;
        axios.post(window.baseUrl +  "/home/Member/editphoto?token=" + token, qs.stringify({
            pic: self.state.profile_pic
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 10002){
                window.tokenLoseFun();
            }
            self.setState({
                warningDlgShow: true,
                warningText: data.msg
            }, function(){
                self.hanleWarningDlgTimer();
            })
        });
    }
    uploadedFile (e){ //修改头像
        const self = this;
        let file = document.getElementById("photo").files[0];
        let formData = new FormData()  // 创建form对象
        formData.append('pic', file)  // 通过append向form对象添加数据
        axios.post(baseUrl +  "/home/Base/uploadPic?token=" + token, formData, {
            transformRequest: [(data) => data],
            headers: {}
        }).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 10002){
                window.tokenLoseFun();
            }
            else if(code === 1){ //成功
                self.setState({
                    profile_pic: baseUrl +  data.data
                }, function(){  //保存图片
                    self.setPhotoEvent()
                })
            } else {
                self.setState({
                    warningDlgShow: true,
                    warningText: data.msg
                }, function(){
                    self.hanleWarningDlgTimer();
                })
             }
            self.setState({
                code: code
            })
        })
    }
    ajax (){ //个人资料数据
        const self = this;
        axios.post(baseUrl +  "/home/Member/personalData", qs.stringify({
            token: token
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 10002){
                window.tokenLoseFun()
            }
            else if(code === 1){ //成功
                self.setState({
                    data: data.data,
                    profile_pic: data.data.pic
                })
            } else {
                self.setState({
                    warningDlgShow: true,
                    warningText: data.msg
                }, function(){
                    self.hanleWarningDlgTimer();
                })
             }
            self.setState({
                code: code
            })
        })
    }
    componentDidMount (){
        this.ajax();
    }
    render (){
        const data = this.state.data;
        const profile_pic = this.state.profile_pic;
        return <div className="personalData">
            <Title title="个人资料" code = {this.state.code}/>
            <div className="file"  >
                <form action="" id="form"> 
                    <input type="file" name="photo" id="photo" 
                        onChange = {e => {this.uploadedFile({value: e.target.value, obj: e.target})}}
                         />
                         <img src={profile_pic === "" ? (baseUrl + JSON.parse(sundryData).adminpic) : profile_pic} alt=""/>
                       
                </form>
            </div>  
            <ul className="fz_30 f_flex overview">
                <li>
                    <p className="fc_blue">上级ID</p>
                    <p className="fc_white">{data.tui_num}</p>
                </li>
                <li>
                    <p className="fc_blue">我的ID</p>
                    <p className="fc_white">{data.id_num}</p>
                </li>
                <li>
                    <p className="fc_blue">等级</p>
                    <p className="fc_white">{data.level_msg}</p>
                </li>
            </ul>
            <ul className="lists f_flex fz_26 mb_100">
                <li>
                    <span className="f_lt fc_blue">手机号验证</span>
                    <span className="f_rt">
                        <span className="fc_white">{data.phone}</span>
                        {data.phone !== "" ?
                            <span className="mark authenticated">已认证</span> :
                            <span className="mark unauthorized">已认证</span>
                        }
                        
                    </span>
                </li>
                <li>
                    {data.username === "" ? <Link to = "/account/certify/unauthorized">
                        <span className="f_lt fc_blue">实名认证</span>
                        <span className="f_rt">
                            <span className="fc_white">{data.username}</span>
                            <span className="mark unauthorized">未认证</span>
                        </span>
                    </Link> :  <Link to = "/account/certify/authorized"><span><span className="f_lt fc_blue">实名认证</span>
                            <span className="f_rt">
                                <span className="fc_white">{data.username}</span>
                                <span className="mark authenticated">已认证</span> 
                            </span>
                        </span></Link>
                    }
                </li>
                <li>
                    <Link to = "/account/shuaCertify/" >
                        <span className="f_lt fc_blue">刷脸认证</span>
                        <span className="f_rt">
                            <span className="mark unauthorized">未认证</span>
                        </span>
                    </Link>
                </li>
                <li style={{height: ".21rem"}}></li>
                <li>
                    <Link to="/account/weChatBind">
                        <span className="f_lt fc_blue">微信</span>
                        <span className="f_rt">
                            <span className="fc_white">{data.wx_num}</span>
                            <span className="go_arrow"></span>
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to="/account/aliPayBind">
                        <span className="f_lt fc_blue">支付宝</span>
                        <span className="f_rt">
                            <span className="fc_white">{data.zfb_num}</span>
                            <span className="go_arrow"></span>
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to="/account/changeLoginPwd">
                        <span className="f_lt fc_blue">修改登录密码</span>
                        <span className="f_rt">
                        <span className="go_arrow"></span>
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to="/account/changeTradePwd"> 
                        <span className="f_lt fc_blue">修改交易密码</span>
                        <span className="f_rt">
                        <span className="go_arrow"></span> 
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to = "/account/invite">
                        <span className="f_lt fc_blue">我的推广</span>
                        <span className="f_rt">
                            <span className="go_arrow"></span> 
                        </span>
                    </Link>
                </li>
            </ul>
            {this.state.warningDlgShow ? <WarningDlg text = {this.state.warningText} /> : null}
           <Tab />
        </div>
    }
}

export default PersonalData;