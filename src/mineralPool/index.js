import React, { Component } from 'react';
import Tab from './../Tab';
import './../css/css/mineralPool.css';
const mineralItems = [
    {
        pic: require("../img/pic_toux.png"),
        id: "1175554",
        grade: '普通矿工',
        sl: 2,
        kj_sum: 0,
        zt_sum: 12,
        team_sum: 3
    },
    {
        pic: require("../img/pic_toux.png"),
        id: "1175554",
        grade: '普通矿工1',
        sl: 2,
        kj_sum: 0,
        zt_sum: 12,
        team_sum: 3
    },
    {
        pic: require("../img/pic_toux.png"),
        id: "1175554",
        grade: '普通矿工2',
        sl: 2,
        kj_sum: 0,
        zt_sum: 12,
        team_sum: 3
    },
    {
        pic: require("../img/pic_toux.png"),
        id: "1175554",
        grade: '普通矿工3',
        sl: 2,
        kj_sum: 0,
        zt_sum: 12,
        team_sum: 3
    }
]
class MineralPool extends Component {
    constructor (props){
        super(props);
        this.state = {
            dlgZtDlgShow: false,
            dlgZtMessageShow: false,
            shadowShow: false
        };
    }
    handleZtDlgEvent (e){
        const type = e.type;
        if(type === "close"){
            this.setState({
                dlgZtDlgShow: false,
                shadowShow: false
            })
        }
        if(type === "open"){
            this.setState({
                dlgZtDlgShow: true,
                shadowShow: true
            })
        }
    }
    handleMessageDlg (e){
        const type = e.type;
        if(type === "close"){
            this.setState({
                dlgZtMessageShow: false,
                shadowShow: false
            })
        }
        if(type === "open"){
            this.setState({
                dlgZtMessageShow: true,
                shadowShow: true
            })
        }
    }
    render (){
        const self = this;
        return <div>
            <div style={{padding: '0 .11rem'}}>
                <div className="pool_overview f_flex">
                    <div>
                        <p className="fc_white fz_26">矿池算力（T）</p>
                        <p className="fc_gray fz_22">(截至昨天)</p>
                        <p className="fc_yellow fz_60">32</p>
                    </div>
                    <div onClick = {e => {
                        self.handleZtDlgEvent({type: "open"})
                    }}>
                        <p className="fc_white fz_26">总矿工数</p>
                        <p className="fc_gray fz_22">(截至昨天)</p>
                        <p className="fc_yellow fz_60">14</p>
                    </div>
                </div>
                <ul className="deal_tab f_flex fz_30">
                    <li className="active" style={{ borderTopLeftRadius: '.25rem', borderBottomLeftRadius: '.25rem'}}>
                        <a><span>直推</span></a>
                    </li>
                    <li>
                        <a><span>团队</span></a>
                    </li>
                </ul>
                <ul className="mineralItems f_flex">
                    {
                        mineralItems.map(function(item, i){
                            return <li key={i} onClick = {e => {
                                self.handleMessageDlg({type: "open"})
                            }}>
                                <div className="f_flex">
                                    <div><img src={item.pic} alt=""/></div>
                                    <div>
                                        <p>ID：{item.id}</p>
                                        <p>{item.grade}</p>
                                    </div>
                                    <div>
                                        <p>算力：{item.sl}</p>
                                        <p>直推：{item.zt_sum}</p>
                                    </div>
                                    <div>
                                        <p>矿机：{item.kj_sum}</p>
                                        <p>团队{item.team_sum}</p>
                                    </div>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div className={this.state.dlgZtDlgShow ? "dialog dlgZtMessage" : "dialog dlgZtMessage hide"}>
                <p className="dlg_tit fc_white">直推信息</p>
                <a className="btn_close" onClick = {e => {
                    self.handleZtDlgEvent({type: "close"})
                }}></a>
                <div style={{padding: '.25rem .45rem'}}>
                    <ul className="f_flex">
                        <li>
                            <span>总直推数：6</span>
                            <span className="f_rt">四级矿工：6</span>
                        </li>
                        <li>
                            <span>总直推数：6</span>
                            <span className="f_rt">四级矿工：6</span>
                        </li>
                        <li>
                            <span>总直推数：6</span>
                            <span className="f_rt">四级矿工：6</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={this.state.dlgZtMessageShow ? "dialog dlgMessage" : "dialog dlgMessage hide"}>
                <p className="dlg_tit fc_white">个人信息</p>
                <a className="btn_close" onClick = {e => {
                    self.handleMessageDlg({type: "close"})
                }}></a>
                <div style={{padding: '.25rem .35rem'}}>
                    <div>
                        <span className="label">ID</span>
                        <span className="message">24343434342</span>
                        <span className="btn">复制</span>
                    </div>
                    <div style={{marginTop: '.245rem'}}>
                        <span className="label">TEL</span>
                        <span className="message">182636645323</span>
                        <span className="btn">复制</span>
                    </div>
                </div>
            </div>
            <div className={this.state.shadowShow ? "shadow" : "shadow hide"}></div>
            <Tab />
        </div>
    }
}

export default MineralPool;