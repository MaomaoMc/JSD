import React, {Component} from 'react';
import Title from '../Title';

class ForgetPwd extends Component {
    render (){
        const hash = window.location.hash;
        return <div>
             <Title title={hash.indexOf("forgetLoginPwd") !== -1 ? "忘记登录密码" : "忘记交易密码"} />
            <div className="account_form fz_26">
                <div>
                    <label className="fc_white">手机号：</label>
                    <input type="text" name="" placeholder="手机号："/>
                </div>
                <div style={{borderColor: 'transparent'}}>
                    <div className="f_lt" style={{width: '2.24rem', margin: "0"}}>
                        <label className="fc_white" style={{width: "30%"}}>验证码：</label>
                        <input className="code" type="text" placeholder="验证码："  style={{width: "70%"}} />
                    </div>
                    <span className="sendMessage btn btn_primary fz_26">获取验证码</span>
                </div>
                <div>
                    <label className="fc_white">新密码：</label>
                    <input type="text" placeholder="新密码："/>
                </div>
                <div>
                    <label className="fc_white">重复密码：</label>
                    <input type="text" placeholder="重复密码："/>
                </div>
                
                <span className="btn btn_primary login_btn h_80 fz_26 f_lt mt_50" style={{width: '100%'}}
                    onClick={e => {
                        this.register({})
                }}>提交</span>
            </div>
        </div>
    }
}

export default ForgetPwd;