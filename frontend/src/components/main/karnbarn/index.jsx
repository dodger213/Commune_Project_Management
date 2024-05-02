import { DndContext } from "@dnd-kit/core"
import { useState } from "react";
import { DroppableItem } from "./components/DroppableItem";

function Karnbarn() {
  const [droppableList, setDroppableList] = useState([
    {
      id: "droppable-1",
      content: "Todo",
      items: [
        {
          id: "draggable-1",
          content: `1 Dashboard.`
        },
        {
          id: "draggable-2",
          content: `2 Wallet integration.`
        },
        {
          id: "draggable-3",
          content: `3 Frontend complete.`
        },
        {
          id: "draggable-4",
          content: `4 Backend FAst API integration.`
        },
      ]
    },
    {
      id: "droppable-2",
      content: "In Progress",
      items: []
    },
    {
      id: "droppable-3",
      content: "In Review",
      items: []
    },
    {
      id: "droppable-4",
      content: "Done",
      items: []
    }
  ]);
  const [prevDropId, setPrevDropId] = useState(null);

  const handleDragEnd = (event) => {
    const { over, active } = event;

    if (!over) {
      return;
    }

    const overId = over.id;
    const activeId = active.id;

    if (overId === activeId) {
      return;
    }

    const copyDroppableList = [...droppableList];

    const prevDroppableIndex = copyDroppableList.findIndex((droppable) => droppable.id === prevDropId);
    const prevDroppable = copyDroppableList[prevDroppableIndex];

    const nextDroppableIndex = copyDroppableList.findIndex((droppable) => droppable.id === overId);
    const nextDroppable = copyDroppableList[nextDroppableIndex];

    const activeItemIndex = prevDroppable.items.findIndex((item) => item.id === activeId);
    const activeItem = prevDroppable.items[activeItemIndex];

    prevDroppable.items.splice(activeItemIndex, 1);

    nextDroppable.items.push(activeItem);

    setDroppableList(copyDroppableList);
    setPrevDropId(null);
  }

  const handleDragOver = (event) => {
    const { over } = event;
    const overId = over?.id;

    if (!prevDropId) {
      setPrevDropId(overId);
      return;
    }
  }


  return (
    <div className="min-h-screen flex flex-row flex-wrap justify-center gap-2 p-6 overflow-hidden">
      <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
        {droppableList.map((droppable) => (
          <DroppableItem data={droppable} key={droppable.id} />
        ))}
      </DndContext>
    </div>
  );
}

export default Karnbarn;