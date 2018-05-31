import React, {Component} from 'react';
import $ from 'jquery'

import {ContextMenu, Item} from 'react-contexify';
import {ContextMenuProvider} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css'
import SweetAlert from 'react-bootstrap-sweetalert';
import Rnd from 'react-rnd';


import logo from './logo.svg';
import './App.css';
import {SteppedLineTo} from "react-lineto";

const familyTreeMenuId = 'family-context-menu';
const nodeHeight = 120;
const nodeWidth = 200;

var menuItems = {
    CREATE_PERSON: 0,
    CREATE_SIBLING: 1,
    CREATE_PARENT: 2,
    CREATE_CHILD: 5,
    EDIT: 3,
    DELETE: 4
};

var relationType = {
    SIBLING: 0,
    PARENT: 1,
    ADOPTED_CHILD: 2,
    CHILD: 3
};

var relationAntonym = {
    SIBLING: relationType.SIBLING,
    PARENT: relationType.CHILD,
    CHILD: relationType.PARENT,
    ADOPTED_CHILD: relationType.PARENT
}

// TODO Пункты меню
// TODO    Создать -> сын (выбор второго родителя, если было несколько браков)
// TODO    Создать -> дочь (выбор второго родителя, если было несколько браков)
// TODO    Создать -> отец (недоступно, если уже есть 2 человека в родителях)
// TODO    Создать -> мать (недоступно, если уже есть 2 человека в родителях)
// TODO    Создать -> брат
// TODO    Создать -> сестра
// TODO    Создать -> жена
// TODO    Создать -> муж
// TODO    Создать -> приемный сын (выбор второго родителя, если было несколько браков)
// TODO    Создать -> приемная дочь (выбор второго родителя, если было несколько браков)
// TODO    Создать -> приемный отец (выбор второго родителя, если было несколько браков)
// TODO    Создать -> приемная мать (выбор второго родителя, если было несколько браков)
// TODO Изменить
// TODO Удалить
// TODO Просмотр

class FamilyTreeNode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.person.id,
            drawId: props.drawId,
            gender: props.person.gender,
            lastName: props.person.lastName,
            firstName: props.person.firstName,
            x: props.person.x,
            y: props.person.y,
            width: nodeWidth,
            height: nodeHeight,
            isSelected: props.person.isSelected,
            isBeingDragged: false,
            isClicked: false,
            relations: []
        };

        this.renderNode = this.renderNode.bind(this);
    }

    handleMenuItemClick(itemName){
    }

    handleClick(e){
        e.stopPropagation();
        // console.log('Person id=' + this.state.id + ' was clicked');

        console.log('onClick');
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
        const style = {
            height: nodeHeight,
            width: nodeWidth
        };
        let className = this.state.drawId;
        let innerClassName = 'nodeInner';

        if(this.state.isSelected) innerClassName += ' selected';
        className += this.state.gender ? ' male' : ' female';

        return (
            <div className={className} style={style}>
                <div className={innerClassName}>
                    <b>{this.state.lastName} {this.state.firstName}</b>
                </div>
            </div>
        );
    }

    render(){
        const extendsProps = {
            onMouseDown() {
                console.log('mouse down');
            },
            onClick: (e) => {
                if(this.state.isClicked) this.handleClick(e);
                this.setState({isClicked: false});
            }
        };

        return (
            <Rnd
                size={{width: this.state.width,  height: this.state.height}}
                position={{x: this.state.x, y: this.state.y}}
                onDragStart={(e, d) => {
                    console.log('onDragStart');
                    this.setState({isBeingDragged: true});
                    this.props.stateChanged(this.state);
                }}
                onDrag={(e, d) => {

                }}
                onDragStop={(e, d) => {
                    console.log('onDragStop');
                    if(this.state.x === d.x && this.state.y === d.y){
                        this.setState({isClicked: true});
                        return;
                    }
                    this.setState({ x: d.x, y: d.y });
                    this.props.positionChanged(this.state.id, d.x, d.y);
                    this.props.stateChanged(this.state);
                }}
                enableResizing={false}
                enableUserSelectHack={false}
                extendsProps={extendsProps}
            >
                {this.renderNode()}
            </Rnd>
        );
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
            selectedNodeId: null,
            contextMenu: this.mainContextMenu()
        };

        this.onChildSelectionChanged = this.onChildSelectionChanged.bind(this);
        this.onChildPositionChanged = this.onChildPositionChanged.bind(this);
        this.onChildStateChanged = this.onChildStateChanged.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
        this.processInput = this.processInput.bind(this);
        this.editForm = this.editForm.bind(this);
        this.mainContextMenu = this.mainContextMenu.bind(this);

        this.refLastName = React.createRef();
        this.refFirstName = React.createRef();
        this.refGenderMale = React.createRef();
    }

    editForm(person){
        if(person == null) {
            person = {
                id: null,
                firstName: '',
                lastName: '',
                gender: true
            };
        }

        return (
            <div>
                <div>
                    <label className='edit-form-label' htmlFor='lastName'> Last name: </label>
                    <input className='edit-form-input' id='lastName' ref={this.refLastName} type='text'/>
                </div>
                <div>
                    <label  className='edit-form-label' htmlFor="firstName"> First name: </label>
                    <input className='edit-form-input' id='firstName' ref={this.refFirstName} type='text'/>
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
        let innerStyle = {
            width: 'auto',
            maxWidth: '70%'
        };

        if(menuItem === menuItems.CREATE_PERSON) {
            this.setState({
                alert: (
                    <SweetAlert style={innerStyle} showCancel title="Enter person's data" onCancel={this.hideAlert}
                                onConfirm={this.processInput.bind(this, x, y, null)} onClick={(e) => e.stopPropagation()}>
                        {this.editForm(null)}
                    </SweetAlert>
                )
            });
        }
        else if(menuItem === menuItems.CREATE_SIBLING){
            this.setState({
                alert: (
                    <SweetAlert style={innerStyle} showCancel title="Enter person's data" onCancel={this.hideAlert}
                                onConfirm={this.processInput.bind(this, x, y, relationType.SIBLING)}>
                        {this.editForm(null)}
                    </SweetAlert>
                )
            });
        }
        else if(menuItem === menuItems.CREATE_PARENT){
            this.setState({
                alert: (
                    <SweetAlert style={innerStyle} showCancel title="Enter person's data" onCancel={this.hideAlert}
                                onConfirm={this.processInput.bind(this, x, y, relationType.PARENT)}>
                        {this.editForm(null)}
                    </SweetAlert>
                )
            });
        }
        else if(menuItem === menuItems.CREATE_CHILD){
            this.setState({
                alert: (
                    <SweetAlert style={innerStyle} showCancel title="Enter person's data" onCancel={this.hideAlert}
                                onConfirm={this.processInput.bind(this, x, y, relationType.CHILD)}>
                        {this.editForm(null)}
                    </SweetAlert>
                )
            });
        }
    }

    hideAlert() {
        this.setState({
            alert: null
        });
    }

    processInput(x, y, relationType, e) { // <-- parameter and event object are shiffled! That's NOT my idea

        // TODO crating node check intersectaions with other nodes

        let id = this.state.nodes.length;
        let gender = false;
        let lastName = 'Test';
        let firstName = 'Baka';

        lastName = this.refLastName.current.value;
        firstName = this.refFirstName.current.value;
        gender = this.refGenderMale.current.checked;

        let selectedNodeId = this.state.selectedNodeId;
        let nodes = this.state.nodes;
        let newNode = {
            id: id,
            gender: gender,
            lastName: lastName,
            firstName: firstName,
            x: x,
            y: y,
            isSelected: false,
            relations: [{
                relatedPersonId: selectedNodeId,
                relationType: relationType
            }]
        };

        nodes.push(newNode);
        if(selectedNodeIs !== null) {
            nodes[selectedNodeIs].relations.push({
                relatedPersonId: nodes[nodes.length-1].id,
                relationType: relationAntonym[relationType]
            });
        }
        this.setState({nodes: nodes});

        nodes.push(newNode);
        if(selectedNodeId !== null) {
            nodes[selectedNodeId].relations.push({
                relatedPersonId: nodes[nodes.length-1].id,
                relationType: relationAntonym[relationType]
            });

            nodes[selectedNodeId].isSelected = false;
        }
        this.setState({nodes: nodes, selectedNodeId: null});
        this.hideAlert();
    }

    isInNode(nodes, x, y){
        for(let i = 0; i < nodes.length; i++){
            if((x >= nodes[i].x && x <= (nodes[i].x + nodeWidth))
                && (y >= nodes[i].y && y <= (nodes[i].y + nodeHeight)))
                return i;
        }
        return -1;
    }

    handleClick(e){
        console.log('Field clicked');

        let nodes = this.state.nodes;
        let offset = $('.field').offset();
        let clickX = e.pageX - offset.left;
        let clickY = e.pageY - offset.top;

        if(this.state.alert != null) return;

        // TODO remove this hack when react-rnd will fix bug with onMouseDown

        console.log('[' + clickX + ', ' + clickY + ']');
        for(let i = 0; i < this.state.nodes.length; i++) {
            let node = this.state.nodes[i];
            console.log('[' + node.x + ', ' + node.y + '] : [' + (node.x+nodeWidth) + ', ' + (node.y + nodeHeight) + ']');
        }

        let clickedNode = this.isInNode(this.state.nodes, clickX, clickY);
        if(clickedNode !== -1) {
            if(!nodes[clickedNode].isBeingDragged) nodes[clickedNode].isSelected = !nodes[clickedNode].isSelected;
        }

        console.log(clickedNode);

        let contextMenu = this.state.contextMenu;
        if(clickedNode === -1) {
            contextMenu = nodes.length === 0 ? this.mainContextMenu() : null;
            for (let i = 0; i < nodes.length; i++) nodes[i].isSelected = false;
        }
        else{
            if(e.button === 2) {
                nodes[clickedNode].isSelected = true;
                for(let i = 0; i < nodes.length; i++) if(i !== clickedNode) nodes[i].isSelected = false;
                contextMenu = this.selectedNodeContextMenu();
            }
        }

        this.setState({
            nodes: nodes,
            selectedNodeId: clickedNode === -1 ? null : clickedNode,
            contextMenu: contextMenu,
            mouseClickX: clickX,
            mouseClickY: clickY
        });
    }

    onChildSelectionChanged(childId, isSelected){
        if(this.state.alert != null) return;

        let nodes = this.state.nodes;
        let contextMenu = this.state.contextMenu;
        let selectedNodeId = this.state.selectedNodeId;

        if(isSelected)
            contextMenu = this.selectedNodeContextMenu();

        for(let i = 0; i < nodes.length; i++){
            if(nodes[i].id === childId) {
                nodes[i].isSelected = isSelected;
                selectedNodeId = i;
            }
            else
                nodes[i].isSelected = false;
            // console.log('nodes['+i+'].isSelected = ' + nodes[i].isSelected);
        }
        this.setState({nodes: nodes, selectedNodeId: selectedNodeId,contextMenu: contextMenu});
    }

    onChildPositionChanged(childId, x, y){
        let nodes = this.state.nodes;
        if(nodes == null) return;
        let node = null;
        for(let i = 0; i < nodes.length; i++){
            if(nodes[i].id === childId){
                node = nodes[i];
                break;
            }
        }
        if(node != null){
            node.x = x;
            node.y = y;
            this.setState({nodes: nodes});
        }
    }

    onChildStateChanged(childState){
        let nodes = this.state.nodes;
        let node = nodes[childState.id];
        node.gender = childState.gender;
        node.lastName = childState.lastName;
        node.firstName = childState.firstName;
        node.x = childState.x;
        node.y = childState.y;
        node.width = nodeWidth;
        node.height = nodeHeight;
        node.isSelected = childState.isSelected;
        node.isBeingDragged = childState.isBeingDragged;
        node.relations = childState.relations;

        this.setState({nodes: nodes});
    }

    mainContextMenu() {
        return (
            <ContextMenu id={familyTreeMenuId}>
                <Item
                    onClick={() => this.handleMenuItemClick(menuItems.CREATE_PERSON, this.state.mouseClickX, this.state.mouseClickY)}>
                    Create person
                </Item>
            </ContextMenu>
        );
    }

    selectedNodeContextMenu() {
        return (
            <ContextMenu id={familyTreeMenuId}>
                <Item onClick={() => this.handleMenuItemClick(menuItems.CREATE_PARENT, this.state.mouseClickX, this.state.mouseClickY)}>
                    Create parent
                </Item>
                <Item onClick={() => this.handleMenuItemClick(menuItems.CREATE_SIBLING, this.state.mouseClickX, this.state.mouseClickY)}>
                    Create sibling
                </Item>
                <Item onClick={() => this.handleMenuItemClick(menuItems.CREATE_CHILD, this.state.mouseClickX, this.state.mouseClickY)}>
                    Create child
                </Item>
            </ContextMenu>
        );
    }

    renderFamilyTree() {
        let nodesElements = [];
        let linesElements = [];
        for(let i = 0; i < this.state.nodes.length; i++){
            let node = this.state.nodes[i];
            let nodeDrawId = 'person' + node.id;
            nodesElements.push(
                <FamilyTreeNode
                    drawId={nodeDrawId}
                    person={node}
                    selectionChanged={this.onChildSelectionChanged}
                    positionChanged={this.onChildPositionChanged}
                    stateChanged={this.onChildStateChanged}
                />);
            for(let j = 0; j < node.relations; i++){
                let relation = node.relations[j];
                let relationNodeId = 'person' + relation.relatedPersonId;
                linesElements.push(<SteppedLineTo
                    from={nodeDrawId}
                    to={relationNodeId}
                    fromAnchor="right"
                    toAnchor="left" o
                    rientation='h'/>)
            }
        }

        return (
            <div className='field'>
                {nodesElements}
                {linesElements}
            </div>
        );
    }

    render() {
        let person1 = {
            id: 0,
            gender: true,
            lastName: 'Smith',
            firstName: 'John',
            x: 300,
            y: 300,
            isSelected: false
        };
        let person2 = {
            id: 1,
            gender: false,
            lastName: 'Howell',
            firstName: 'Morgan',
            x: 600,
            y: 500,
            isSelected: false
        };

        const style = {
            delay: 0,
            borderColor: '#ddd',
            borderStyle: 'solid',
            borderWidth: 3,
        };

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
                        <div>v0.0.0.9</div>
                        <div>{this.state.message}</div>
                    </div>
                </header>
                <FamilyTree/>
            </div>
        );
    }
}

export default App;
