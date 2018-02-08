import React, {Component} from 'react';
import ReactDOM from "react-dom";

import {ContextMenu, Item, Separator, IconFont} from 'react-contexify';
import {ContextMenuProvider, menuProvider} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css'

import logo from './logo.svg';
import './App.css';

// create your menu first
const mainContextMenuId = 'main-context-menu';

function onClick(targetNode, ref, data) {
    // targetNode refer to the html node on which the menu is triggered
    console.log(targetNode);
    //ref will be the mounted instance of the wrapped component
    //If you wrap more than one component, ref will be an array of ref
    console.log(ref);
    // Additionnal data props passed down to the `Item`
    console.log(data);
}

class Field extends Component {
    constructor(props) {
        super(props);
        this.state = {
            log: []
        }
    }

    handleClick(itemName) {
        let log = this.state.log;
        log.push(itemName + ' was clicked');
        this.setState({log: log});
    }

    render() {
        return (
            <div className='field'>
                <ContextMenuProvider className='field' id={{mainContextMenuId}}>
                    <div className='field'>
                        {this.state.log.map((log, i) => <p key={i}>{log}</p>)}
                    </div>
                </ContextMenuProvider>
                <ContextMenu id={{mainContextMenuId}}>
                    <Item onClick={() => this.handleClick('Item1')}>
                        Item 1
                    </Item>
                    <Item onClick={() => this.handleClick('Item2')}>
                        Item 2
                    </Item>
                    <Separator/>
                    <Item disabled onClick={() => this.handleClick('Item3')}>
                        Item 3
                    </Item>
                </ContextMenu>
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Genealogy Trees</h1>
                </header>
                <Field/>
            </div>
        );
    }
}

export default App;
