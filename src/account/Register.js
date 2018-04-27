import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../css/css/common.css';
import '../css/css/account.css';
console.log("67yhgb")

class Register extends Component {
    register () {
        
    }
    render (){
        return <div>
            <div className="logo"></div>
            <p className="fc_white fz_30 text_center">创建账户</p>
            <div className="account_form">
                <input type="text" name="" placeholder="手机号："/>
                <div>
                    <input className="code" type="text" placeholder="验证码：" />
                    <span className="sendMessage btn btn_primary fz_26">发送短信</span>
                </div>
                <input type="text" placeholder="创建密码："/>
                <input type="text" placeholder="重复确认密码："/>
                <input type="text" placeholder="推荐人手机号或ID："/>
                <span className="btn btn_primary login_btn h_80 fz_26 f_lt mt_50" style={{width: '100%'}}
                onClick={e => {
                    this.register({})
                }}>注册</span>
                <span className="back_login f_lt block fc_gray fz_28 mt_50" style={{width: '100%'}}>
                    <Link to="/account">返回登录页面</Link></span>
            </div>
        </div>
    }
}

export default Register;