import React, {Component} from 'react';
import '../css/css/deal.css';

const priceItems = {
    price: 10.71,
    high: 10.71,
    amount: 2683
}


class PriceItem extends Component {
    render (){
        return <div className="priceItems f_flex">
        <div className="price">
            <span style={{fontSize: ".35rem"}}>{priceItems.price}</span>
            <span className="fz_30">JSD</span>
        </div>
        <div className="items fz_30">
            <p>高：{priceItems.high}</p>
            <p>量：{priceItems.amount}</p>
        </div>
    </div>
    }
}

export default PriceItem;