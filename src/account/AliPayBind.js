import React, {Component} from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from '../Title';

const pic = require("../img/pic_morentx.png");
class AliPayBind extends Component{
    constructor (props){
        super(props);
        this.state ={
            zfb_num: "",  //账号
        }
    }
    handleInputChange (e){
        const type = e.type;
        const value = e.val;
        if(type === "zfb_num"){
            this.setState({
                zfb_num: value
            })
        }
    }
    submit (){ //提交
        const self = this;
        const zfb_num = this.state.zfb_num;
        axios.post(window.baseUrl + "/home/Member/realName", qs.stringify({
            token: localStorage.getItem("token"),
            zfb_num: zfb_num
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
        const type = this.props.match.params.type;
        console.log(type)
        return <div>
            <Title title="支付宝绑定" code = {this.state.code}/>
            <div className="account_form fz_26">
                <div>
                    <label className="fc_white">账号：</label>
                    <input type="text" name="" placeholder="请输入支付宝账号" value = {this.state.zfb_num}
                    onChange = {e => {
                        this.handleInputChange({type: "zfb_num", val: e.target.value})
                    }} 
                    />
                </div>
                {/* <div>
                    <label className="fc_white">身份证号：</label>
                    <input type="text" placeholder="请确认身份证号" value = {this.state.card_num} 
                    onChange = {e => {
                        this.handleInputChange({type: "card_num", val: e.target.value})
                    }}
                    />
                </div> */}

                <span className="btn btn_primary login_btn h_80 fz_26 f_lt mt_50" style={{ width: '100%' }}
                    onClick={e => {
                        this.submit({})
                    }}>提交</span>
            </div>
        </div>
    }
}

export default AliPayBind;