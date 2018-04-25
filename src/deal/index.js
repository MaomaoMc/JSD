import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import PriceItem from './PriceItem';
import DealTab from './DealTab';
import GuaDanTab from './GuaDanTab';
import Tab from './../Tab';
import Ptp from './Ptp';
import DealItems from './DealItems';

class Deal extends Component {
    render(){
        return <div> 
            <PriceItem />
            <DealTab />
            <GuaDanTab />
            <Tab />
            <Switch>
                <Route path="/deal/ptp" component = {Ptp} />
                <Route path="/deal/dealItem" component = {DealItems} />
            </Switch>
        </div>
    }
}

export default Deal;