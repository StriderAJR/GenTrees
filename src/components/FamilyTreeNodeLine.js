import {Component} from "react";
import $ from "jquery";
import React from "react";

var TAG = 'FamilyTreeNode ';

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
        let lineWidth = 10;

        console.log(TAG + 'render(): from(' + lineFromX + ';' + lineFromY + ') to(' + lineToX + ';' + lineToY + ') width = ' + width);

        let isStepped = false;
        if(lineFromY !== lineToY) isStepped = true;
        if(isStepped) {
            let deltaY = lineToY - lineFromY;
            let isDown = true;
            if(deltaY < 0) isDown = false;

            let widthHalf = (lineToX - lineFromX) / 2;

            let stylePart1 = {
                borderTop: '5px solid black',
                position: 'absolute',
                top: lineFromY,
                left: lineFromX,
                width: widthHalf,
                height: lineWidth+'px'
            };
            let styleStep = {
                borderLeft: '5px solid black',
                position: 'absolute',
                top: isDown ? lineFromY : lineToY,
                left: lineFromX + widthHalf,
                width: lineWidth+'px',
                height: isDown ? Math.abs(deltaY) : Math.abs(deltaY)+(lineWidth / 2)
            };
            let stylePart2 = {
                borderTop: '5px solid black',
                position: 'absolute',
                top: lineFromY + deltaY,
                left: lineFromX + widthHalf,
                width: widthHalf,
                height: lineWidth+'px'
            };

            console.log(TAG + 'render(): deltaY=' + deltaY + ' widthHalf=' + widthHalf);

            let idPart1 = 'line-from'+from.id+'-to-'+to.id+'-part-1';
            let idStep = 'line-from'+from.id+'-to-'+to.id+'-step';
            let idPart2 = 'line-from'+from.id+'-to-'+to.id+'-part-2';

            return (
                <div>
                    <div id={idPart1} style={stylePart1}>&nbsp;</div>
                    <div id={idStep} style={styleStep}>&nbsp;</div>
                    <div id={idPart2} style={stylePart2}>&nbsp;</div>
                </div>
            );
        }
        else {
            let style = {
                borderTop: '5px solid black',
                position: 'absolute',
                top: lineFromY,
                left: lineFromX,
                width: width,
                height: lineWidth+'px'
            };
            let id = 'line-from'+from.id+'-to-'+to.id;

            return (
                <div>
                    <div id={id} style={style}>&nbsp;</div>
                </div>
            );
        }
    }
}

export default FamilyTreeNodeLine;