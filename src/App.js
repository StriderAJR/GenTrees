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

    alert(targetNode + ref + data);
}

const MyAwesomeMenu = () => (
    <ContextMenu id={{mainContextMenuId}}>
        <Item onClick={onClick}>
            Item 1
        </Item>
        <Item onClick={onClick}>
            Item 2
        </Item>
        <Separator/>
        <Item disabled>
            Item 3
        </Item>
    </ContextMenu>
);

class Field extends Component {
    render() {
        return (
            <div className='field'>
                Right click to see menu
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
                <ContextMenuProvider className='field' id={{mainContextMenuId}}>
                    <Field/>
                </ContextMenuProvider>
                <MyAwesomeMenu/>
            </div>
        );
    }
}

export default App;
