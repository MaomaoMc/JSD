import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Title from '../Title';

class ChangeLoginPwd extends Component {
    render (){
        return <div>
            <Title title="修改登录密码"/>
            <div className="account_form">
                <input type="text" name="" placeholder="旧密码："/>
                <input type="text" placeholder="新密码："/>
                <input type="text" placeholder="重复密码："/>
                <span className="btn btn_primary submit_btn h_80 fz_26 f_lt mt_50" style={{width: '100%'}}
                onClick={e => {
                    this.register({})
                }}>提交</span>
            </div>
        </div>
    }
}

export default ChangeLoginPwd;