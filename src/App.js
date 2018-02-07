import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import logo from './logo.svg';
import './App.css';
import './contextMenu.css'

const MENU_TYPE = 'SIMPLE';

class Field extends Component {
    constructor(props) {
        super(props);

        this.state = { logs: [] };
    }

    handleClick = (e, data) => {
        this.setState(({ logs }) => ({
            logs: [`Clicked on menu ${data.item}`, ...logs]
        }));
    }

    render() {
        return (
        <div>
            <ContextMenuTrigger id={MENU_TYPE} holdToDisplay={1000}>
                <div className='well'>right click to see the menu</div>
            </ContextMenuTrigger>
            <div>
                {this.state.logs.map((log, i) => <p key={i}>{log}</p>)}
            </div>
            <ContextMenu id={MENU_TYPE}>
                <MenuItem onClick={this.handleClick} data={{ item: 'item 1' }}>Menu Item 1</MenuItem>
                <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>Menu Item 2</MenuItem>
                <MenuItem divider />
                <MenuItem onClick={this.handleClick} data={{ item: 'item 3' }}>Menu Item 3</MenuItem>
            </ContextMenu>
        </div>);
    }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Genealogy Trees</h1>
        </header>
        <p className="App-intro">
          Right click to begin
        </p>
        <Field myProp={12}/>
      </div>
    );
  }
}

export default App;
