import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import ActionSheet from 'action-sheet';

const oilCard_pic = require("../img/icon_ykcz_nor.png");
class OilCard extends Component{
    constructor (props){
        super(props);
        this.state = {
            oil_num: "", //油卡号
            oil_name: "", //油卡名称
            type: "",  //油卡类型
            jd_num: 100, //金币
        }
    }
    handleInputChange (e){ //输入金币数
        const type = e.type;
        if(type === "jd_num"){
            this.setState({
                jd_num: e.value
            });
        }
        if(type === "oil_num"){
            this.setState({
                oil_num: e.value
            });
        }
    }
    handleReChange (){ //油卡充值
        const state = this.state;
        const oil_num = state.oil_num;
        const type = state.type;
        const jd_num = state.jd_num;
        const self = this;
        if(type === ""){
            alert("请先选择要充值的油卡类型");
            return;
        }
        if(oil_num === ""){
            alert("油卡卡号不能为空");
            return;
        }
        if(jd_num === ""){
            alert("充值金额不能为空");
            return;
        }
        axios.post(window.baseUrl + "/home/Member/oilCard", qs.stringify({
            token: localStorage.getItem("token"),
            oil_num: state.oil_num,
            oil_name: state.oil_name,
            type: state.type,
            jd_num: state.jd_num,
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 10002){
                localStorage.removeItem("logined");
            }
            if(code === 1){ //成功
                alert("充值成功");
            }
            self.setState({
                code: code
            })
        })
    }
    renderOilCardType (name, type, that){
        this.setState({
            oil_name : name,
            type: type
        }, function(){
            that.hide();
        })
    }
    handleSltOilCardType (){  //选择油卡类型
        const self = this;
        let type;
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
            <div className="title"><span className="arrow back_arrow"></span>油卡充值<span className="refresh"></span></div>
           <div className="profile">
            <img src={oilCard_pic} alt=""/>
           </div>
            <ul className="lists f_flex fz_26" style={{marginTop: 0}}>
                <li>
                    <span className="f_lt fc_blue">油卡类型</span>
                    <span className="f_rt">
                        <span className="fc_white">{this.state.oil_name}</span>
                        <span className="go_arrow" 
                        onClick = {e => {
                            this.handleSltOilCardType()
                        }}
                        ></span>
                    </span>
                </li>
                <li>
                    <span className="f_lt fc_blue">卡号</span>
                    <span className="f_rt">
                        {/* <span className="fc_white">{this.state.oil_num}</span>
                        <span className="go_arrow"></span> */}
                        <input className = "card_num" type="text" placeholder = "输入油卡卡号" value = {this.state.oil_num}
                         onChange = {e => {
                            this.handleInputChange({type: "oil_num", value: e.target.value})
                        }}
                        />
                    </span>
                </li>
                <li>
                    <span className="f_lt fc_blue">请输入充值金额<span className="fc_gray fz_24">（最低额度100元）</span></span>
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
        </div>
    }
}

export default OilCard;