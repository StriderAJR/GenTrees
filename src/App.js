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
            sex: props.person.sex,
            lastName: props.person.lastName,
            firstName: props.person.firstName,
            x: props.person.x,
            y: props.person.y
        }
    }

    render(){
        let person = this.state;
        let style = {
            position: 'absolute',
            top: person.y,
            left: person.x

        };
        return (
            <div style={style}>
                <p>{person.lastName} {person.firstName} ({person.sex ? 'Male' : 'Female'}) [{person.x};{person.y}]</p>
            </div>
        )
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
        console.log('Field was clicked. screenX=' + e.screenX + ' screenY=' + e.screenY + '\n' +
                    'clientX=' + e.clientX + ' clientY=' + e.clientY);
        this.setState({
            mouseClickX: e.clientX,
            mouseClickY: e.clientY
        });
    }

    render() {
        return (
            <div className='field' onMouseDown={this.handleClick.bind(this)}>
                <ContextMenuProvider className='field' id={{familyTreeMenuId}}>
                    <div className='field'>
                        {
                            this.state.nodes.map((node, i) =>
                                <FamilyTreeNode person={node}/>
                            )
                        }
                    </div>
                </ContextMenuProvider>
                <ContextMenu id={{familyTreeMenuId}}>
                    <Item onClick={() => this.handleMenuItemClick('create-male', true, 'Smith', 'John', this.state.mouseClickX, this.state.mouseClickY)}>
                        Create male
                    </Item>
                    <Item onClick={() => this.handleMenuItemClick('create-female', false, 'Howell', 'Morgan', this.state.mouseClickX, this.state.mouseClickY)}>
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
