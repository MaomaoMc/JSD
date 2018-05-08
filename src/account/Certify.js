import React, {Component} from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from '../Title';
import WarningDlg from './../WarningDlg';

const pic = require("../img/pic_morentx.png");
class Certify extends Component{
    constructor (props){
        super(props);
        this.state ={
            data: {card_num: "", username: ""}, //实名认证 已认证的返回信息
            username: "",  //姓名
            card_num: "", //身份证号码
            warningDlgShow: false,
            warningText: ""
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
    hanleWarningDlgTimer (obj){  //定时关闭 警告弹窗
        const self = this;
        setTimeout(
            function(){
                self.setState({
                    warningDlgShow: false
                }, function(){
                    if(obj && obj.code === 1){  //操作成功的话  回到个人中心页面
                        window.history.back();
                    }
                })
            }
        , 1000)
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
            const data = res.data;
            const code = data.code;
            self.setState({
                warningDlgShow: true,
                warningText: data.msg,
                code: code
            }, function(){
                this.hanleWarningDlgTimer({code: code})
            })
        })
    }
    ajax(){
        const self = this;
        axios.post(window.baseUrl + "/home/Member/trueNamePic", qs.stringify({
            token: localStorage.getItem("token"),
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(code === 1){
                self.setState({
                    data: data.data
                })
            }
            self.setState({
                warningDlgShow: true,
                warningText: data.msg,
                code: code
            }, function(){
                self.hanleWarningDlgTimer()
            })
        })
    }
    componentDidMount(){
        const type = this.props.match.params.type;
        if(type == "authorized"){  //已认证的话 就显示认证的信息
            this.ajax();
        }
    }
    render (){
        const type = this.props.match.params.type;
        const data = this.state.data;
        return <div>
            <Title title="实名认证" code = {this.state.code}/>
            {type === "authorized" ? 
                <div className="certify text_center fz_26 fc_white">
                        <img src={pic} alt="" style={{width: ".6rem", height: ".6rem", marginTop: '.15rem'}} />
                        <p>{data.username}</p>
                        <p>{data.card_num}</p>
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
           {this.state.warningDlgShow ? <WarningDlg text = {this.state.warningText} /> : null}
        </div>
    }
}

export default Certify;