import React, { useState } from "react";

const Modal = ({ show, onClose, onSubmit, type = 1 }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  if (!show) return null;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (type === 0) {
      if (!name) {
        alert("Name is required");
        return;
      }
      // console.log({ name });
      onSubmit({ name });
      // setColor("");
      setName("");
      onClose();
      // return;
    } else {
      const tag = type === 1 ? document.getElementById("tag").value : null;
      if (!name || !tag || !color) {
        alert("All fields are required");
        return;
      }
      onSubmit({ name, tag, color });
      setColor("");
      setName("");
      onClose();
    }
  };

  const handleOverlayClick = (event) => {
    // console.log(event);
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto backdrop-blur-lg"
      onClick={handleOverlayClick}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-opacity-100 "></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-gray-300 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 gap-5">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Enter something
            </h3>
            <div className="mt-2">
              <form onSubmit={handleSubmit}>
                <label className="block text-xl font-medium text-gray-700">
                  Input
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="my-4 block text-4xl w-full shadow-sm sm:text-sm border-black rounded-md  p-2 "
                    placeholder="Enter name"
                  />
                  {type === 1 && (
                    <>
                      <select
                        className="my-4 block text-4xl w-full shadow-sm sm:text-sm border-black rounded-md  p-2"
                        id="tag"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                      <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="my-4 block text-4xl w-full shadow-sm sm:text-sm border-black rounded-md  p-2 "
                        placeholder="Enter Color"
                      />
                    </>
                  )}
                </label>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
