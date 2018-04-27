import React, {Component} from 'react';

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
    render (){
        return <div>
            <div className="title"><span className="arrow back_arrow"></span>系统通知<span className="refresh"></span></div>
           <ul className="sysNotices fz_24">
           {
               sysNotices.map(function(notice, i){
                   return <li key = {i}>
                        <p className="fc_white">{notice.date}</p>
                        <p className="fc_blue">{notice.title}</p>
                        <p className="fc_white">{notice.content}</p>
                   </li>
               })
           }
           </ul>
        </div>
    }
}

export default SystemNotice;