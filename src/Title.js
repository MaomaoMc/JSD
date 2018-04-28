import React, {Component} from 'react';

class Title extends Component{
    back (){
        window.history.back();
    }
    refresh (){
        window.location.reload();
    }
    render (){
        return  <div className="title">
            <span className="arrow back_arrow" onClick = {e => {
                this.back()
            }}></span>{this.props.title}<span className="refresh" onClick = {e => {
                this.refresh()
            }}></span>
        </div>
    }
}

export default Title;