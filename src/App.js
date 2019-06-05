import 'react-contexify/dist/ReactContexify.min.css'
import logo from './static/logo.svg'
import './style/App.css'

import React, {Component} from 'react';
import FamilyTree from './components/FamilyTree'

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

const LineType = {
    SOLID: 'SPLID',
    DASHED: 'DASHED'
};

const LineAnchor = {
    TOP: 'TOP',
    BOTTOM: 'BOTTOM',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT'
};

function isNullOrUndefined(value) {
    return typeof (value) === "undefined" && value === null;
}

class PersonNode {
    constructor(id, gender, lastName, firstName, x, y, width, height, isSelected) {
        this.id = id;
        this.gender = isNullOrUndefined(gender) ? true : gender;
        this.lastName = isNullOrUndefined(lastName) ? '' : lastName;
        this.firstName = isNullOrUndefined(firstName) ? '' : firstName;;
        this.x = x;
        this.y = y;
        this.width = isNullOrUndefined(width) ? nodeWidth : width;
        this.height = isNullOrUndefined(height) ? nodeHeight : height;;
        this.isSelected = isSelected;
    }
}

class Relation {
    constructor(mainPersonId, relatedPersonId, relationType) {
        this.mainPersonId = mainPersonId;
        this.relatedPersonId = relatedPersonId;
        this.relationType = relationType;
    }
}

// TODO Пункты меню
// TODO    Создать -> сын (выбор второго родителя, если было несколько браков)
// TODO    Создать -> дочь (выбор второго родителя, если было несколько браков)
// TODO    Создать -> отец (недоступно, если уже есть 2 человека в родителях)
// TODO    Создать -> мать (недоступно, если уже есть 2 человека в родителях)
// TODO    Создать -> жена
// TODO    Создать -> муж
// TODO    Создать -> приемный сын (выбор второго родителя)
// TODO    Создать -> приемная дочь (выбор второго родителя)
// TODO    Создать -> приемный отец (выбор второго родителя)
// TODO    Создать -> приемная мать (выбор второго родителя)
// TODO Изменить
// TODO Удалить
// TODO Просмотр
// TODO Выбор двух узлов и создание связи
// TODO Не убирать создание нового человека

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
            width: props.width,
            height: props.height,
            isSelected: props.person.isSelected,
            isBeingDragged: false,
            isClicked: false,
            // relations: props.person.relations
        };

        this.renderNode = this.renderNode.bind(this);
    }

    handleMenuItemClick(itemName){
    }

    handleClick(e){
        e.stopPropagation();
        // console.log('Person id=' + this.state.id + ' was clicked');

        console.log('Tree node onClick');
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
            isSelected: props.person.isSelected,
            // relations: props.person.relations
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
                onDragStart = {(e, d) => {
                    console.log('Tree node onDragStart');
                    this.setState({isBeingDragged: true});
                    this.props.stateChanged(this.state);
                }}
                onDrag = {(e, d) => {
                    console.log('dragging...');
                    this.setState({ x: d.x, y: d.y });
                    this.props.stateChanged(this.state);
                }}
                onDragStop = {(e, d) => {
                    console.log('Tree node onDragStop');
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
                onMouseDown = {() => {console.log('HELP');}}
            >
                {this.renderNode()}
            </Rnd>
        );
    }
}

class FamilyTreeNodeLine extends Component {
    constructor(props) {
        super(props);

        // console.log('FamilyTreeNodeLine constructor(): from nodes = ');
        // console.log(props.fromNodes);
        // console.log('FamilyTreeNodeLine constructor(): to nodes = ');
        // console.log(props.toNodes);

        this.state = {
            fromNodes: props.fromNodes,
            toNodes: props.toNodes
        };
    }

    componentWillReceiveProps(newProps) {
        console.log('line newProps()');
        this.setState({
            fromNodes: newProps.fromNodes,
            toNodes: newProps.toNodes
        })
    }

    shouldComponentUpdate() {
        // Always update component if the parent component has been updated.
        // The reason for this is that we would not only like to update
        // this component when the props have changed, but also when
        // the position of our target elements has changed.
        return true;
    }

    render() {
        console.log('line refreshed');

        let from = this.state.fromNodes[0];
        let to = this.state.toNodes[0];

        // console.log('FamilyTreeNodeLine render(): from node = ');
        // console.log(from);
        // console.log('FamilyTreeNodeLine render(): to node = ');
        // console.log(to);

        let lineFromX = from.x + from.width;
        let lineFromY = from.y + from.height / 2;
        let lineToX = to.x;
        let lineToY = to.y + to.height / 2;
        let width = lineToX - lineFromX;

        console.log('line render(): x, y, width = ' + lineFromX + ', ' + lineFromY + ', ' + width);

        let style = {
            borderTop: '5px solid black',
            position: 'absolute',
            top: lineFromY,
            left: lineFromX,
            width: width,
            height: '10px'
        };
        let id = 'testLine';

        return (
            <div>
                <div id={id} style={style}>&nbsp;</div>
            </div>
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
            relations: [],
            selectedNodeId: null,
            contextMenu: this.mainContextMenu()
        };

        this.onChildSelectionChanged = this.onChildSelectionChanged.bind(this);
        this.onChildPositionChanged = this.onChildPositionChanged.bind(this);
        this.onChildStateChanged = this.onChildStateChanged.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
        this.addFamilyTreeNode = this.addFamilyTreeNode.bind(this);
        this.renderEditForm = this.renderEditForm.bind(this);
        this.mainContextMenu = this.mainContextMenu.bind(this);
        this.getSelectedNode = this.getSelectedNode.bind(this);
        this.getNodeById = this.getNodeById.bind(this);
        this.getSelectedNodeRelations = this.getSelectedNodeRelations.bind(this);

        this.refLastName = React.createRef();
        this.refFirstName = React.createRef();
        this.refGenderMale = React.createRef();
    }

    renderEditForm(person){
        if(person == null) {
            person = new PersonNode();
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
                            <input type='radio' ref={this.refGenderMale} name='gender' value='male' defaultChecked={!person.gender}/> Male
                        </label>
                        <label style={{paddingLeft: '10px'}}>
                            <input type='radio' name='gender' value='female' defaultChecked={person.gender}/> Female
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
                                onConfirm={this.addFamilyTreeNode.bind(this, x, y, null)} onClick={(e) => e.stopPropagation()}>
                        {this.renderEditForm(null)}
                    </SweetAlert>
                )
            });
        }
        else if(menuItem === MenuItems.CREATE_SPOUSE){
            this.setState({
                alert: (
                    <SweetAlert style={innerStyle} showCancel title="Enter person's data" onCancel={this.hideAlert}
                                onConfirm={this.addFamilyTreeNode.bind(this, x, y, RelationType.SPOUSE)}>
                        {this.renderEditForm(null)}
                    </SweetAlert>
                )
            });
        }
        else if(menuItem === MenuItems.CREATE_PARENT){
            this.setState({
                alert: (
                    <SweetAlert style={innerStyle} showCancel title="Enter person's data" onCancel={this.hideAlert}
                                onConfirm={this.addFamilyTreeNode.bind(this, x, y, RelationType.PARENT)}>
                        {this.renderEditForm(null)}
                    </SweetAlert>
                )
            });
        }
        else if(menuItem === MenuItems.CREATE_CHILD){
            this.setState({
                alert: (
                    <SweetAlert style={innerStyle} showCancel title="Enter person's data" onCancel={this.hideAlert}
                                onConfirm={this.addFamilyTreeNode.bind(this, x, y, RelationType.CHILD)}>
                        {this.renderEditForm(null)}
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

    getSelectedNode() {
        return this.getNodeById(this.state.selectedNodeId);
    }

    getSelectedNodeRelations() {
        if(this.state.selectedNodeId == null) return null;

        let searchId = this.state.selectedNodeId;
        let relations = this.state.relations;
        let found = [];
        for(let i = 0; i < relations.length; i++) {
            if(relations[i].relatedPersonId === searchId) found.push(relations[i]);
        }
        return found;
    }

    getNodeById(id) {
        if(id == null) return null;

        let nodes = this.state.nodes;
        for(let i = 0; i < nodes.length; i++) {
            if (nodes[i].id === id) return nodes[i];
        }
        return null;
    }

    addFamilyTreeNode(x, y, relationType, e) { // <-- parameter and event object are shiffled! That's NOT my idea

        // TODO creating node check intersectaions with other nodes

        console.log(relationType);

        let id = this.state.nodes.length;
        let lastName = this.refLastName.current.value;
        let firstName = this.refFirstName.current.value;
        let gender = this.refGenderMale.current.checked;

        let selectedNodeId = this.state.selectedNodeId;
        let selectedNode = this.getSelectedNode();
        let nodes = this.state.nodes;
        let relations = this.state.relations;
        let newNode =  new PersonNode(id, gender, lastName, firstName, x, y, nodeWidth, nodeHeight, false);

        if(selectedNodeId !== null) {
            let selectedNodeRelations = this.getSelectedNodeRelations();

            if(relationType === RelationType.CHILD) relations.push(new Relation(selectedNodeId, id, RelationType.PARENT));
            else relations.push(new Relation(id, selectedNodeId, relationType));

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

        console.log('tree onChildStateChanged(): new.x = ' + childState.x + ' new.y = ' + childState.y);

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
                    width={nodeWidth}
                    height={nodeHeight}
                    selectionChanged={this.onChildSelectionChanged}
                    positionChanged={this.onChildPositionChanged}
                    stateChanged={this.onChildStateChanged}
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

            // linesElements.push(<SteppedLineTo
            //     from={mainNodeId}
            //     to={relationNodeId}
            //     fromAnchor={fromAnchor}
            //     toAnchor={toAnchor}
            //     orientation={orientation}/>)

            let to = this.getNodeById(relation.mainPersonId);
            let from = this.getNodeById(relation.relatedPersonId);

            // console.log('FamilyTree render(): from node = ');
            // console.log(from);
            // console.log('FamilyTree render(): to node = ');
            // console.log(to);

            console.log('tree render(): from.X = ' + from.x + ' from.y = ' + from.y);
            console.log('tree render(): to.X = ' + to.x + ' to.y = ' + to.y);

            linesElements.push(<FamilyTreeNodeLine
                fromNodes={[from]}
                toNodes={[to]}
            />)
        }

        return (
            <div className='field'>
                {nodesElements}
                {linesElements}
            </div>
        );
    }

    render() {
            let style = {
                backgroundColor: 'red',
                width: 'inherit',
                height: 'inherit',
                zIndex: 999
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

        let versionText = 'v' + process.env.REACT_APP_VERSION;

        return (
            <div className="App">
                <header className="App-header">
                    <img style={{float: 'left'}} src={logo} className="App-logo" alt="logo"/>
                    <div style={{float: 'left'}}>
                        <div className="App-title">Genealogy Trees</div>
                        <div className="App-hint">Right-click to see menu</div>
                    </div>
                    <div style={{float: 'right', textAlign: 'right'}} className='App-hint'>
                        <div>{versionText}</div>
                        <div>{this.state.message}</div>
                    </div>
                </header>
                <FamilyTree/>
            </div>
        );
    }
}

export default App;
