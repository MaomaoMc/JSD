import React, {Component} from 'react';
import Title from '../Title';

const head = require("../img/pic_morentx.png");
class SetHead extends Component{
    render (){
        return <div>
            <Title title="设置头像"/>
            <img src={head} alt="" style={{width: "2.41rem", height: "2.41rem", margin: ".5rem .65rem"}} />
        </div>
    }
}

export default SetHead;