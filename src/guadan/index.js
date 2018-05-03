import React, {Component} from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from './../Title';
import DealItems from '../deal/DealItems';
import '../css/css/deal.css';

const wenhao = require("../img/icon_xinshouwenti.png");
class GuaDan extends Component {
    constructor(props) {
        super(props);
        const hash = window.location.hash;
        const index = hash.search(/newerGuad/i);
        var type = "newer",
             cont = {};
        if(index === -1){ // 高手挂单
            type = "expert";
            cont = {
                tip: "认证用户可进行1-10JSD议价交易！",
                price_now: "10.72",
                count: 20,
                dealItems: [
                    {
                        ticketNum: '1806807119',
                        id: '254353432',
                        items: '挂卖10Mac, 单价14.5元，总计145.00'
                    },
                    {
                        ticketNum: '1806807119',
                        id: '254353432',
                        items: '挂卖10Mac, 单价14.5元，总计145.00'
                    },
                    {
                        ticketNum: '1806807119',
                        id: '254353432',
                        items: '挂卖10Mac, 单价14.5元，总计145.00'
                    },
                    {
                        ticketNum: '1806807119',
                        id: '254353432',
                        items: '挂卖10Mac, 单价14.5元，总计145.00'
                    }
                ]
            }
        }else{
            type = "newer";
            cont = {
                tip: "3esdsdd-10JSD议价交易！",
                price_now: "3.23",
                count: 12,
                dealItems: [
                    {
                        ticketNum: '1806807119',
                        id: '254353432',
                        items: '挂卖10Mac, 单价14.5元，总计145.00'
                    },
                    {
                        ticketNum: '1806807119',
                        id: '254353432',
                        items: '挂卖10Mac, 单价14.5元，总计145.00'
                    },
                    {
                        ticketNum: '1806807119',
                        id: '254353432',
                        items: '挂卖10Mac, 单价14.5元，总计145.00'
                    },
                    {
                        ticketNum: '1806807119',
                        id: '254353432',
                        items: '挂卖10Mac, 单价14.5元，总计145.00'
                    }
                ]
            }
        }
        this.state = { 
            type: type,
            cont: cont,
            count: 1,
            type: "kanban", // 默认看板选中
            tabIndex: 0,
            page: 1, //默认第一页啊
            lists: []
        };
      }
    // ajax () {
    //     const token = localStorage.getItem("token");
    //     const self = this;
    //     const page = this.state.page;
    //     axios.post(window.baseUrl + "/home/Login//tradeList", qs.stringify({
    //         token: token,
    //         page: page,
    //         limit: 10
    //       })).then(re=>{
    //         const data = re.data;
    //         const code = re.code;
    //        if(data.code === 10002){
    //            localStorage.removeItem("logined");
               
    //        }
    //        if(data.code === 1){ //成功
    //         self.setState({
    //             lists: data.data,
    //             token: token
    //         })
    //        }
    //       })
    // }
    handleDealTab (e) {  //tab切换
        const type = e.type;
        const tabIndex = e.tabIndex;
        this.setState({
            type: type,
            tabIndex: tabIndex
        })
    }
    componentDidMount (){
        // this.ajax();
    }
    render (){
        const type = this.state.type;
        const cont = this.state.cont;
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
            <Title title="挂单"/>
            <div style={{marginBottom: ".4rem"}}>
                <div className = "guadanItems">
                    <div className="tip fz_26 fc_white">{cont.tip}</div>
                    <p className="fc_yellow" style={{lineHeight: '.5rem'}}><span className="fz_30">当前价：</span>
                        <span style={{fontSize: '.35rem'}}>{cont.price_now}</span>
                        <span className="fz_30">JSD</span>
                    </p>
                    <div className="price_adjust fc_white fz_26 mb_20">
                        <div className="unit_price">
                            <span >减价</span>
                            <div className="inline_block">
                                <span className="price_opt price_down">-</span>
                                <span className="price_opt price_up">+</span>
                            </div>
                            <span>加价</span>
                        </div>
                        <div style={{padding: '0 .2rem'}}>
                            <div className="draft_opt b_blue1"><span className="circle b_blue1"></span></div>   
                        </div>
                        <input className="b_blue1 text_center fc_white" type="text" value={count} />
                        <p className="fc_blue fz_26">买入{count}JSD，出价{}，总价10.58元</p>
                        <span className="btn btn_orange" style={{margin: '.1rem auto'}}>挂买单</span>
                        <p className="text_center notice fz_24"><a href=""><img src={wenhao} alt=""/>新手挂单交易须知</a></p>
                    </div>
                    <div style={{padding: '0 .25rem'}}>
                        <ul className="deal_tab f_flex fz_30">
                        {
                            tabs.map(function(item, index){
                                return <li key = {index} className = {index === self.state.tabIndex ? "active" : ""}>
                                    <a onClick = {e => {self.handleDealTab({type: item.type, tabIndex: index}) }}>{item.text}</a>
                                </li>
                            })
                        }
                        </ul>
                    </div>
                </div>
                <DealItems type={this.state.type} />
            </div>
        </div>
    }
}

export default GuaDan;