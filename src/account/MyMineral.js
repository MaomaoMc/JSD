import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Title from '../Title';
import WarningDlg from '../WarningDlg';
class MyMineral extends Component  {
    constructor (props){
        super(props);
        this.state = {
            data: [],
            code: ""
        }
    }
    ajax (){
        const self = this;
        axios.post(window.baseUrl + "", qs.stringify({
            token: localStorage.getItem("token")
        })).then(function(res){
            console.log(res);
            const data = res.data;
            const code = data.code;
            self.setState({
                code: code
            })
        })
    }
    componentDidMount (){

    }
    render (){
        if(this.state.code === 10002){  //token 过期
            return <Redirect to = "/" />
        }
        return <div>我的矿机</div>
    }
}

export default MyMineral;