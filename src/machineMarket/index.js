import React, { Component } from 'react';
import Tab from './../Tab';
import './../css/css/machineM.css'; //机市css

const goods = [
    {
        pic:  require("../img/pic_minikj.png"),
        name: "迷你云矿机",
        items: {
            sl: 25,
            cycle: '160天',
            profit: 875.2
        },
        price: "250 JSD"
    },
    {
        pic:  require("../img/pic_xiaokj.png"),
        name: "小型云矿机",
        items: {
            sl: 25,
            cycle: '160天',
            profit: 875.2
        },
        price: "250 JSD"
    },
    {
        pic:  require("../img/pic_zhongkuangj.png"),
        name: "中型云矿机",
        items: {
            sl: 25,
            cycle: '160天',
            profit: 875.2
        },
        price: "250 JSD"
    },
    {
        pic:  require("../img/pic_xiaokj.png"),
        name: "大型云矿机",
        items: {
            sl: 25,
            cycle: '160天',
            profit: 875.2
        },
        price: "250 JSD"
    },
    {
        pic:  require("../img/pic_xiaokj.png"),
        name: "超大型云矿机",
        items: {
            sl: 25,
            cycle: '160天',
            profit: 875.2
        },
        price: "250 JSD"
    },
    {
        pic:  require("../img/pic_xiaokj.png"),
        name: "迷你云矿机232",
        items: {
            sl: 25,
            cycle: '160天',
            profit: 875.2
        },
        price: "250 JSD"
    }
];
class MachineM extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          dlgShow: false,
          jsdShortDlgShow: false
        };
      }
    handleBayEvent (e){
        this.setState({
            dlgShow: true
        })
    }
    handleDlgEvent (e){  //取消购买 或者确定购买
        const type = e.type;
        if(type === "cancel"){  //取消
            this.setState({
                dlgShow: false
            })
        }else{  //如果是 确定的话  
            //如果jsd余额不足
            const self = this;
            this.setState({
                dlgShow: false,
                jsdShortDlgShow: true
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
    }
    render(){
        const self = this;
        return <div>
            <div style={{padding: '0 .11rem'}}>
                {
                     goods.map(function (good, i) {
                         const items = good.items;
                         const sl = items.sl;
                        return <div key={i} className="item">
                            <div className="goodPic f_lt" style={{background: "url(" + good.pic + ") no-repeat 50% 50%"}}></div>
                            <div className="goodItem f_rt">
                                <h6 className="fz_30">{good.name}</h6>
                                <div>
                                    <div className="f_lt fz_22">
                                        <p>算力：{sl}</p>
                                        <p>运行周期：{sl}</p>
                                        <p>收益总量：{sl}</p>
                                    </div>
                                    <div className="cart fz_26" onClick = { e => {
                                            self.handleBayEvent({})
                                        }}>
                                        <i className="cart_icon"></i>
                                       <span> 250 JSD</span>
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
                    <p className="text_center fz_24 fc_white">确定购买当前矿机？</p>
                    {/* <input className="b_blue1" type="text"/> */}
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