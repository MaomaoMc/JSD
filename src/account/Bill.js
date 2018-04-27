import React, {Component} from 'react';

const bills = [
   {
       date: "04.18 11:47:21",
       count: -10
   },
   {
        date: "04.18 11:47:21",
        count: -10
    },
    {
        date: "04.18 11:47:21",
        count: -10
    },
    {
        date: "04.18 11:47:21",
        count: -10
    },
];
class Bill extends Component {
    render (){
        return <div>
            <div className="title"><span className="arrow back_arrow"></span>账单中心<span className="refresh"></span></div>
          <ul className="billTab f_flex">
            <li className="active"><a>全部</a></li>
            <li><a>转入</a></li>
            <li><a>转出</a></li>
            <li><a>收益</a></li>
            <li><a>奖励</a></li>
            <li><a>支出</a></li>
            <li><a>冻结</a></li>
          </ul>
          <p className="fc_yellow totalSum" style={{fontSize: ".395rem"}}>+13.75644342</p>
          <ul className="billItems f_flex fz_24">
          {
              bills.map(function(bill, i){
                  return <li>
                    <span className="fc_blue">支出</span><br/>
                    <p className="fc_white">
                        <span className="f_lt">{bill.date}</span>
                        <span className="f_rt">{bill.count}</span>
                    </p>
                </li>
              })
          }
          </ul>
        </div>
    }
}

export default Bill;