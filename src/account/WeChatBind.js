import React, {Component} from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from '../Title';

const pic = require("../img/pic_morentx.png");
class WeChatBind extends Component{
    constructor (props){
        super(props);
        this.state ={
            wx_num: "",  //账号
        }
    }
    handleInputChange (e){
        const type = e.type;
        const value = e.val;
        if(type === "username"){
            this.setState({
                wx_num: value
            })
        }
    }
    submit (){ //提交
        const self = this;
        const wx_num = this.state.wx_num;
        axios.post(window.baseUrl + "/home/Member/bindWxNum", qs.stringify({
            token: localStorage.getItem("token"),
            wx_num: wx_num
        })).then(function(res){
            console.log(res, "ftdg")
            const data = res.data;
            const code = data.code;
            if(code === -3){ //身份证号码不符合规则
                alert(data.msg);
            }
            if(code === 1){ //成功
                alert("认证成功");
            }
            self.setState({
                code: code
            })
        })
    }
    render (){
        return <div>
            <Title title="微信绑定" code = {this.state.code}/>
            <div className="account_form fz_26">
                <div>
                    <label className="fc_white">账号：</label>
                    <input type="text" name="" placeholder="请输入微信账号" value = {this.state.wx_num}
                    onChange = {e => {
                        this.handleInputChange({type: "wx_num", val: e.target.value})
                    }} 
                    />
                </div>
                <div>
                    <label className="fc_white">登陆密码：</label>
                    <input type="text" placeholder="请确认微信登录密码" value = {this.state.card_num} 
                    onChange = {e => {
                        this.handleInputChange({type: "card_num", val: e.target.value})
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

export default WeChatBind;