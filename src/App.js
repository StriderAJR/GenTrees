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
            sex: props.person.sex,
            lastName: props.person.lastName,
            firstName: props.person.firstName,
            x: props.person.x,
            y: props.person.y,
            isSelected: props.person.isSelected
        })
    }

    render(){
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
        this.processInput = this.processInput.bind(this);

        this.refLastName = React.createRef();
        this.refFirstName = React.createRef();
        this.refSex = React.createRef();
    }

    handleMenuItemClick(itemName, x, y) {
        // console.log(itemName + ' was clicked');

        let style = {
            borderRadius: '0'
        };
        this.setState({alert: (
            <SweetAlert style={style}>
                <SweetAlert showCancel title="Enter person's data" onCancel={this.hideAlert} onConfirm={this.processInput.bind(this, x, y)}>
                    <label for="lastName">Last name:</label>
                    <input id='lastName' ref={this.refLastName} type='text'/> <br/>
                    <label htmlFor="firstName">First name:</label>
                    <input id='firstName' ref={this.refFirstName} type='text'/> <br/>
                    <label for="sex">Sex: </label>
                    <input id='sex' ref={this.refSex} type='checkbox'/>
                </SweetAlert>
            </SweetAlert>
        )});
    }

    hideAlert() {
        this.setState({
            alert: null
        });
    }

    processInput(x, y, e) { // <-- parameter and event object are shiffled! That's NOT my idea
        let id = this.state.nodes.length;
        let sex = false;
        let lastName = 'Test';
        let firstName = 'Baka';

        lastName = this.refLastName.current.value;
        firstName = this.refFirstName.current.value;
        sex = this.refSex.current.checked;

        let nodes = this.state.nodes;
        nodes.push({
            id: id,
            sex: sex,
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
                    <Item onClick={() => this.handleMenuItemClick('create-male', this.state.mouseClickX, this.state.mouseClickY)}>
                        Create person
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
