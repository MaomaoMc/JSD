// certification
import React, {Component} from 'react';
import Title from '../Title';

const pic = require("../img/pic_morentx.png");
class Certify extends Component{
    render (){
        return <div>
            <Title title="实名认证"/>
           <div className="certify text_center fz_26 fc_white">
                <img src={pic} alt="" style={{width: ".6rem", height: ".6rem", marginTop: '.15rem'}} />
                <p>程开甲</p>
                <p>231456632223232</p>
           </div>
        </div>
    }
}

export default Certify;