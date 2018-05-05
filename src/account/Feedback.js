import React, {Component} from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from '../Title';
import WarningDlg from '../WarningDlg';

class Feedback extends Component{
    constructor (props){
        super(props);
        this.state = {
            problem: "",
            warningDlgShow: false,
            warningText: ""
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
    submit (){ //提交留言反馈
        const self = this;
        const problem = this.state.problem;
        axios.post(window.baseUrl + "/home/Member/askService", qs.stringify({
            token: localStorage.getItem("token"),
            problem: problem
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            self.setState({
                warningDlgShow: true,
                warningText: data.msg,
                code: code
            }, function(){
                self.hanleWarningDlgTimer({code: code})
            })
        })
    }
    render (){
        return <div className="text_center">
        <Title title="留言反馈"/>
           <div className = "feedbackWrap">
               <div>
               <textarea name="" id="" cols="30" rows="10" style={{
                   backgroundColor: "transparent"
               }} placeholder = "请输入您对JSD的意见或建议：" value = {this.state.problem} onChange = {e => {
                   this.setState({
                    problem: e.target.value
                   })
               }}></textarea>
               </div>
               <span className="btn btn_primary h_80 fz_26 f_lt mt_30" style={{width: '100%', lineHeight: ".4rem"}}
              onClick={e => {
                this.submit({})
              }}>提交反馈</span>
           </div>
           {this.state.warningDlgShow ? <WarningDlg text = {this.state.warningText} /> : null}
        </div>
    }
}

export default Feedback;