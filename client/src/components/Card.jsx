import axios from "axios";
import React from "react";

const Card = ({ item, day, month, time, data, setActiveCard, listid }) => {
  async function delete_option(id) {
    // console.log(id);
    await axios
      .delete(
        `https://kanban-board-server-sandy.vercel.app/api/v1/insideoptions/delete-insideoption/${id}/${listid}`
      )
      .then((res) => {
        // console.log(res.data);
        data();
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <div
        className=" border border-solid border-gray-300 cursor-grab p-2 rounded-lg active:opacity-80 active:border-solid active:border-green-500 "
        draggable="true"
        onDragStart={(e) => setActiveCard(item)}
        onDragEnd={() => setActiveCard(null)}
      >
        <div className="flex justify-between text-xl">
          <div className="flex items-center">
            <p>#{item._id.slice(5, 10)}</p>
            <p className="h-2 w-2 bg-gray-500 m-2 rounded "></p>
            <p>{day + " " + month + " " + time}</p>
          </div>
          <button onClick={() => delete_option(item._id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
        <div className="font-bold text-2xl">{item.name}</div>
        <div className="flex justify-between">
          <div
            className={
              item.tag === "low"
                ? "bg-green-500 rounded-lg p-1"
                : item.tag === "medium"
                ? "bg-yellow-500  rounded-lg p-1"
                : "bg-red-500  rounded-lg p-1"
            }
          >
            {item.tag}
          </div>
          <div
            className={`${item.verified} ? 'text-green-600' : 'text-blue-600`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
