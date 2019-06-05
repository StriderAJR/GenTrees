import {Component} from "react";
import $ from "jquery";
import React from "react";

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

export default FamilyTreeNodeLine;