import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import ActionSheet from 'action-sheet';
import Title from './../Title';
import WarningDlg from './../WarningDlg';

const oilCard_pic = require("../img/icon_ykcz_nor.png");
class OilCard extends Component{
    constructor (props){
        super(props);
        this.state = {
            oil_num: "", //油卡号
            oil_name: "", //姓名
            name: "", //姓名
            type: "",  //油卡类型
            jd_num: 100, //金币
            idcard: "",
            warningDlgShow: false,
            warningText: ""
        }
    }
    handleInputChange (e){ // inpu change event
        const type = e.type;
        if(type === "oil_num"){
            this.setState({
                oil_num: e.value
            });
        }
        if(type === "idcard"){
            this.setState({
                idcard: e.value
            });
        }
        if(type === "oil_name"){
            this.setState({
                oil_name: e.value
            });
        }
        if(type === "jd_num"){
            this.setState({
                jd_num: e.value
            });
        }
    }
    hanleWarningDlgTimer (obj){  //定时关闭 警告弹窗
        const self = this;
        setTimeout(
            function(){
                self.setState({
                    warningDlgShow: false
                }, function(){
                    if(obj && obj.code === 1){  //成功了 返回个人中心页面
                        window.history.back();
                    }
                })
            }
        , 1000)
    }
    handleReChange (){ //油卡充值
        const state = this.state;
        const oil_num = state.oil_num;
        const oil_name = state.oil_name;  //姓名
        const type = state.type;
        const idcard = state.idcard;
        const jd_num = state.jd_num;
        const self = this;
        axios.post(window.baseUrl + "/home/Member/oilCard", qs.stringify({
            token: localStorage.getItem("token"),
            oil_num: oil_num,
            oil_name: oil_name,
            type: type,
            idcard: idcard,
            jd_num: jd_num,
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 10002){
                localStorage.removeItem("logined");
                localStorage.removeItem("sundryData");
            }
            self.setState({
                warningDlgShow: true,
                warningText: data.msg,
                code: code
            }, function(){
                this.hanleWarningDlgTimer({code: code})
            })
        })
    }
    renderOilCardType (name, type, that){
        this.setState({
            name : name,
            type: type
        }, function(){
            that.hide();
        })
    }
    handleSltOilCardType (){  //选择油卡类型
        const self = this;
        var as = new ActionSheet({
            buttons: {
                '中石油': function(e){
                   self.renderOilCardType("中石油", "1", this)
                },
                '中石化': function(e){
                    self.renderOilCardType("中石化", "2", this)
                },
            }
        });
        as.el.css({ //抽屉菜单的样式自定义
            color: "black",
            "font-size": ".12rem"
        })
        as.show();
    }
    render (){
        if(this.state.code === 10002){  //token 过期
            return (
                <Redirect to="/"/>
            )
        }
        return <div className="text_center">
            <Title title="油卡充值"/>
           <div className="profile">
            <img src={oilCard_pic} alt=""/>
           </div>
            <ul className="lists f_flex fz_26" style={{marginTop: 0}}>
                <li onClick = {e => {
                            this.handleSltOilCardType()
                        }}>
                    <span className="f_lt fc_blue">油卡类型</span>
                    <span className="f_rt">
                        <span className="fc_white">{this.state.name}</span>
                        <span className="go_arrow" 
                       
                        ></span>
                    </span>
                </li>
                <li>
                    <span className="f_lt fc_blue">卡号</span>
                    <span className="f_rt">
                        <input className = "card_num" type="text" placeholder = "输入油卡卡号" value = {this.state.oil_num}
                         onChange = {e => {
                            this.handleInputChange({type: "oil_num", value: e.target.value})
                        }}
                        />
                    </span>
                </li>
                <li>
                    <span className="f_lt fc_blue">身份证号码</span>
                    <span className="f_rt">
                        <input className = "card_num" type="text" placeholder = "输入身份证号码" value = {this.state.idcard}
                         onChange = {e => {
                            this.handleInputChange({type: "idcard", value: e.target.value})
                        }}
                        />
                    </span>
                </li>
                <li>
                    <span className="f_lt fc_blue">姓名</span>
                    <span className="f_rt">
                        <input className = "card_num" type="text" placeholder = "输入姓名" value = {this.state.oil_name}
                         onChange = {e => {
                            this.handleInputChange({type: "oil_name", value: e.target.value})
                        }}
                        />
                    </span>
                </li>
                <li>
                    <span className="f_lt fc_blue">请输入充值JSD<span className="fc_gray fz_24">（最低额度100JSD）</span></span>
                    <span className="f_rt">
                        <input className="czAmount" type="text" value={this.state.jd_num} 
                        onChange = {e => {
                            this.handleInputChange({type: "jd_num", value: e.target.value})
                        }}
                        />
                    </span>
                </li>
            </ul>
            <div style={{padding: '0 .2rem'}}>
                <span className="btn btn_primary fz_26" style={{width: "100%", height: ".45rem", lineHeight: '.45rem'}}
                onClick = {e => {
                    this.handleReChange()
                }}
                >充值</span>
            </div>
            {this.state.warningDlgShow ? <WarningDlg text = {this.state.warningText} /> : null}
        </div>
    }
}

export default OilCard;