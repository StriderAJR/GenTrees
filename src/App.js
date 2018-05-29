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

var menuItems = {
    CREATE_PERSON: 0,
    CREATE_SIBLING: 1,
    CREATE_PARENT: 2
};

class FamilyTreeNode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.person.id,
            gender: props.person.gender,
            lastName: props.person.lastName,
            firstName: props.person.firstName,
            x: props.person.x,
            y: props.person.y,
            isSelected: props.person.isSelected
        };

        this.renderNode = this.renderNode.bind(this);
    }

    handleMenuItemClick(itemName){
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
            gender: props.person.gender,
            lastName: props.person.lastName,
            firstName: props.person.firstName,
            x: props.person.x,
            y: props.person.y,
            isSelected: props.person.isSelected
        })
    }

    renderNode() {
        let style = {
            position: 'absolute',
            top: this.state.y,
            left: this.state.x
        };

        let className = 'node';
        if(this.state.isSelected) className += ' selected';
        className += this.state.gender ? ' male' : ' female';

        return (
            <div className={className} style={style} onMouseDown={this.handleClick.bind(this)}>
                <div class='nodeInner'>
                    <b>{this.state.lastName} {this.state.firstName}</b>
                </div>
            </div>
        );
    }

    render(){
        return this.renderNode();
    }
}

class FamilyTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: null,
            mouseClickX: 0,
            mouseClickY: 0,
            nodes: [],
            contextMenu: this.mainContextMenu()
        };

        this.childIsSelectedChanged = this.childIsSelectedChanged.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
        this.processInput = this.processInput.bind(this);

        this.refLastName = React.createRef();
        this.refFirstName = React.createRef();
        this.refGenderMale = React.createRef();
    }

    editForm(person){
        if(person == null) {
            person = {
                id: null,
                firstName: null,
                lastName: null,
                gender: true
            };
        }

        return (
            <div>
                <div>
                    <label className='edit-form-label' htmlFor='lastName'> Last name: </label>
                    <input className='edit-form-input' id='lastName' ref={this.refLastName} type='text' value={person.lastName}/>
                </div>
                <div>
                    <label  className='edit-form-label' htmlFor="firstName"> First name: </label>
                    <input className='edit-form-input' id='firstName' ref={this.refFirstName} type='text'  value={person.firstName}/>
                </div>
                <div>
                    <label className='edit-form-label'>Gender: </label>
                    <div className='edit-form-input'>
                        <label>
                            <input type='radio' ref={this.refGenderMale} name='gender' value='male' defaultChecked={person.gender}/> Male
                        </label>
                        <label style={{paddingLeft: '10px'}}>
                            <input type='radio' name='gender' value='female' defaultChecked={!person.gender}/> Female
                        </label>
                    </div>
                </div>
            </div>
        );
    }

    handleMenuItemClick(menuItem, x, y) {
        if(menuItem === menuItems.CREATE_PERSON) {
            let innerStyle = {
                width: 'auto',
                maxWidth: '70%'
            };
            this.setState({
                alert: (
                    <SweetAlert style={innerStyle} showCancel title="Enter person's data" onCancel={this.hideAlert}
                                onConfirm={this.processInput.bind(this, x, y)}>
                        {this.editForm(null)}
                    </SweetAlert>
                )
            });
        }
        else if(menuItem === menuItems.CREATE_SIBLING){
            alert('Create sibling');
        }
        else if(menuItem === menuItems.CREATE_PARENT){
            alert('Create parent');
        }
    }

    hideAlert() {
        this.setState({
            alert: null
        });
    }

    processInput(x, y, e) { // <-- parameter and event object are shiffled! That's NOT my idea
        let id = this.state.nodes.length;
        let gender = false;
        let lastName = 'Test';
        let firstName = 'Baka';

        lastName = this.refLastName.current.value;
        firstName = this.refFirstName.current.value;
        gender = this.refGenderMale.current.checked;

        let nodes = this.state.nodes;
        nodes.push({
            id: id,
            gender: gender,
            lastName: lastName,
            firstName: firstName,
            x: x,
            y: y,
            isSelected: false
        });
        this.setState({nodes: nodes});

        this.hideAlert();
    }

    handleClick(e){
        let nodes = this.state.nodes;
        let contextMenu = this.state.contextMenu;

        contextMenu = this.mainContextMenu();

        for(let i = 0; i < nodes.length; i++){
            nodes[i].isSelected = false;
        }

        this.setState({
            nodes: nodes,
            contextMenu: contextMenu,
            mouseClickX: e.clientX,
            mouseClickY: e.clientY
        });
    }

    childIsSelectedChanged(childId, isSelected){
        let nodes = this.state.nodes;
        let contextMenu = this.state.contextMenu;

        if(isSelected)
            contextMenu = this.selectedNodeContextMenu();

        for(let i = 0; i < nodes.length; i++){
            if(nodes[i].id === childId)
                nodes[i].isSelected = isSelected;
            else
                nodes[i].isSelected = false;
            console.log('nodes['+i+'].isSelected = ' + nodes[i].isSelected);
        }
        this.setState({nodes: nodes, contextMenu: contextMenu});
    }

    mainContextMenu() {
        return (
            <ContextMenu id={familyTreeMenuId}>
                <Item onClick={() => this.handleMenuItemClick(menuItems.CREATE_PERSON, this.state.mouseClickX, this.state.mouseClickY)}>
                    Create person
                </Item>
            </ContextMenu>
        );
    }

    selectedNodeContextMenu() {
        return (
            <ContextMenu id={familyTreeMenuId}>
                <Item onClick={() => this.handleMenuItemClick(menuItems.CREATE_SIBLING, this.state.mouseClickX, this.state.mouseClickY)}>
                    Create sibling
                </Item>
                <Item onClick={() => this.handleMenuItemClick(menuItems.CREATE_PARENT, this.state.mouseClickX, this.state.mouseClickY)}>
                    Create parent
                </Item>
            </ContextMenu>
        );
    }

    renderFamilyTree() {
        return (
            <div className='field'>
                {
                    this.state.nodes.map((node, i) =>
                        <FamilyTreeNode person={node} selectionChanged={this.childIsSelectedChanged}/>
                    )
                }
            </div>
        );
    }

    render() {
        return (
            <div className='field' onMouseDown={this.handleClick.bind(this)}>
                <ContextMenuProvider className='field' id={familyTreeMenuId}>
                    {this.renderFamilyTree()}
                </ContextMenuProvider>
                {this.state.contextMenu}
                {this.state.alert}
            </div>
        );
    }
}

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: '???'
        }
    }

    componentDidMount() {
        fetch('http://gentrees.bearlog.org/Account/TestMessage')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({message: result.Message});
                },
                (error) => {
                    this.setState({message: error.message});
            });
    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img style={{float: 'left'}} src={logo} className="App-logo" alt="logo"/>
                    <div style={{float: 'left'}}>
                        <div className="App-title">Genealogy Trees</div>
                        <div className="App-hint">Right-click to see menu</div>
                    </div>
                    <div style={{float: 'right', textAlign: 'right'}} className='App-hint'>
                        <div>v0.0.0.6</div>
                        <div>{this.state.message}</div>
                    </div>
                </header>
                <FamilyTree/>
            </div>
        );
    }
}

export default App;
