import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./modal";
import Card from "./Card";
import DropArea from "./DropArea";

const Lists = ({
  _id = 1,
  name = "hello",
  ucolor = "green",
  status = _id,
  getAllOption,
  onDrop,
  setActiveCard,
}) => {
  const [data, setdata] = useState([]);
  const addcard = async (_id, name, tag, color) => {
    // console.log("add card", _id, (name = "hii"), ucolor, length);

    await axios
      .post(`http://localhost:5000/api/v1/insideoptions/create-insideoption`, {
        insideoption: _id,
        name,
        order: data.length + 1,
        tag,
        color,
      })
      .then((res) => {
        // console.log(res.data.message);
        allcards();
      })
      .catch((err) => console.log(err));
  };

  const allcards = async (item) => {
    await axios
      .get(
        `http://localhost:5000/api/v1/options/option/${
          item !== undefined ? item : _id
        }`
      )
      .then((res) => {
        // console.log(res.data.category.data);
        setdata(res.data.category.data);
      })
      .catch((err) => console.log(err));
  };

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  useEffect(() => {
    allcards();
  }, [onDrop]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (value) => {
    // console.log(value);
    addcard(_id, value.name, value.tag, value.color);
    // setSubmittedValue(value);
  };
  async function delete_category(id) {
    await axios
      .delete(`http://localhost:5000/api/v1/options/option/${_id}`)
      .then((res) => {
        // console.log(res.data);
        getAllOption();
      })
      .catch((err) => console.log(err));
  }

  data.sort((a, b) => a.order - b.order);

  return (
    <div className="flex flex-col m-2 gap-4 w-80 flex-shrink-0 ">
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
      {/* {submittedValue && (
        <div className="mt-4">
          <h2>You entered:</h2>
          <p>{submittedValue}</p>
        </div>
      )} */}
      <div className="flex  justify-between">
        <div className="flex items-center text-2xl font-semibold gap-2">
          <p className={"h-2 w-2  m-2 rounded  " + `bg-${ucolor}-600`}></p>
          <p>{name}</p>

          <p className="font-gray-400 ml-2">{data.length}</p>
        </div>
        <div className="flex items-center gap-3 text-gray-500">
          {/* menu options */}
          <button
            className="flex gap-1 cursor-pointer"
            onClick={delete_category}
          >
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

            {/* <p className="h-1 w-1 bg-gray-500 rounded-full"></p>
            <p className="h-1 w-1 bg-gray-500 rounded-full"></p>
            <p className="h-1 w-1 bg-gray-500 rounded-full"></p> */}
          </button>
          {/* Add button */}
          <button
            className="ml-2 cursor-pointer"
            onClick={handleOpenModal}
            // onClick={() => addcard(_id, name, ucolor, length)}
          >
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <DropArea onDrop={() => onDrop(allcards, status, 1)} />
        {data.map((item, index) => {
          // console.log(item);
          const date = new Date(item.createdAt);
          const day = date.getUTCDate();
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          const month = monthNames[date.getUTCMonth()]; // getUTCMonth() returns 0-11

          // Extract the time and format it to 12-hour format
          let hours = date.getUTCHours();
          const minutes = date.getUTCMinutes();
          const ampm = hours >= 12 ? "PM" : "AM";
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

          // Combine time components
          const time = `${hours}:${formattedMinutes} ${ampm}`;
          // console.log(`Day: ${day}`);
          // console.log(`Month: ${month}`);
          // console.log(`Time: ${time}`);
          // console.log(date.getHours());
          // console.log(date.);
          return (
            <div key={index}>
              <Card
                key={index}
                listid={_id}
                item={item}
                day={day}
                month={month}
                time={time}
                data={allcards}
                setActiveCard={setActiveCard}
              />
              <DropArea
                onDrop={() => onDrop(allcards, status, item.order + 1)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lists;
