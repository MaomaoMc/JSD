import React, { Component } from 'react';
import Tab from './../Tab';
// import './../css/css/common.css';
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
        // pic: "../img/pic_xiaokj.png",
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
    render(){
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
                                    <div className="cart fz_26">
                                        <i className="cart_icon"></i>
                                       <span> 250 JSD</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
            <Tab />
        </div>
    }
}

export default MachineM;