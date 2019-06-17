import {Component} from "react";
import React from "react";
import Rnd from "react-rnd";

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
            height: this.props.height,
            width: this.props.width
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

export default FamilyTreeNode;