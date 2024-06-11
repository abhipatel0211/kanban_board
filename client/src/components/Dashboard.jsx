import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import Lists from "./Lists";
import Modal from "./modal";

const Dashboard = () => {
  const [option, setOption] = useState([]);
  const [activeCard, setActiveCard] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [componentKey, setComponentKey] = useState(0);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getAllOption = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/options/option"
      );
      setOption(data?.category);
      // console.log(data.category);
    } catch (error) {
      // console.log(error);
    }
  };

  const handleaddcategory = (value) => {
    // console.log("Dashboard", value);
    postOption(value.name);

    handleCloseModal();
  };

  const postOption = async (name = name) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/options/option",
        { name }
      );
      // console.log(data);
      getAllOption();
    } catch (error) {
      console.log(error);
    }
  };

  const onDrop = async (allcard, status, index) => {
    // console.log(activeCard);
    // console.log(
    //   `${activeCard} is going to place at ${status} and at the position ${index}`
    // );
    // console.log(`"fromListId": ${activeCard.insideoption},
    // "toListId":${status},
    // "fromPosition":${activeCard.order},
    // "toPosition":${index}`);
    await axios
      .put("http://localhost:5000/api/reorder", {
        fromListId: activeCard.insideoption,
        toListId: status,
        fromPosition: activeCard.order,
        toPosition: index,
      })
      .then((res) => {
        // console.log(res.data.message, res.data);
        setComponentKey((prevKey) => prevKey + 1);

        allcard(status);
        // allcard(activeCard.insideoption);
        // getAllOption();
        // allcard(activeCard.insideoption);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllOption();
  }, [componentKey]);
  return (
    <>
      <div>
        <div className="flex m-2 gap-2 overflow-x-scroll snap-x snap-mandatory ">
          {option.map((c, index) => (
            <div className="snap-start" key={index}>
              <Lists
                key={index}
                _id={c._id}
                name={c.name}
                getAllOption={getAllOption}
                setActiveCard={setActiveCard}
                onDrop={onDrop}
              />
            </div>
          ))}
          <Modal
            show={showModal}
            onClose={handleCloseModal}
            onSubmit={handleaddcategory}
            type={0}
          />
          <div>
            <button
              className="border border-solid border-gray-300 p-2   w-full flex-wrap-0 flex items-center justify-center "
              onClick={handleOpenModal}
            >
              <p className="w-60">Add List</p>
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
        {/* <div className="text-3xl ">
          Activecard : {activeCard && activeCard._id}
        </div> */}
      </div>
      {/* <div>
        {option.map((c) => (
          <div key={c._id}>
            <h2>{c.name} </h2>
            <button onClick={() => delete_option(c._id)}>Delete</button>
          </div>
        ))}
        <form>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
          <button onClick={postOption}>Add</button>
        </form>
        <Card />
      </div> */}
    </>
  );
};

export default Dashboard;
