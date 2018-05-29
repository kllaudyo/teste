import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';

const boxTarget = {
    drop(props, monitor){
        props.onDrop(monitor.getItem())
    }
};

class DropBox extends Component{
    render(){
        const { canDrop, isOver, connectDropTarget, children } = this.props;
        const isActive = canDrop && isOver;

        let styles = {
            borderColor: "transparent",
            borderStyle: "solid",
            borderWidth: 0
        };
        if(isActive)
            styles = {
                borderColor: "green",
                borderStyle: "dashed",
                borderWidth: 2
            };

        return connectDropTarget(
            <div
                style={{...styles}}
            >
                {children}
            </div>);
    }
}

export default DropTarget(ItemTypes.BOX, boxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))(DropBox);