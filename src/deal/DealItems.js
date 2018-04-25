import React, {Component} from 'react';
import {} from 'react-router-dom';

const dealItems = [
    {
        ticketNum: '1806807119',
        id: '11754',
        items: '挂卖10Mac, 单价14.5元，总计145.00'
    },
    {
        ticketNum: '1806807119',
        id: '2231',
        items: '挂卖10Mac, 单价14.5元，总计145.00'
    },
    {
        ticketNum: '1806807119',
        id: '23123',
        items: '挂卖10Mac, 单价14.5元，总计145.00'
    },
    {
        ticketNum: '1806807119',
        id: '243545',
        items: '挂卖10Mac, 单价14.5元，总计145.00'
    },
    {
        ticketNum: '1806807119',
        id: '254353432',
        items: '挂卖10Mac, 单价14.5元，总计145.00'
    },
    {
        ticketNum: '1806807119',
        id: '876543',
        items: '挂卖10Mac, 单价14.5元，总计145.00'
    }
]

class DealItems extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          dlgShow: false
        };
      }
    handleSellEvent (e) { //卖给他
        this.setState({
            dlgShow: true
        })
    }
    handlePayPwd (e){ //弹窗 取消/确定
        const type = e.type;
        if(type === "cancel"){  //取消
            this.setState({
                dlgShow: false
            })
        }
        //如果是 确定的话  要判断支付密码是否正确了
    }
    render(){
        const self = this;
        return <div>
            <ul className="dealItems f_flex">
                {
                    dealItems.map(function (item, i) {
                        return <li key={i} className="fz_22">
                            <p>
                                <span className="fc_blue">单号：{item.ticketNum}</span>
                                <span className="f_rt fc_white">ID：{item.id}</span>
                            </p>
                            <p className="fc_white text_center" style={{lineHeight: ".5rem"}}>{item.items}</p>
                            <span className="btn" onClick = { e => {
                                self.handleSellEvent({})
                            }}>卖给他</span>
                        </li>
                    })
                }
            </ul>
            <div className={this.state.dlgShow ? "dialog dlgPayPwd" : "dialog dlgPayPwd hide"}>
                <p className="dlg_tit fc_white">输入密码</p>
                <div className="dlg_form">
                    <p className="text_center fz_24 fc_white">请输入支付密码：</p>
                    <input className="b_blue1" type="text"/>
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
        </div>
    }
}

export default DealItems;