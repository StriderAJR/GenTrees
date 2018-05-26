import React, {Component} from 'react';

import {ContextMenu, Item} from 'react-contexify';
import {ContextMenuProvider} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css'
import SweetAlert from 'react-bootstrap-sweetalert';
import { Button, Row, Col, Alert } from 'react-bootstrap';


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
            y: props.person.y,
            isSelected: props.person.isSelected
        };

        console.log("Child "+ this.state.id + ' created');
    }

    handleMenuItemClick(itemName){
        console.log('Person id=' + this.state.id + ' item=' + itemName + ' was clicked');
    }

    handleClick(e){
        e.stopPropagation();
        // console.log('Person id=' + this.state.id + ' was clicked');

        let isSelected = this.state.isSelected;
        isSelected = !isSelected;
        this.setState({isSelected: isSelected}, function() {
            this.props.selectionChanged(this.state.id, this.state.isSelected);
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
            id: props.person.id,
            sex: props.person.sex,
            lastName: props.person.lastName,
            firstName: props.person.firstName,
            x: props.person.x,
            y: props.person.y,
            isSelected: props.person.isSelected
        })
    }

    render(){
        console.log('Child ' + this.state.id + ' rendered. isSelected = ' + this.state.isSelected);

        let person = this.state;
        let style = {
            position: 'absolute',
            top: person.y,
            left: person.x
        };
        let menuId = familyTreeNodeMenuId + this.state.id;
        let className = 'node';
        if(this.state.isSelected) className += ' selected';
        className += this.state.sex ? ' male' : ' female';

        return (
            <div className={className} style={style} onMouseDown={this.handleClick.bind(this)}>
                <div class='nodeInner'>
                    <b>{person.lastName} {person.firstName}</b>
                </div>
            </div>
        );

        // return (
        //     <div class={className} style={style} onMouseDown={this.handleClick.bind(this)}>
        //         <ContextMenuProvider id={{menuId}}>
        //             <div>
        //                 <p>[{person.id}] {person.lastName} {person.firstName} ({person.sex ? 'Male' : 'Female'})</p>
        //             </div>
        //         </ContextMenuProvider>
        //         <ContextMenu id={{menuId}}>
        //             <Item onClick={() => this.handleMenuItemClick('create-sister')}>
        //                 Create sister
        //             </Item>
        //             <Item onClick={() => this.handleMenuItemClick('create-brother')}>
        //                 Create brother
        //             </Item>
        //         </ContextMenu>
        //     </div>
        // )
    }
}

class FamilyTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: null,
            mouseClickX: 0,
            mouseClickY: 0,
            nodes: []
        };

        this.childIsSelectedChanged = this.childIsSelectedChanged.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
    }

    handleMenuItemClick(itemName, id, sex, lastName, firstName, x, y) {
        // console.log(itemName + ' was clicked');

        let style = {
            borderRadius: '0'
        }
        this.setState({alert: (
            <SweetAlert style={style}>
                <SweetAlert title="Here's a message!" onConfirm={this.hideAlert} />
            </SweetAlert>
        )});

        // let nodes = this.state.nodes;
        // nodes.push({
        //     id: id,
        //     sex: sex,
        //     lastName: lastName,
        //     firstName: firstName,
        //     x: x,
        //     y: y,
        //     isSelected: false
        // });
        // this.setState({nodes: nodes});
    }

    hideAlert() {
        this.setState({
            alert: null
        });
    }

    handleClick(e){
        console.log('Field was clicked. screenX=' + e.screenX + ' screenY=' + e.screenY + '\n' +
                    'clientX=' + e.clientX + ' clientY=' + e.clientY);

        let nodes = this.state.nodes;
        for(let i = 0; i < nodes.length; i++){
            nodes[i].isSelected = false;
        }

        this.setState({
            nodes: nodes,
            mouseClickX: e.clientX,
            mouseClickY: e.clientY
        });
    }

    childIsSelectedChanged(childId, isSelected){
        console.log('child ' + childId + ' isSelected changed');

        let nodes = this.state.nodes;
        for(let i = 0; i < nodes.length; i++){
            if(nodes[i].id === childId)
                nodes[i].isSelected = isSelected;
            else
                nodes[i].isSelected = false;
            console.log('nodes['+i+'].isSelected = ' + nodes[i].isSelected);
        }
        this.setState({nodes: nodes});
    }

    render() {
        var log = 'FamilyTree rendered. ';
        this.state.nodes.map((node, i) => log += node.isSelected + ' ');
        console.log(log);

        return (
            <div className='field' onMouseDown={this.handleClick.bind(this)}>
                <ContextMenuProvider className='field' id={{familyTreeMenuId}}>
                    <div className='field'>
                        {
                            this.state.nodes.map((node, i) =>
                                <FamilyTreeNode person={node} selectionChanged={this.childIsSelectedChanged}/>
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
                {this.state.alert}
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
