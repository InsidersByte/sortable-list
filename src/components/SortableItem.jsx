// TODO: flow this file

import React from 'react';
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';
import { DEFAULT_TYPE } from '../constants';

type PropsType = {
    connectDragSource: Function,
    connectDropTarget: Function,
    isDragging: boolean,
    children?: React$Element<any>,
};

const sourceSpec = {
    beginDrag({ id }) {
        return { id };
    },
};

const targetSpec = {
    hover(targetProps, monitor) {
        const targetId = targetProps.id;
        const sourceProps = monitor.getItem();
        const sourceId = sourceProps.id;

        if (sourceId !== targetId) {
            targetProps.onMove({ sourceId, targetId });
        }
    },
    drop(targetProps, monitor) {
        const { id } = monitor.getItem();
        targetProps.onDrop({ id });
    },
};

@dragSource(DEFAULT_TYPE, sourceSpec, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
@dropTarget(DEFAULT_TYPE, targetSpec, connect => ({
    connectDropTarget: connect.dropTarget(),
}))
export default class SortableItem extends React.Component {
    props: PropsType;

    render() {
        const { connectDragSource, connectDropTarget, isDragging, children } = this.props;

        return connectDragSource(connectDropTarget(
            <div style={{ opacity: isDragging ? 0 : 1 }}>
                {children}
            </div>
        ));
    }
}
