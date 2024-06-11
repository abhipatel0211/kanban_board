import React, { useState } from "react";

const DropArea = ({ onDrop }) => {
  const [showDropArea, setShowDropArea] = useState(false);
  //   const [isDraggingOver, setIsDraggingOver] = useState(false);

  //   const handleDrop = (e) => {
  //     e.preventDefault();
  //     setShowDropArea(false);
  //     const draggedItemId = e.dataTransfer.getData("text/plain");
  //     onDrop(draggedItemId, listid);
  //   };
  return (
    <section
      className={
        showDropArea
          ? "mt-4  w-full h-24 columns border-solid border border-black rounded-lg p-4 mb-4 transition-all duration-300 ease-in-out text-3xl"
          : "opacity-0"
      }
      onDragEnter={() => setShowDropArea(true)}
      onDragLeave={() => setShowDropArea(false)}
      onDrop={() => {
        onDrop();
        setShowDropArea(false);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      Drop Here
    </section>
  );
};

export default DropArea;
