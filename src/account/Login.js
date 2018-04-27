import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import './../css/css/account.css';
import axios from 'axios';
import MachineM from '../machineMarket/index';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      logined: false,
      phone: "12312",
      pwd: "231223q"
    };
  }
  changeInputVal = (obj) => { //input change事件
    var name = obj.name, 
        val = obj.val;
      if(name === "phone"){
        this.setState({
          phone: val
        })
      }
      if(name === "pwd"){
        this.setState({
          pwd: val
        })
      }
  }
  login = (e) => { //登录
    console.log(this.props)
    const phone = this.state.phone;
    const l_pass = this.state.pwd;
    localStorage.setItem("logined", true);
    this.setState({
      logined: true
    })
    // axios.post('http://jsd.com/home/Login/login',{
    //     phone: phone,
    //     l_pass: l_pass
    //   })
    //   .then(function(res){
    //     console.log(res);
    //   })
    //   .catch(function(err){
    //     console.log(err);
    // });
    
  }
  render() {
    if(this.state.logined) {
      return (
       <Redirect to="/machineMarket"/>
      )
     }
    return (
      <div>
        <div className="logo"></div>
        <div className="over_hidden account_form" style={{width: '3.392rem', margin: '0 auto'}}>
            <div style={{padding: '0 .15rem'}}>
              <input className="h_80" type="text" placeholder="手机号" name="phone" value={this.state.phone}
              onChange={e => {
                this.changeInputVal({'name': e.target.name, 'val': e.target.value})
              }} />
              <input className="h_80 mt_50" type="text" placeholder="请输入密码" name="pwd" value={this.state.pwd}
              onChange={this.changeInputVal.bind(this)} />
              <div className="f_lt mt_50" style={{width: '100%'}}>
                <span>
                  <input className="f_lt" type="radio"/>
                  <label className="fz_26 fc_blue f_lt ml_10">记住密码</label>
                </span>
                <span className="fz_26 fc_blue f_rt">忘记密码？</span>
              </div>
              <span className="btn btn_primary login_btn h_80 fz_26 f_lt mt_50" style={{width: '100%'}}
              onClick={e => {
                this.login({})
              }}>登录</span>
              <Link to="/account/register">
                <span className="btn register_btn h_80 fz_26 f_lt" style={{width: '100%', marginTop: '.67rem', color: 'white'}}>注册</span>
              </Link>  
              </div>    
        </div>
      </div>
    );
  }
}

export default Login;