import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import '../css/css/deal.css';

const priceItems = {
    price: 10.71,
    high: 10.71,
    amount: 2683
}


class PriceItem extends Component {
    constructor (props){
        super(props);
        this.state = {
            data: {},
            code: ""
        }
    }
    componentDidMount (){
        this.ajax();
    }
    ajax (){
        const self = this;
       axios.post(window.baseUrl + "/home/Trade/tradeMsg", qs.stringify({
        token: localStorage.getItem("token")
       })).then(function(res){
           const data = res.data;
           const code = data.code;
           if(code === 1){ //成功
                self.setState({
                    data: data.data,
                })
            }
            self.setState({
                code: code
            })
       })
    }
    render (){
        const data = this.state.data;
        console.log(data, 'data')
        if(this.state.code === 10002){  //token 过期
            return (
                <Redirect to="/"/>
            )
        }
        return <div className="priceItems f_flex">
            <div className="price">
                <span style={{fontSize: ".35rem"}}>{data.newPrice}</span>
                <span className="fz_30">JSD</span>
            </div>
            <div className="items fz_30">
                <p>高：{data.topPrice}</p>
                <p>量：{data.num}</p>
            </div>
        </div>
    }
}

export default PriceItem;