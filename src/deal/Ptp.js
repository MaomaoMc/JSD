import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import WarningDlg from './../WarningDlg';

class Ptp extends Component {
    constructor (props){
        super(props);
        this.state = {
            buy_num: "",
            price: "",
            num: "",
            warningDlgShow: false,
            warningText: ""
        }
    }
    handleInputChange (e){
        const type = e.type;
        const val = e.value;
        if(type === "buy_num"){
            this.setState({
                buy_num: val
            })
        }
        if(type === "num"){
            this.setState({
                num: val
            })
        }
        if(type === "price"){
            this.setState({
                price: val
            })
        }
    }
    hanleWarningDlgTimer (){  //定时关闭 警告弹窗
        const self = this;
        setTimeout(
            function(){
                self.setState({
                    warningDlgShow: false
                })
            }
        , 1000)
    }
    handleSell (){  //卖出
        const token = localStorage.getItem("token");
        const buy_num = this.state.buy_num;
        const price = this.state.price;
        const num = this.state.num;
        const self = this;
        // if(buy_num === ""){
        //     alert("买家ID号不能为空");
        //     return;
        // }
        // if(num === ""){
        //     alert("售出数量不能为空");
        //     return;
        // }
        // if(price === ""){
        //     alert("约定价格不能为空");
        //     return;
        // }
        axios.post(window.baseUrl + "/home/Trade/faceTrade", qs.stringify({
            token : token,
            buy_num: buy_num,
            price: price,
            num: num
        })).then(function(res){
            const data = res.data;
            const code = data.code;
            if(data.code === -6){  //卖家不存在
                self.setState({
                    buy_num: "",
                    warningDlgShow: true,
                    warningText: "卖家不存在"
                }, function(){
                    this.hanleWarningDlgTimer();
                })
            }else if(data.code === 1){  //操作成功
                self.setState({
                    buy_num: "",
                    num: "",
                    price: "",
                    warningDlgShow: true,
                    warningText: "卖出成功"
                }, function(){
                    this.hanleWarningDlgTimer();
                })
            }else{
                self.setState({
                    warningDlgShow: true,
                    warningText: data.msg
                }, function(){
                    self.hanleWarningDlgTimer();
                })
            }
            self.setState({
                code: code
            })
        })
    }
    render(){
        if(this.state.code === 10002){  //token 过期
            localStorage.removeItem("logined")
            return (
                <Redirect to="/"/>
            )
        }
        return <div style={{paddingBottom: "2rem"}}> 
            <div className="ptpFrom mt_20">
                <ul className="f_flex">
                    <li>
                        <span>ID</span>
                        <input type="text" placeholder = "请输入买家的ID号" value = {this.state.buy_num}
                        onChange = {e => {
                            this.handleInputChange({type: "buy_num", value: e.target.value})
                        }}
                        />
                    </li>
                    <li>
                        <span>数量</span>
                        <input type="text" placeholder = "请输入售出的数量" value = {this.state.num}
                         onChange = {e => {
                            this.handleInputChange({type: "num", value: e.target.value})
                        }}
                        />
                    </li>
                    <li>
                        <span>约定价</span>
                        <input type="text" placeholder = "请输入约定价格" value = {this.state.price}
                         onChange = {e => {
                            this.handleInputChange({type: "price", value: e.target.value})
                        }}
                        />
                    </li>
                </ul>
                <p className="fz_18 fc_white mt_10">*交易手续费20%；如转入100JSD，系统将扣120JSD。</p>
                <span className="btn btn_orange block" style={{margin: '.25rem auto', display: 'block'}}
                onClick = {e => {
                    this.handleSell()
                }}
                >卖出</span>
            </div>
            {this.state.warningDlgShow ? <WarningDlg text = {this.state.warningText} /> : null}
        </div>
    }
}

export default Ptp;