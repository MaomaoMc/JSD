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
import GuaDan from '../guadan/index.js';

class Deal extends Component {
    render(){
        const hash = window.location.hash;
        console.log(hash)
        return <div style={{marginBottom: '2rem'}}> 
        <Title  title="交易"/>
            {hash.search(/guadan/) === -1 ? <PriceItem /> : null}
            {hash.search(/guadan/) === -1 ? <DealTab /> : null}
            <GuaDanTab />
            <Tab />
            <Switch>
                <Route path="/deal/guadan/:hash" component={GuaDan}/>
                <Route path="/deal/price" component = {Price} />
                <Route path="/deal/ptp" component = {Ptp} />
                <Route path="/deal/dealItem" component = {DealItems} />
                <Route path="/deal" component = {Price} />   {/*优先级 比较低*/}
            </Switch>
        </div>
    }
}

export default Deal;