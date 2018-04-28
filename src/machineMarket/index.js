import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Tab from './../Tab';
import Title from './../Title';
import axios from "axios";
import qs from 'qs';
import './../css/css/machineM.css'; //机市css

const baseUrl = window.baseUrl;
class MachineM extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: [],
            token: "",
            id: "",
          dlgShow: false,
          jsdShortDlgShow: false,
          tradePassPwd: ""
        };
      }
    handlePwdEvent (e){  //交易密码
        this.setState({
            tradePassPwd: e.val
        })
    }
    handleBayEvent (e){  //购买矿机
        this.setState({
            dlgShow: true,
            id: e.id
        })
    }
    handleDlgEvent (e){  //取消购买 或者确定购买
        const type = e.type;
        const token = this.state.token;
        const id = this.state.id;
        const tradePassPwd = this.state.tradePassPwd;
        if(type === "cancel"){  //取消
            this.setState({
                dlgShow: false,
                id: ""
            })
        }else{  //如果是 确定的话  
            const self = this;
            axios.post(baseUrl + "/home/Index/buyMill", qs.stringify({
                token: token,
                id: id,
                pass: tradePassPwd
            })).then(re => {
                const data = re.data;
                const code = data.code;
                if(code === 1){ //购买成功
                    this.setState({
                        dlgShow: false,
                        tradePassPwd: ""
                    })
                }
                if(code === -3){//如果jsd余额不足
                    this.setState({
                        dlgShow: false,
                        jsdShortDlgShow: true,
                        tradePassPwd: ""
                    }, function(){
                        var timer = setTimeout(
                            function(){
                                self.setState({
                                    jsdShortDlgShow: false
                                })
                            }
                        , 1000)
                    })
                }
            })
             
        }
    }
    ajax (){
        const token = localStorage.getItem("token");
        const self = this;
        axios.post(baseUrl + "/home/Index/millShop", qs.stringify({
            token: token,
          })).then(re=>{
            const data = re.data;
            const code = re.code;
           if(data.code === 10002){
               localStorage.removeItem("logined");
               
           }
           if(data.code === 1){ //成功
            self.setState({
                data: data.data,
                token: token
            })
           }
          })
    }
    componentDidMount (){
        this.ajax();
    }
    render(){
        const self = this;
        const data = this.state.data;
        return <div>
            <Title  title="机市"/>
            <div style={{padding: '0 .11rem'}}>
                {
                     data.length > 0 && data.map(function (item, i) {
                        return <div key={i} className="item">
                            <div className="goodPic f_lt" style={{background: "url(" + baseUrl + item.pic + ") no-repeat 50% 50%"}}></div>
                            <div className="goodItem f_rt">
                                <h6 className="fz_30">{item.name}</h6>
                                <div>
                                    <div className="f_lt fz_22">
                                        <p>算力：{item.force}</p>
                                        <p>运行周期：{item.time}</p>
                                        <p>收益总量：{item.earning}</p>
                                    </div>
                                    <div className="cart fz_26" onClick = { e => {
                                            self.handleBayEvent({id: item.id})
                                        }}>
                                        <i className="cart_icon"></i>
                                       <span> {item.price} JSD</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
            <div className={this.state.dlgShow ? "dialog dlgPayKj" : "dialog dlgPayKj hide"}>
                <p className="dlg_tit fc_white">购买矿机</p>
                <div className="dlg_form">
                    <input className="b_blue1 mt_40 fc_white" type="text" placeholder = "请输入交易密码" 
                    value = {this.state.tradePassPwd} 
                    onChange = {e => {
                        this.handlePwdEvent({val: e.target.value})
                    }}
                    />
                    <div className="over_hidden" style={{padding: "0 .14rem"}}>
                        <span className="btn fz_24 fc_white f_lt" onClick = {e => {
                            self.handleDlgEvent({type: "cancel"})
                        }}>取消</span>
                        <span className="btn fz_24 fc_white f_rt" onClick = {e => {
                            self.handleDlgEvent({type: "confirm"})
                        }}>确定</span>
                    </div>
                </div>
            </div>
            <div className={this.state.jsdShortDlgShow ? "dialog jsdShortDlg fc_white fz_24" : "dialog jsdShortDlg fc_white fz_24 hide"}>JSD不足</div>
            <Tab />
        </div>
    }
}

export default MachineM;