import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Title from './../Title';
import Shadow from "./../Shadow";
import DealItems from '../deal/DealItems';
import WarningDlg from './../WarningDlg';
import '../css/css/deal.css';

const wenhao = require("../img/icon_xinshouwenti.png");

class GuaDan extends Component {
    static defaultProps = {
        sundryData: JSON.parse(localStorage.getItem("sundryData")) || { newPrice: 0, less_bee: 0, more_bee: 0 },
        hash: window.location.hash
    }
    constructor(props) {
        super(props);
        const hash = window.location.hash;
        const index = hash.indexOf("newerGuad");
        const sundryData = this.props.sundryData;
        const newPrice = sundryData.newPrice;  //当前价格
        const less_price = sundryData.less_bee * newPrice;
        const more_price = sundryData.more_bee * newPrice;
        let page_type, tip,
            percent = (newPrice - less_price) / (more_price - less_price); //圆点 在线上的 百分多少的位置
        if (index === -1) { // 高手挂单
            page_type = "2";
            tip = "算力≥5用户可进行10-200JSD议价交易！";
        } else {  //新手挂单
            page_type = "1";
            tip = "认证用户可进行1-10JSD议价交易！";
        }
        this.state = {
            page_type: page_type,
            tip: tip,
            price: newPrice,
            count: 1,
            newPrice: newPrice,
            percent: percent,
            less_price: less_price,
            more_price: more_price,
            barLeft: 0,
            type: "kanban", // 默认看板选中
            tabIndex: 0,
            page: 1, //默认第一页啊
            lists: [],
            dlgShow: false,  //支付密码弹窗
            pass: "", //支付密码
            warningDlgShow: false,
            warningText: "", //警告文字
        };
    }
    hanleWarningDlgTimer (obj){  //定时关闭 警告弹窗
        const self = this;
        setTimeout(
            function(){
                self.setState({
                    warningDlgShow: false
                }, function(){
                    if(obj){
                        const code = obj.code;
                        if(code === 1){ //成功
                           window.location.reload()
                        }
                    }
                })
            }
        , 1000)
    }
    handlePrice(e) {  //加价/减价
        const type = e.type;
        let price = parseFloat(this.state.price);
        if (type === "add") { //加价
            price = (price + 0.01).toFixed(2);
            if (price > this.state.more_price) {  //不能大于最大值 
                alert("不能大于最大值");
                return;
            }
        }
        if (type === "reduce") { //加价
            price = (price - 0.01).toFixed(2);
            if (price < this.state.less_price) {  //不能小于最小值 
                alert("不能小于最小值")
            }
        }
        this.setState({
            price: price
        })
    }
    handleIptChange(e) { // input change event
        const type = e.type;
        const value = e.value;
        this.setState({
            [type]: value
        })
    }
    handleDealTab(e) {  //tab切换
        const type = e.type;
        const tabIndex = e.tabIndex;
        this.setState({
            type: type,
            tabIndex: tabIndex
        })
    }
    componentDidMount() {
        const self = this;
        var scroll = document.getElementById('scroll');
        const bar = document.getElementById("bar");
        var barleft = 0;
        bar.ontouchstart = function (event) {
            var event = event || window.event;
            var leftVal = event.changedTouches[0].clientX - this.offsetLeft;
            var that = this;
            // 拖动一定写到 down 里面才可以
            document.ontouchmove = function (event) {
                var event = event || window.event;
                barleft = event.changedTouches[0].clientX - leftVal;
                if (barleft < 0)
                    barleft = 0;
                else if (barleft > scroll.offsetWidth - bar.offsetWidth)
                    barleft = scroll.offsetWidth - bar.offsetWidth;
                const percent = barleft / (scroll.offsetWidth - bar.offsetWidth);
                that.style.left = percent * 100 + "%";
                self.setState({
                    percent: percent,
                    price: (self.state.less_price + (self.state.more_price - self.state.less_price) * percent).toFixed(2)
                })
                //防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            }

        }
        document.ontouchend = function () {
            document.onmousemove = null; //弹起鼠标不做任何操作
        }
    }
    componentDidUpdate(nextProps) {
        if (nextProps !== this.props) {
            const hash = window.location.hash;
            const index = hash.indexOf("newerGuad");
            let page_type, tip;
            if (index === -1) { // 高手挂单
                page_type = "2";
                tip = "算力≥5用户可进行10-200JSD议价交易！";
            } else {  //新手挂单
                page_type = "1";
                tip = "认证用户可进行1-10JSD议价交易！";
            }
            this.setState({
                page_type: page_type,
                tip: tip
            })
        }
    }
    handlePwdEvent (e){  //输入交易密码
        this.setState({
            pass: e.val
        })
    }
    
    handlePayPwd (e){ //弹窗 取消/确定
        const type = e.type;
        if(type === "cancel"){  //取消
            this.setState({
                dlgShow: false,
                pass: ""
            })
        }else{   //如果是 确定的话  要判断支付密码是否正确了
            const self = this;
            const trade_id = this.state.trade_id;
            const pass = this.state.pass;
            let num = this.state.count;
            if (num === "") {
                num = 0;
            }
            axios.post(window.baseUrl + "/home/Trade/buyjd", qs.stringify({
                token: localStorage.getItem("token"),
                price: this.state.price,
                type: this.state.page_type,  //新手 还是进阶
                num: num,  //数量
                pass: pass
            })).then(function (res) {
                const code = res.data.code;
                self.setState({
                    warningDlgShow: true,
                    warningText: res.data.msg
                }, function(){
                    self.hanleWarningDlgTimer({code: code})
                })
            })
        }
       
    }
    handleBuyJd() {  //挂买单
        this.setState({
            dlgShow: true
        })
        
    }
    render() {
        const count = this.state.count;
        const self = this;
        const tabs = [
            {
                type: "kanban",
                text: "买家看板"
            },
            {
                type: "dealRecord",
                text: "交易记录"
            }
        ];
        return <div>
            <Title title={this.state.page_type === "1" ? "新手挂单" : "高手挂单"} />
            <div style={{ marginBottom: ".4rem" }}>
                <div className="guadanItems">
                    <div className="tip fz_26 fc_white">{this.state.tip}</div>
                    <p className="fc_yellow" style={{ lineHeight: '.5rem' }}><span className="fz_30">当前价：</span>
                        <span style={{ fontSize: '.35rem' }}>{this.state.newPrice}</span>
                        <span className="fz_30">JSD</span>
                    </p>
                    <div className="price_adjust fc_white fz_26 mb_20">
                        <div className="unit_price">
                            <span >减价</span>
                            <div className="inline_block">
                                <input className="price_ipt" type="text" value={this.state.price}
                                    onChange={e => {
                                        this.handleIptChange({ type: "price", value: e.target.value })
                                    }}
                                    onBlur={e => {
                                        const value = e.target.value;
                                        if (value > this.state.more_price) {
                                            alert("不能大于最大值");
                                        }
                                        if (value < this.state.less_price) {
                                            alert("不能小于最大值");
                                        }
                                        this.setState({
                                            price: this.state.newPrice
                                        })
                                    }}
                                />
                                <span className="price_opt price_down"
                                    onClick={e => {
                                        this.handlePrice({ type: "reduce" })
                                    }}
                                >-</span>
                                <span className="price_opt price_up"
                                    onClick={e => {
                                        this.handlePrice({ type: "add" })
                                    }}
                                >+</span>
                            </div>
                            <span>加价</span>
                        </div>
                        <div style={{ padding: '0 .2rem' }}>
                            <div className="draft_opt b_blue1" id="scroll">
                                <span className="circle b_blue1" id="bar" style={{ left: parseInt(this.state.percent * 100) + "%" }}></span></div>
                        </div>
                        <input className="b_blue1 text_center fc_white" type="text" value={count}
                            onChange={e => {
                                this.handleIptChange({ type: "count", value: e.target.value })
                            }}

                        />
                        <p className="fc_blue fz_26">买入{count}JSD，出价{this.state.price}，总价{Math.round(parseFloat(count * this.state.price) * 100) / 100}元</p>
                        <span className="btn btn_orange" style={{ margin: '.1rem auto' }}
                            onClick={e => {
                                this.handleBuyJd()
                            }}
                        >挂买单</span>
                        <p className="text_center notice fz_24"><Link to = "/newerGdNotes"><img src={wenhao} alt="" />新手挂单交易须知</Link></p>
                    </div>
                    <div style={{ padding: '0 .25rem' }}>
                        <ul className="deal_tab f_flex fz_30">
                            {
                                tabs.map(function (item, index) {
                                    return <li key={index} className={index === self.state.tabIndex ? "active" : ""}>
                                        <a onClick={e => { self.handleDealTab({ type: item.type, tabIndex: index }) }}>{item.text}</a>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
                <DealItems type={this.state.type}/>
            </div>
            {this.state.dlgShow ? <Shadow /> : null}
            <div className={this.state.dlgShow ? "dialog dlgPayPwd" : "dialog dlgPayPwd hide"}>
                <p className="dlg_tit fc_white">输入密码</p>
                <div className="dlg_form">
                    <p className="text_center fz_24 fc_white">请输入支付密码：</p>
                    <input className="b_blue1" type="password" value = {this.state.pass} 
                    onChange = {e => {
                        this.handlePwdEvent({val: e.target.value})
                    }}
                    />
                    <div className="over_hidden" style={{padding: "0 .14rem"}}>
                        <span className="btn fz_24 fc_white f_lt" onClick = {e => {
                            self.handlePayPwd({type: "cancel"})
                        }}>取消</span>
                        <span className="btn fz_24 fc_white f_rt" onClick = {e => {
                            self.handlePayPwd({type: "confirm"})
                        }}>确定</span>
                    </div>
                </div>
            </div>
            {this.state.warningDlgShow ? <WarningDlg text = {this.state.warningText} /> : null}
        </div>
    }
}

export default GuaDan;