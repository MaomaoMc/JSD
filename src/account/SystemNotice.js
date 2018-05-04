import React, {Component} from 'react';
import axios from 'axios';
import qs from 'qs';
import Title from '../Title';

const sysNotices = [
    {
        date: "2018-04-18 13:55",
        title: "认证系统内测版上线通知",
        content: "新的认证系统内测版也将上线测试，平台将陆续开放"
    },
    {
        date: "2018-04-18 13:55",
        title: "认证系统内测版上线通知",
        content: "新的认证系统内测版也将上线测试，平台将陆续开放"
    },
    {
        date: "2018-04-18 13:55",
        title: "认证系统内测版上线通知",
        content: "新的认证系统内测版也将上线测试，平台将陆续开放"
    },
    {
        date: "2018-04-18 13:55",
        title: "认证系统内测版上线通知",
        content: "新的认证系统内测版也将上线测试，平台将陆续开放"
    }
]
class SystemNotice extends Component{
    constructor (props){
        super(props);
        this.state = {
            data: [],
            page: 1 //默认第一页
        }
    }
    ajax (){
        const self = this;
        const page = this.state.page;
        const data_arr = this.state.data;
        axios.post(window.baseUrl + "/home/Member/systemInforms", qs.stringify({
            token: localStorage.getItem("token"),
            page: page,
            limit: 10
        })).then(function(res){
            console.log(res, 'ressss');
            const data = res.data;
            const code = data.code;
            const dataArr = data.data;
            if(code === 10002){ //token失效
                localStorage.removeItem("logined");
                localStorage.removeItem("sundryData");
            }
            if(code === 1){  //成功
                if(dataArr.length === 0){ //没有数据可展示了
                    self.setState({
                        isLoadingMore: true
                    })
                }else{
                    self.setState({
                        page: page ? page : 1,
                        data: data_arr.concat(dataArr)
                    })
                }
            }
            self.setState({
                code: code
            })
        })
    }
    componentDidMount (){
        this.ajax();
        const wrapper = this.refs.wrapper;
        const loadMoreDataFn = this.loadMoreDataFn;
        const that = this; // 为解决不同context的问题
        let timeCount;


        function callback() {
            const top = wrapper.getBoundingClientRect().top;
            const windowHeight = window.screen.height;
            if (top && top < windowHeight) {
                // 当 wrapper 已经被滚动到页面可视范围之内触发
                loadMoreDataFn(that);
            }
        }

        window.addEventListener('scroll', function () {
            if (this.state.isLoadingMore) {
                return ;
            }
            if (timeCount) {
                clearTimeout(timeCount);
            }

            timeCount = setTimeout(callback, 50);
        }.bind(this), false);
    }
    loadMoreDataFn(that) {
        that.setState({
            loading: true
        }, function(){
            that.ajax(that.state.page + 1); //翻页了
        })
    }
    render (){
        const sysNotices = this.state.data;
        return <div>
            <Title title = "系统通知" code = {this.state.code}/>
           <ul className="sysNotices fz_24">
           {
               sysNotices.length > 0 && sysNotices.map(function(notice, i){
                   return <li key = {i}>
                        <p className="fc_white">{notice.add_time}</p>
                        <p className="fc_blue">{notice.title}</p>
                        <p className="fc_white" dangerouslySetInnerHTML = {{__html: notice.content}}></p>
                   </li>
               })
           }
           </ul>
           <div className="loadMore fz_12 fc_gray text_center mt_20" ref="wrapper"
             onClick={this.loadMoreDataFn.bind(this, this)}>{this.state.isLoadingMore ? "没有更多数据了" : "加载更多"}</div>
        </div>
    }
}

export default SystemNotice;