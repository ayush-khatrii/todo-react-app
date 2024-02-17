import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Footer from "./Footer";

const App = () => {
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

		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");
		const seconds = date.getSeconds().toString().padStart(2, "0");

		const formattedDateAndTime = `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;

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
		const updatedTodos = todo.filter((item) => item.id !== id);
		setTodo(updatedTodos);
		setCompletedTodos((prevCompletedTodos) =>
			prevCompletedTodos.filter((item) => item.id !== id)
		);
		localStorage.setItem("todo", JSON.stringify(updatedTodos));
	};

	const handleComplete = (id) => {
		const updatedTodos = todo.map((item) =>
			item.id === id ? { ...item, completed: true } : item
		);

		const newCompletedTodos = updatedTodos.filter((item) => item.completed);
		const newTodos = updatedTodos.filter((item) => !item.completed);

		setCompletedTodos((prevCompletedTodos) => [
			...newCompletedTodos,
			...prevCompletedTodos,
		]);
		setTodo(newTodos);

		localStorage.setItem("todo", JSON.stringify(updatedTodos));
	};

	return (
		<>
			<div className='m-10 h-screen'>
				<h1 className='text-center  font-extrabold text-zinc-300 text-3xl my-10'>
					Todo<span className='text-zinc-600 '>Ez</span>
				</h1>
				<form
					className='flex justify-center items-start max-w-xl mx-auto'
					onSubmit={handleAddTodo}
				>
					<input
						value={inputVal}
						type='text'
						required
						className='lg:w-full placeholder:text-zinc-600 text-zinc-50 w-full mb-10 outline-none rounded mx-3 pl-2 py-2 bg-zinc-800'
						placeholder='Buy bread from market'
						onChange={(e) => setInputVal(e.target.value)}
					/>
					<input
						className='bg-zinc-950 border text-zinc-100 border-zinc-800 cursor-pointer px-3 py-2 rounded-lg'
						type='submit'
						value='Add'
					/>
				</form>

				<div className='flex justify-center items-center gap-3 mb-5'>
					<button
						onClick={() => {
							setTodosTab(true);
							setisCompletedTab(false);
						}}
						className={`${
							isTodosTab ? "bg-zinc-950" : ""
						} border border-zinc-600  rounded  px-5 py-1  text-zinc-200`}
					>
						Todos
					</button>
					<button
						onClick={() => {
							setTodosTab(false);
							setisCompletedTab(true);
						}}
						className={`${
							isCompletedTab ? "bg-zinc-950" : ""
						} border border-zinc-600  rounded  px-5 py-1  text-zinc-200`}
					>
						Completed
					</button>
				</div>

				<div className='flex justify-center items-center'>
					<ul className=''>
						{todo.length < 1 && isTodosTab ? (
							<p className='text-zinc-300'>No todos to show</p>
						) : (
							""
						)}
						{completedTodos.length < 1 && isCompletedTab ? (
							<p className='text-zinc-300'>No completed todos to show</p>
						) : (
							""
						)}

						{isTodosTab &&
							todo.map((item, index) => (
								<div
									className='flex justify-between mx-auto max-w-xl items-center bg-zinc-800 my-2'
									key={index}
								>
									<div className='px-5 pb-1'>
										<li
											className={`${
												item.completed ? "line-through opacity-20" : ""
											} my-2 w-full text-zinc-100 font-medium`}
										>
											{item.inputVal}
										</li>
										<span className='text-zinc-600 font-medium'>
											{item.createdAt}
										</span>
									</div>
									<div className='flex ml-20 px-3'>
										<input
											type='checkbox'
											name={item.id}
											checked={item.completed}
											onChange={() => handleComplete(item.id)}
										/>
									</div>
								</div>
							))}

						{isCompletedTab &&
							completedTodos.map((item, index) => (
								<div
									className='flex justify-between mx-auto max-w-xl items-center bg-zinc-800 my-2'
									key={index}
								>
									<div className='px-5 pb-1'>
										<li
											className={`${
												item.completed ? "line-through opacity-50" : ""
											} my-2 w-full text-zinc-100 font-medium`}
										>
											{item.inputVal}
										</li>
										<span className='text-zinc-600 font-medium'>
											{item.createdAt}
										</span>
									</div>
									<div className='flex ml-20 px-3'>
										<button
											name={item.id}
											checked={item.completed}
											onClick={() => handleDelete(item.id)}
											className='bg-zinc-900 px-3 py-1 text-zinc-300 rounded border border-zinc-700'
										>
											Delete
										</button>
									</div>
								</div>
							))}
					</ul>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default App;
