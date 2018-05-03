import React, {Component} from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from '../Title';

const pic = require("../img/pic_morentx.png");
class Certify extends Component{
    constructor (props){
        super(props);
        this.state ={
            username: "",  //姓名
            card_num: "" //身份证号码
        }
    }
    handleInputChange (e){
        const type = e.type;
        const value = e.val;
        if(type === "username"){
            this.setState({
                username: value
            })
        }
        if(type === "card_num"){
            this.setState({
                card_num: value
            })
        }
    }
    submit (){ //提交
        const self = this;
        const username = this.state.username;
        const card_num = this.state.card_num;
        axios.post(window.baseUrl + "/home/Member/realName", qs.stringify({
            token: localStorage.getItem("token"),
            username: username,
            card_num: card_num
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
            <Title title="实名认证" code = {this.state.code}/>
            {type === "authorized" ? 
                <div className="certify text_center fz_26 fc_white">
                        <img src={pic} alt="" style={{width: ".6rem", height: ".6rem", marginTop: '.15rem'}} />
                        <p>程开甲</p>
                        <p>231456632223232</p>
                </div> : 
                <div className="account_form fz_26">
                <div>
                    <label className="fc_white">真实姓名：</label>
                    <input type="text" name="" placeholder="请输入真实姓名" value = {this.state.username}
                    onChange = {e => {
                        this.handleInputChange({type: "username", val: e.target.value})
                    }} 
                    />
                </div>
                <div>
                    <label className="fc_white">身份证号：</label>
                    <input type="text" placeholder="请确认身份证号" value = {this.state.card_num} 
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
            }
           
        </div>
    }
}

export default Certify;