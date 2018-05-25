import React, {Component} from 'react';
import ReactDOM from "react-dom";

import {ContextMenu, Item, Separator, IconFont} from 'react-contexify';
import {ContextMenuProvider, menuProvider} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css'

import logo from './logo.svg';
import './App.css';

// create your menu first
const mainContextMenuId = 'main-context-menu';
const familyTreeMenuId = 'family-context-menu';

function onClick(targetNode, ref, data) {
    // targetNode refer to the html node on which the menu is triggered
    console.log(targetNode);
    //ref will be the mounted instance of the wrapped component
    //If you wrap more than one component, ref will be an array of ref
    console.log(ref);
    // Additionnal data props passed down to the `Item`
    console.log(data);
}

class FamilyTreeNode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: []
        }
    }
}

class FamilyTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseClickX: 0,
            mouseClickY: 0,
            nodes: []
        }
    }

    handleMenuItemClick(itemName, sex, lastName, firstName, x, y) {
        let nodes = this.state.nodes;
        console.log(itemName + ' was clicked');
        nodes.push({
            sex: sex,
            lastName: lastName,
            firstName: firstName,
            x: x,
            y: y
        });
        this.setState({nodes: nodes});
    }

    handleClick(e){
        console.log('Field was clicked. click.X=' + e.screenX + 'click.Y=' + e.screenY);
        this.setState({
            mouseClickX: e.screenX,
            mouseClickY: e.screenY
        });
    }

    render() {
        return (
            <div className='field' onMouseDown={this.handleClick.bind(this)}>
                <ContextMenuProvider className='field' id={{familyTreeMenuId}}>
                    <div className='field'>
                        {this.state.nodes.map((node, i) =>
                            <p key={i}>{node.lastName} {node.firstName} ({node.sex ? 'Male' : 'Female'}) [{node.x};{node.y}]</p>
                        )}
                    </div>
                </ContextMenuProvider>
                <ContextMenu id={{familyTreeMenuId}}>
                    <Item onClick={(event) => this.handleMenuItemClick('create-male', true, 'Smith', 'John', this.state.mouseClickX, this.state.mouseClickY)}>
                        Create male
                    </Item>
                    <Item onClick={(event) => this.handleMenuItemClick('create-female', false, 'Howell', 'Morgan', this.state.mouseClickX, this.state.mouseClickY)}>
                        Create female
                    </Item>
                </ContextMenu>
            </div>
        );
    }
}

class Field extends Component {
    render() {
        return (
            <FamilyTree/>
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
