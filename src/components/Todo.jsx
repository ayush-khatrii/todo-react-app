import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CheckCircle, Circle, Trash2, Plus, Copy } from "lucide-react";

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [isTodosTab, setTodosTab] = useState(true);
  const [isCompletedTab, setisCompletedTab] = useState(false);

  useEffect(() => {
    const allTodos = JSON.parse(localStorage.getItem("todo")) || [];
    setTodo(allTodos);
    setCompletedTodos(allTodos.filter((item) => item.completed));
  }, []);

  const handleAddTodo = (e) => {
    e.preventDefault();
    const date = new Date();

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    let seconds = date.getSeconds().toString().padStart(2, "0");
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = (hours % 12) || 12; // Convert to 12-hour format
    const formattedDateAndTime = `${day}/${month}/${year} - ${hours}:${minutes} ${ampm}`;

    const newTodo = {
      id: uuidv4(),
      inputVal,
      completed: false,
      createdAt: formattedDateAndTime,
    };

    const updatedTodos = [newTodo, ...todo];
    setTodo(updatedTodos);
    localStorage.setItem("todo", JSON.stringify(updatedTodos));
    setInputVal("");
  };
  const handleDelete = (id) => {
    const updatedCompletedTodos = completedTodos.filter((item) => item.id !== id);
    setCompletedTodos(updatedCompletedTodos);
    localStorage.setItem("todo", JSON.stringify([...todo, ...updatedCompletedTodos]));
  };

  const handleComplete = (id) => {
    const completedItem = todo.find(item => item.id === id);
    if (completedItem) {
      const updatedTodo = { ...completedItem, completed: true };
      const newTodos = todo.filter(item => item.id !== id);
      setTodo(newTodos);
      setCompletedTodos([updatedTodo, ...completedTodos]);
      localStorage.setItem("todo", JSON.stringify([...newTodos, updatedTodo, ...completedTodos]));
    }
  };

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    alert("Copied!");
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-center font-extrabold text-white text-4xl mb-12">
          Todo<span className="text-indigo-500">Ez</span>
        </h1>

        <form
          className="flex gap-3 max-w-2xl mx-auto mb-8"
          onSubmit={handleAddTodo}
        >
          <textarea
            value={inputVal}
            type="text"
            required
            className="flex-1 scroll-auto placeholder:text-zinc-600 text-white outline-none rounded-lg px-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-indigo-500/50 transition-colors"
            placeholder="Add a new task..."
            onChange={(e) => setInputVal(e.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-800 hover:bg-indigo-950 transition-colors duration-300 text-white px-6 py-3 rounded-lg flex items-center gap-2 ease-in-out "
          >
            <Plus size={20} />
            Add
          </button>
        </form>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => {
              setTodosTab(true);
              setisCompletedTab(false);
            }}
            className={`px-6 py-2 rounded-lg transition-all duration-300 ease-in-out  ${isTodosTab
              ? "bg-zinc-900 text-white border-2 border-indigo-500/20"
              : "bg-black text-gray-500 border border-zinc-800"
              }`}
          >
            Active Tasks
          </button>
          <button
            onClick={() => {
              setTodosTab(false);
              setisCompletedTab(true);
            }}
            className={`px-6 py-2 rounded-lg transition-colors ${isCompletedTab
              ? "bg-zinc-900 text-white border-2 border-indigo-500/20"
              : "bg-black text-gray-500 border border-zinc-800"
              }`}
          >
            Completed
          </button>
        </div>

        <div className="max-w-2xl mx-auto">
          {isTodosTab && todo.length === 0 && (
            <p className="text-center text-gray-600">No active tasks</p>
          )}
          {isCompletedTab && completedTodos.length === 0 && (
            <p className="text-center text-gray-600">No completed tasks</p>
          )}

          <div className="max-w-2xl mx-auto space-y-3">
            {isTodosTab &&
              todo.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-zinc-900 overflow-auto border border-zinc-800 rounded-lg p-4 transition-all hover:border-indigo-500/20"
                >
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => handleCopy(item.inputVal)}
                      className="bg-zinc-700 hover:bg-zinc-900 transition-all ease-in-out duration-200 px-3 py-2 rounded-md absolute right-4">
                      <Copy color="white" size="15" />
                    </button>
                    <button
                      onClick={() => handleComplete(item.id)}
                      className="mt-1 text-gray-600 hover:text-indigo-500 transition-opacity"
                    >
                      <Circle size={20} />
                    </button>
                    <div className="flex-1 min-w-0">
                      <pre className="text-white font-medium">
                        {item.inputVal}
                      </pre>
                      <p className="text-sm text-gray-600 mt-1">{item.createdAt}</p>
                    </div>
                  </div>
                </div>
              ))}

            {isCompletedTab &&
              completedTodos.map((item) => (
                <div
                  key={item.id}
                  className="group bg-zinc-900 border border-zinc-800 transition-all duration-300 ease-in-out rounded-lg p-4"
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-1 text-indigo-500">
                      <CheckCircle size={20} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-500 font-medium line-through break-words">
                        {item.inputVal}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">{item.createdAt}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-gray-700 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Todo;