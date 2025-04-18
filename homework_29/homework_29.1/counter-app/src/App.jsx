import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "./features/counter/counterSlice";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex w-full items-center justify-center min-h-screen bg-gradient-to-r from-indigo-200 to-pink-200">
      <div className="bg-white w-full max-w-md md:max-w-xl lg:max-w-2xl p-10 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-700">
          🌟 Counter App
        </h1>

        <AnimatePresence mode="wait">
          <motion.div
            key={count}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-6xl font-bold text-indigo-600 mb-6"
          >
            {count}
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-4 justify-center mb-4">
          <button
            onClick={() => dispatch(decrement())}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            -
          </button>
          <button
            onClick={() => dispatch(reset())}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Reset
          </button>
          <button
            onClick={() => dispatch(increment())}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
