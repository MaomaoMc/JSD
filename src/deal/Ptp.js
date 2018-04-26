import React, { Component } from 'react';
import '../css/css/deal.css';

class Ptp extends Component {
    render(){
        return <div> 
            <div className="ptpFrom mt_20">
                <ul className="f_flex">
                    <li>
                        <span>ID</span>
                        <input type="text" placeholder = "请输入买家的ID号"/>
                    </li>
                    <li>
                        <span>数量</span>
                        <input type="text" placeholder = "请输入售出的数量"/>
                    </li>
                    <li>
                        <span>约定价</span>
                        <input type="text" placeholder = "请输入约定价格"/>
                    </li>
                </ul>
                <p className="fz_18 fc_white mt_10">*交易手续费20%；如转入100JSD，系统将扣120JSD。</p>
                <span className="btn btn_orange block" style={{margin: '.25rem auto', display: 'block'}}>卖出</span>
            </div>
        </div>
    }
}

export default Ptp;