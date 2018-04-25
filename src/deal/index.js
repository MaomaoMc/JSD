import React, { Component } from 'react';
import PriceItem from './PriceItem';
import DealTab from './DealTab';
import GuaDanTab from './GuaDanTab';
import Tab from './../Tab';

class Deal extends Component {
    render(){
        return <div> 
            <PriceItem />
            <DealTab />
            <GuaDanTab />
            <Tab />
        </div>
    }
}

export default Deal;