import React, { Component } from 'react';
import PriceItem from './PriceItem';
import DealTab from './DealTab';
import GuaDanTab from './GuaDanTab';
import Tab from './../Tab';
import '../css/css/deal.css';

class Ptp extends Component {
    render(){
        return <div> 
            <PriceItem />
            <DealTab />
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
                <span className="btn btn_orange" style={{margin: '.25rem auto'}}>卖出</span>
            </div>
            <GuaDanTab />
            <Tab />
        </div>
    }
}

export default Ptp;