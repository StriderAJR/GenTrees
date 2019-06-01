import {Component} from "react";
import $ from "jquery";
import React from "react";
import FamilyTreeNode from './FamilyTreeNode'
import {ContextMenu, ContextMenuProvider, Item} from "react-contexify";
import {SteppedLineTo} from "react-lineto";
import SweetAlert from 'react-bootstrap-sweetalert'

const familyTreeMenuId = 'family-context-menu';
const nodeHeight = 120;
const nodeWidth = 200;

const MenuItems = {
    CREATE_PERSON: 'CREATE_PERSON',
    CREATE_SPOUSE: 'CREATE_SPOUSE',
    CREATE_SIBLING: 'CREATE_SIBLING',
    CREATE_PARENT: 'CREATE_PARENT',
    CREATE_CHILD: 'CREATE_CHILD',
    EDIT: 'EDIT',
    DELETE: 'DELETE'
};

const RelationType = {
    SIBLING: 'SIBLING',
    SPOUSE: 'SPOUSE',
    PARENT: 'PARENT',
    ADOPTED_CHILD: 'ADOPTED_CHILD',
    CHILD: 'CHILD'
};

const RelationAntonym = (relation) => {
    if(relation === RelationType.SIBLING) return RelationType.SIBLING;
    if(relation === RelationType.SPOUSE) return RelationType.SPOUSE;
    if(relation === RelationType.PARENT) return RelationType.CHILD;
    if(relation === RelationType.CHILD) return RelationType.PARENT;
    if(relation === RelationType.ADOPTED_CHILD) return RelationType.PARENT;
};

// TODO Пункты меню
// TODO    Создать -> сын (выбор второго родителя, если было несколько браков)
// TODO    Создать -> дочь (выбор второго родителя, если было несколько браков)
// TODO    Создать -> отец (недоступно, если уже есть 2 человека в родителях)
// TODO    Создать -> мать (недоступно, если уже есть 2 человека в родителях)
// TODO    Создать -> жена
// TODO    Создать -> муж
// TODO    Создать -> приемный сын (выбор второго родителя, если было несколько браков)
// TODO    Создать -> приемная дочь (выбор второго родителя, если было несколько браков)
// TODO    Создать -> приемный отец (выбор второго родителя, если было несколько браков)
// TODO    Создать -> приемная мать (выбор второго родителя, если было несколько браков)
// TODO Изменить
// TODO Удалить
// TODO Просмотр
// TODO Выбор двух узлов и создание связи
// TODO Не убирать создание нового человека

class FamilyTree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alert: null,
            mouseClickX: 0,
            mouseClickY: 0,
            nodes: [],
            relations: [],
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

        if(menuItem === MenuItems.CREATE_PERSON) {
            this.setState({
                alert: (
                    <SweetAlert style={innerStyle} showCancel title="Enter person's data" onCancel={this.hideAlert}
                                onConfirm={this.processInput.bind(this, x, y, null)} onClick={(e) => e.stopPropagation()}>
                        {this.editForm(null)}
                    </SweetAlert>
                )
            });
        }
        else if(menuItem === MenuItems.CREATE_SPOUSE){
            this.setState({
                alert: (
                    <SweetAlert style={innerStyle} showCancel title="Enter person's data" onCancel={this.hideAlert}
                                onConfirm={this.processInput.bind(this, x, y, RelationType.SPOUSE)}>
                        {this.editForm(null)}
                    </SweetAlert>
                )
            });
        }
        else if(menuItem === MenuItems.CREATE_PARENT){
            this.setState({
                alert: (
                    <SweetAlert style={innerStyle} showCancel title="Enter person's data" onCancel={this.hideAlert}
                                onConfirm={this.processInput.bind(this, x, y, RelationType.PARENT)}>
                        {this.editForm(null)}
                    </SweetAlert>
                )
            });
        }
        else if(menuItem === MenuItems.CREATE_CHILD){
            this.setState({
                alert: (
                    <SweetAlert style={innerStyle} showCancel title="Enter person's data" onCancel={this.hideAlert}
                                onConfirm={this.processInput.bind(this, x, y, RelationType.CHILD)}>
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

        // TODO creating node check intersectaions with other nodes

        console.log(relationType);

        let id = this.state.nodes.length;
        let lastName = this.refLastName.current.value;
        let firstName = this.refFirstName.current.value;
        let gender = this.refGenderMale.current.checked;

        let selectedNodeId = this.state.selectedNodeId;
        let nodes = this.state.nodes;
        let relations = this.state.relations;
        let newNode = {
            id: id,
            gender: gender,
            lastName: lastName,
            firstName: firstName,
            x: x,
            y: y,
            isSelected: false,
        };

        if(selectedNodeId !== null) {
            if(relationType === RelationType.CHILD) {
                relations.push({
                    mainPersonId: selectedNodeId,
                    relatedPersonId: id,
                    relationType: RelationType.PARENT
                });
            }
            else {
                relations.push({
                    mainPersonId: id,
                    relatedPersonId: selectedNodeId,
                    relationType: relationType
                });
            }
            nodes[selectedNodeId].isSelected = false;
        }
        nodes.push(newNode);
        this.setState({nodes: nodes, selectedNodeId: null, relations: relations});
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
        let nodes = this.state.nodes;
        let offset = $('.field').offset();
        let clickX = e.pageX - offset.left;
        let clickY = e.pageY - offset.top;

        if(this.state.alert != null) return;

        // TODO remove this hack when react-rnd will fix bug with onMouseDown

        console.log('clicked position = ' + '[' + clickX + ', ' + clickY + ']');
        for(let i = 0; i < this.state.nodes.length; i++) {
            let node = this.state.nodes[i];
            console.log('node coordinates = ' + '[' + node.x + ', ' + node.y + '] : [' + (node.x+nodeWidth) + ', ' + (node.y + nodeHeight) + ']');
        }

        let clickedNodeIndex = this.isInNode(this.state.nodes, clickX, clickY);
        if(clickedNodeIndex !== -1) {
            if(!nodes[clickedNodeIndex].isBeingDragged) nodes[clickedNodeIndex].isSelected = !nodes[clickedNodeIndex].isSelected;
        }

        console.log('clickedNodeIndex = ' + clickedNodeIndex);

        let contextMenu = this.state.contextMenu;
        if(clickedNodeIndex === -1) {
            // contextMenu = nodes.length === 0 ? this.mainContextMenu() : null;
            for (let i = 0; i < nodes.length; i++) nodes[i].isSelected = false;
        }
        else{
            if(e.button === 2) {
                nodes[clickedNodeIndex].isSelected = true;
                for(let i = 0; i < nodes.length; i++) if(i !== clickedNodeIndex) nodes[i].isSelected = false;
                contextMenu = this.selectedNodeContextMenu();
            }
        }

        this.setState({
            nodes: nodes,
            selectedNodeId: clickedNodeIndex === -1 ? null : clickedNodeIndex,
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
        // node.relations = childState.relations;

        this.setState({nodes: nodes});
    }

    mainContextMenu() {
        return (
            <ContextMenu id={familyTreeMenuId}>
                <Item
                    onClick={() => this.handleMenuItemClick(MenuItems.CREATE_PERSON, this.state.mouseClickX, this.state.mouseClickY)}>
                    Create person
                </Item>
            </ContextMenu>
        );
    }

    selectedNodeContextMenu() {
        return (
            <ContextMenu id={familyTreeMenuId}>
                <Item onClick={() => this.handleMenuItemClick(MenuItems.CREATE_PARENT, this.state.mouseClickX, this.state.mouseClickY)}>
                    Create parent
                </Item>
                <Item onClick={() => this.handleMenuItemClick(MenuItems.CREATE_SPOUSE, this.state.mouseClickX, this.state.mouseClickY)}>
                    Create spouse
                </Item>
                <Item onClick={() => this.handleMenuItemClick(MenuItems.CREATE_CHILD, this.state.mouseClickX, this.state.mouseClickY)}>
                    Create child
                </Item>
            </ContextMenu>
        );
    }

    renderFamilyTree() {
        let nodesElements = [];
        let linesElements = [];

        let relations = this.state.relations;

        for(let i = 0; i < this.state.nodes.length; i++) {
            let node = this.state.nodes[i];
            let nodeDrawId = 'person' + node.id;

            nodesElements.push(
                <FamilyTreeNode
                    drawId={nodeDrawId}
                    person={node}
                    selectionChanged={this.onChildSelectionChanged}
                    positionChanged={this.onChildPositionChanged}
                    stateChanged={this.onChildStateChanged}
                    nodeWidth={nodeWidth}
                    nodeHeight={nodeHeight}
                />);
        }

        for(let i = 0; i < relations.length; i++){
            let relation = relations[i];

            let mainNodeId = 'person' + relation.mainPersonId;
            let mainNode = this.state.nodes[relation.mainPersonId];
            let relationNodeId = 'person' + relation.relatedPersonId;
            let relatedNode = this.state.nodes[relation.relatedPersonId];
            let relationType = relation.relationType;

            let fromAnchor = 'center';
            let toAnchor = 'center';
            let orientation = 'v';
            switch (relationType) {
                case RelationType.SPOUSE:
                    if (mainNode.x < relatedNode.x) {
                        fromAnchor = 'right';
                        toAnchor = 'left';
                    } else {
                        fromAnchor = 'left';
                        toAnchor = 'right';
                    }
                    orientation = 'h';
                    break;
                case RelationType.CHILD:
                case RelationType.ADOPTED_CHILD:
                    fromAnchor = 'top center';
                    toAnchor = 'bottom center';
                    break;
                case RelationType.PARENT:
                    fromAnchor = 'bottom center';
                    toAnchor = 'top center';
                    break;
            }

            linesElements.push(<SteppedLineTo
                from={mainNodeId}
                to={relationNodeId}
                fromAnchor={fromAnchor}
                toAnchor={toAnchor}
                orientation={orientation}/>)
        }

        return (
            <div className='field'>
                {nodesElements}
                {linesElements}
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

export default FamilyTree;