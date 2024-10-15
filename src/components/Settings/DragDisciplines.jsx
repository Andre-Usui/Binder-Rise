import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useContext, useCallback, useEffect, useState } from 'react';
import { DbContext } from '../../db3.jsx'

export default function DragDisciplines() {

  const {
    db,
    initDB,
    editDisciplinesPosition,
    getAllDisciplines
  } = useContext(DbContext);

  const [disOrder, setDisOrder] = useState([]);

  const fetchDisciplines = useCallback(async () => {
    if (!db) {
      await initDB();
      await initDB.done;
    }

    try {
      const fetchedDisciplines = await getAllDisciplines();
      console.log("fetchedDisciplines before sort", fetchedDisciplines);
      fetchedDisciplines.sort((a, b) => a.position - b.position);
      console.log("fetchedDisciplines after sort ", fetchedDisciplines);
      setDisOrder(fetchedDisciplines);
    } catch (error) {
      console.error("Error fetching disciplines:", error);
    }
  }, [db, initDB, getAllDisciplines]);

  useEffect(() => {
    fetchDisciplines();
  }, [fetchDisciplines] );


  const updateDisPositions = async (orderedDis) => {
    console.log("orderedPost: ", orderedDis);
    const updatedDis = orderedDis.map((dis, index) => ({
      ...dis,
      position: index + 1, // Update the position
    }));
    console.log("updatedDis: ", updatedDis)

    await editDisciplinesPosition(updatedDis)

    setDisOrder(updatedDis);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(disOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setDisOrder(items);
    updateDisPositions(items);
  };

    return (
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="dis">
          {(provided) => (
            <ul className="dragableUl" {...provided.droppableProps} ref={provided.innerRef}>
              {disOrder.map((dis, index) => (
                <Draggable
                  key={dis.discipline_id.toString()}
                  draggableId={dis.discipline_id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <li
                      className="dragableLi"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <p>{dis.discipline_name}</p>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
