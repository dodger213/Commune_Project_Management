import { useDraggable } from '@dnd-kit/core';
import PropTypes from 'prop-types';

export const DraggableItem = ({ itemId, children }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: itemId,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: isDragging ? 9999 : undefined,
    } : undefined;

    return (
        <div className="bg-white w-full rounded-lg border border-slate-200" ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </div>
    );
}

DraggableItem.propTypes = {
    children: PropTypes.node.isRequired,
    itemId: PropTypes.string.isRequired,
};