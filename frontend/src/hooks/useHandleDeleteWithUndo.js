import { useState } from "react";

export const useHandleDeleteWithUndo = ({ deleteFn, delay = 5000 }) => {
  const [showUndo, setShowUndo] = useState(false);
  const [undoTimer, setUndoTimer] = useState(null);
  const [deletedItem, setDeletedItem] = useState(null);
  const [items, setItems] = useState([]);

  const handleDelete = (item) => {
    setDeletedItem(item);
    setItems((prev) => prev.filter((i) => i?._id !== item?._id));
    setShowUndo(true);

    const timer = setTimeout(() => {
      deleteFn(item?._id);
      setDeletedItem(null);
      setShowUndo(false);
    }, delay);

    setUndoTimer(timer);
  };

  const handleUndo = () => {
    clearTimeout(undoTimer);
    setItems((prev) => [deletedItem, ...prev]);
    setDeletedItem(null);
    setShowUndo(false);
  };

  return {
    items,
    setItems,
    handleDelete,
    handleUndo,
    showUndo,
    deletedItem
  };
};
