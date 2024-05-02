import { useEffect, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import PropTypes from 'prop-types';

import DroppableHeader from "./DroppableHeader";
import { DraggableItem } from "./DraggableItem";
import CanbanItem from "./CanbanItem";
import DroppableFooter from "./DroppableFooter";


export const DroppableItem = ({ data }) => {
    const { setNodeRef } = useDroppable({
        id: data.id
    })
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (data.items.length === 0 || data.items.length <= 3) {
            setPage(1);
        }
    }, [data.items.length])

    const dataToDisplay = () => {
        const start = (page - 1) * 3;
        const end = start + 3;
        return data.items.slice(start, end);
    }

    const handlePage = (type) => {
        if (type === "next" && page < Math.ceil(data.items.length / 3)) {
            setPage((prev) => prev + 1);
        }
        else if (type === "prev" && page > 1) {
            setPage((prev) => prev - 1);
        }
    }

    return (
        <div ref={setNodeRef} className="w-[300px] h-full border border-slate-200 rounded-lg relative">
            <DroppableHeader droppableHeader={data.content} totalItem={data.items.length} />
            {
                data.items.length > 0 ? (
                    <div className="flex flex-col justify-between items-baseline gap-4 p-4">
                        {
                            dataToDisplay().map((draggable) => (
                                <DraggableItem key={draggable.id} itemId={draggable.id}>
                                    <CanbanItem content={draggable.content} />
                                </DraggableItem>
                            ))
                        }
                    </div>
                ) : (
                    <div className="p-6">
                        <div className="w-full h-full flex justify-center items-center">
                            <p className="text-slate-700">No item</p>
                        </div>
                    </div>
                )
            }
            <DroppableFooter onHandlePage={handlePage} />
        </div>
    )
}

DroppableItem.propTypes = {
    data: PropTypes.object.isRequired
};    