import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import PriceItem from './PriceItem';
import DealTab from './DealTab';
import GuaDanTab from './GuaDanTab';
import Tab from './../Tab';
import Title from './../Title';
import Price from './Price';
import Ptp from './Ptp';
import DealItems from './DealItems';

class Deal extends Component {
    render(){
        return <div style={{marginBottom: '2rem'}}> 
        <Title  title="交易"/>
            <PriceItem />
            <DealTab />
            <GuaDanTab />
            <Tab />
            <Switch>
                <Route path="/deal/price" component = {Price} />
                <Route path="/deal/ptp" component = {Ptp} />
                <Route path="/deal/dealItem" component = {DealItems} />
                <Route path="/deal" component = {Price} />   {/*优先级 比较低*/}
            </Switch>
        </div>
    }
}

export default Deal;