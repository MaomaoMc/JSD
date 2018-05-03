import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Title from '../Title';

class ChangePwd extends Component {
    constructor (props){
        super(props);
        const hash = window.location.hash;
        let type , title;
        if(hash.indexOf("changeLoginPwd") !== -1){
            type = "1";
            title = "修改登录密码";
        }else{
            type = "2";
            title = "修改交易密码";
        }
        this.state = {
            type: type,  //1 -修改登录密码 2 - 修改交易密码
            oldpass: "",
            pass: "",
            repass: "",
            title: title,
            code: ""
        }
    }
    handleInputChange (e){  //input change event
        const type = e.type;
        const val = e.val;
        if(type === "oldpass"){
            this.setState({
                oldpass: val
            })
        }
        if(type === "pass"){
            this.setState({
                pass: val
            })
        }
        if(type === "repass"){
            this.setState({
                repass: val
            })
        }
    }
    submit() {  //提交
        const state = this.state;
        const type = state.type;
        const oldpass = state.oldpass;
        const pass = state.pass;
        const repass = state.repass;
        const self = this;
        axios.post(window.baseUrl + "/home/Member/editPass", qs.stringify({
            token: localStorage.getItem("token"),
            type: type,
            oldpass: oldpass,
            pass: pass,
            repass: repass
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === -4 || code === -5){  //旧密码不正确
                alert(data.msg);
            }
            if(code === -3){  //两次密码不一致
                alert(data.msg);
            }
            if(code === 1){  //修改成功
                alert("修改成功");
            }
            self.setState({
                code: code
            })
        })
    }
    render() {
        return <div>
            <Title title={this.state.title} code = {this.state.code} />
            <div className="account_form fz_26">
                <div>
                    <label className="fc_white">旧密码：</label>
                    <input type="password" name="" placeholder="请输入旧密码" value = {this.state.oldpass}
                    onChange = {e => {
                        this.handleInputChange({type: "oldpass", val: e.target.value})
                    }} 
                    />
                </div>
                <div>
                    <label className="fc_white">新密码：</label>
                    <input type="password" placeholder="请输入新密码" value = {this.state.pass}
                    onChange = {e => {
                        this.handleInputChange({type: "pass", val: e.target.value})
                    }}
                    />
                </div>
                <div>
                    <label className="fc_white">重复密码：</label>
                    <input type="password" placeholder="请确认新密码" value = {this.state.repass} 
                    onChange = {e => {
                        this.handleInputChange({type: "repass", val: e.target.value})
                    }}
                    />
                </div>

                <span className="btn btn_primary login_btn h_80 fz_26 f_lt mt_50" style={{ width: '100%' }}
                    onClick={e => {
                        this.submit({})
                    }}>提交</span>
            </div>
        </div>
    }
}

export default ChangePwd;