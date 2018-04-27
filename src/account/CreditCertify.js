import React, {Component} from 'react';
import Title from '../Title';

class CreditCertify extends Component{
    render (){
        return <div>
            <Title title="银行卡认证"/>
           <div className="certify fz_26 fc_white">
                <div style={{padding: '.2rem'}}>
                    <p style={{textAlign: 'right'}}>建设银行</p>
                    <p className="fz_24" style={{textAlign: 'right'}}>储蓄卡</p>
                    <p className="text_center">
                        <span className="ml_30">****</span>
                        <span className="ml_30">****</span>
                        <span className="ml_30">****</span>
                        <span className="ml_30">****</span>
                        <span className="ml_30">2263</span>
                    </p>
                    <p style={{textAlign: 'left'}}>持卡人：陈胜利</p>
                </div>
           </div>
        </div>
    }
}

export default CreditCertify;