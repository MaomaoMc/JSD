import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Title from '../Title';

class SetHead extends Component{
    constructor (props){
        super(props);
        this.state = {
            code:  ""
        }
    }
    uploadedFile (e){
        const self = this;
        console.log(e.value, '34')
            axios.post(window.baseUrl +  "/home/Base/uploadPic", qs.stringify({
                token: localStorage.getItem("token"),
                pic: e.value
            })).then(function(res){
                console.log(res, 'eee')
                const data = res.data;
                const code = data.code;
                if(code === 10002){
                    localStorage.removeItem("logined");
                }
                self.setState({
                    code: code
                })
            })
    }
    render (){
        if(this.state.code === 10002){  //token 过期
            return (
                <Redirect to="/account"/>
            )
        }
        return <div>
            <Title title="设置头像"/>
            
        <p>photo:<input type="file" name="photo" id="photo"  
        onChange = {e => {this.uploadedFile({value: e.target.value})}}
        /></p>  
            {/* <img src={this.state.uploadedFileCloudinaryUrl} alt="" style={{width: "2.41rem", height: "2.41rem", margin: ".5rem .65rem"}} /> */}
            {/* <input type="file" name="pic" id="pic" accept="image/gif" />   */}

        </div>
    }
}

export default SetHead;