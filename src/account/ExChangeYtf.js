import React, {Component} from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from '../Title';
import WarningDlg from './../WarningDlg';

const ytf_pic = require("../img/icon_ytf_nor.png")
class ExchangeYtf extends Component{
    constructor (props){
        super(props);
        this.state = {
            name: "",
            num: "",
            jd_num: 0,
            warningDlgShow: false,
            warningText: ""
        }
    }
    handleInputChange (e){
        const type = e.type;
        if(type === "name"){
            this.setState({
                name: e.value
            });
        }
        if(type === "num"){
            this.setState({
                num: e.value
            });
        }
        if(type === "jd_num"){
            this.setState({
                jd_num: e.value
            });
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
    handleSubmit (){ //兑换
        const self = this;
        const name = this.state.name;
        const num = this.state.num;
        const jd_num = this.state.jd_num;
        axios.post(window.baseUrl + "/home/Member/etheric", qs.stringify({
            token: localStorage.getItem("token"),
            name: name,
            num: num,
            jd_num: jd_num,
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 10002){ //token失效
                window.tokenLoseFun();
            }
            self.setState({
                warningDlgShow: true,
                warningText: data.msg,
                code: code
            }, function(){
                this.hanleWarningDlgTimer()
            })
        })
    }
    render (){
        return <div className="text_center">
        <Title title="兑换以太坊"/>
           <div className="profile">
            <img src={ytf_pic} alt=""/>
           </div>
            <ul className="lists f_flex fz_26" style={{marginTop: 0}}>
                <li>
                    <span className="f_lt fc_blue">姓名</span>
                    <span className="f_rt">
                        <input className = "card_num" type="text" placeholder = "输入以太坊姓名" value = {this.state.oil_num}
                         onChange = {e => {
                            this.handleInputChange({type: "name", value: e.target.value})
                        }}
                        />
                    </span>
                </li>
                <li>
                    <span className="f_lt fc_blue">账号</span>
                    <span className="f_rt">
                        <input className = "card_num" type="text" placeholder = "输入以太坊账号" value = {this.state.oil_num}
                         onChange = {e => {
                            this.handleInputChange({type: "num", value: e.target.value})
                        }}
                        />
                    </span>
                </li>
                <li>
                    <span className="f_lt fc_blue">请输入兑换JSD</span>
                    <span className="f_rt">
                        <input className="czAmount" type="text" value = {this.state.jd_num}
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
                    this.handleSubmit()
                }}
                >兑换</span>
            </div>
            {this.state.warningDlgShow ? <WarningDlg text = {this.state.warningText} /> : null}
        </div>
    }
}

export default ExchangeYtf;