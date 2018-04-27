import React, {Component} from 'react';

class Title extends Component{
    render (){
        return  <div className="title">
            <span className="arrow back_arrow"></span>{this.props.title}<span className="refresh"></span>
        </div>
    }
}

export default Title;