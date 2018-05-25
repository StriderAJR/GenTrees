import React, {Component} from 'react';

import {ContextMenu, Item} from 'react-contexify';
import {ContextMenuProvider} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css'

import logo from './logo.svg';
import './App.css';

const familyTreeMenuId = 'family-context-menu';
const familyTreeNodeMenuId = 'family-node-contex-menu';

class FamilyTreeNode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.person.id,
            sex: props.person.sex,
            lastName: props.person.lastName,
            firstName: props.person.firstName,
            x: props.person.x,
            y: props.person.y
        }
    }

    handleMenuItemClick(itemName){
        console.log('Person id=' + this.state.id + ' item=' + itemName + ' was clicked');
    }

    handleClick(e){
        e.stopPropagation();
        console.log('Person id=' + this.state.id + ' was clicked');
    }

    render(){
        let person = this.state;
        let style = {
            position: 'absolute',
            top: person.y,
            left: person.x

        };
        let menuId = familyTreeNodeMenuId + this.state.id;
        return (
            <div style={style} onMouseDown={this.handleClick.bind(this)}>
                <ContextMenuProvider id={{menuId}}>
                    <div>
                        <p>{person.lastName} {person.firstName} ({person.sex ? 'Male' : 'Female'}) [{person.x};{person.y}]</p>
                    </div>
                </ContextMenuProvider>
                <ContextMenu id={{menuId}}>
                    <Item onClick={() => this.handleMenuItemClick('create-sister')}>
                        Create sister
                    </Item>
                    <Item onClick={() => this.handleMenuItemClick('create-brother')}>
                        Create brother
                    </Item>
                </ContextMenu>
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

    handleMenuItemClick(itemName, id, sex, lastName, firstName, x, y) {
        let nodes = this.state.nodes;
        console.log(itemName + ' was clicked');
        nodes.push({
            id: id,
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
                    <Item onClick={() => this.handleMenuItemClick('create-male', this.state.nodes.length, true, 'Smith', 'John', this.state.mouseClickX, this.state.mouseClickY)}>
                        Create male
                    </Item>
                    <Item onClick={() => this.handleMenuItemClick('create-female', this.state.nodes.length, false, 'Howell', 'Morgan', this.state.mouseClickX, this.state.mouseClickY)}>
                        Create female
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
                <FamilyTree/>
            </div>
        );
    }
}

export default App;
