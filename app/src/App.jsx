import React, { Component } from 'react'
import { render } from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'
const remote = require('electron').remote

require("./styles/main.sass");

import SuTitlebar from 'su-titlebar'
import SuTabs from 'su-tabs'
import Zone1 from './components/Zone1'
import Zone2 from './components/Zone2'
import Zone3 from './components/Zone3'
import Zone4 from './components/Zone4'
import Zone5 from './components/Zone5'

const tabs = [
    {
        value: '1',
        label: 'ONE 1'
    },
    {
        value: '2',
        label: 'TWO 2'
    },
    {
        value: '3',
        label: 'THREE 3'
    },
    {
        value: '4',
        label: 'FOUR 4'
    },
    {
        value: '5',
        label: 'FIVE 5'
    }
]
export default class App extends Component {
    constructor(props) {
        super(props)
        this.handleTabChange = this.handleTabChange.bind(this)
        this.handleNewTab = this.handleNewTab.bind(this)
        //when open new tab, call setNewTab(value, label)
    }
    
    render() {
        return(
            <div className="wrapper">
                <SuTitlebar remote={remote} options={{
                    titlebarContent: <SuTabs ref="sutabs" tabs={tabs} tabClass='su-tabs' tabClassActive='su-tabs-active' onTabChange={this.handleTabChange} onNewTab={this.handleNewTab}/>
                }}/>
                <div className="content-area">
                    <HashRouter>
                        <Switch>
                            <Route path="/1" component={Zone1}/>
                            <Route path="/2" component={Zone2}/>
                            <Route path="/3" component={Zone3}/>
                            <Route path="/4" component={Zone4}/>
                            <Route path="/5" component={Zone5}/>
                            <Route render={() => <div>DEADDDDDDDD</div>}/>
                        </Switch>
                    </HashRouter>
                    <div style={{fontSize: '24px'}} className="su-tabs" onClick={this.changecurrentabname.bind(this)}>CHANGE TAB NAME</div>
                </div>
            </div>
        )
    }

    handleNewTab() {
        console.log("hey")
    }

    changecurrentabname() {
        this.refs.sutabs.setCurrentTab({ value: (Math.random()*100000).toString(), label: "hii" })
    }

    handleTabChange(selectedTab) {
        var routepath = selectedTab.value
        window.location.hash = `#/${routepath}`
    }
}