import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';

const boxSource = {
    beginDrag(props){
        return {
            id_pedido: props.id_pedido
        }
    },
    endDrag(props, monitor){
        const
            item = monitor.getItem(),
            dropResult = monitor.getDropResult();

        // if(dropResult)
        //     alert(`Voce conseguiu ${item.id_pedido} no ${dropResult.id_item_nota_fiscal}`);
    }
};

class DragBox extends Component{
    render(){
        const { isDragging, connectDragSource, children } = this.props;
        let styles = {
            borderColor: "transparent",
            borderStyle: "solid",
            borderWidth: 0,
            opacity:1
        };

        if(isDragging)
            styles = {
                borderColor: "green",
                borderStyle: "dashed",
                borderWidth: 2,
                opacity:0.4
            };

        return connectDragSource(<div style={{...styles}}>{children}</div>);
    }
}

export default DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging : monitor.isDragging()
}))(DragBox);