import { createContext, useState } from "react";

const LikesContext = createContext();

const LikesProvider = ({ children }) => {
	const [likes, setLikes] = useState([]);

	const refreshLikes = async () => {
		try {
			const res = await fetch("/api/getLikes");
			const latestLikes = await res.json();
			setLikes(latestLikes);
		} catch (err) {
			console.error(err);
		}
	};

	const addLike = async (name) => {
		try {
			const res = await fetch("/api/createLike", {
				method: "POST",
				body: JSON.stringify({ name }),
				headers: { "Content-Type": "application/json" },
			});
			const newLike = await res.json();
			setLikes((prevLikes) => {
				return [newLike, ...prevLikes];
			});
		} catch (err) {
			console.error(err);
		}
	};

	const updateLike = async (updatedLike) => {
		try {
			const res = await fetch("/api/updateLike", {
				method: "PUT",
				body: JSON.stringify(updatedLike),
				headers: { "Content-Type": "application/json" },
			});
			const newLike = await res.json();
			setLikes((prevLikes) => {
				const existingLikes = [...prevLikes];
				const existingLike = existingLikes.find(
					(like) => like.id === updatedLike.id
				);
				existingLike.fields = updatedLike.fields;
				return existingLikes;
			});
		} catch (err) {
			console.error(err);
		}
	};

	const deleteLike = async (id) => {
		try {
			const res = await fetch("/api/deleteLike", {
				method: "DELETE",
				body: JSON.stringify({ id }),
				headers: { "Content-Type": "application/json" },
			});
			const newLike = await res.json();
			setLikes((prevLikes) => {
				return prevLikes.filter((like) => like.id !== id);
			});
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<LikesContext.Provider
			value={{
				likes,
				setLikes,
				refreshLikes,
				updateLike,
				deleteLike,
				addLike,
			}}
		>
			{children}
		</LikesContext.Provider>
	);
};

export { LikesProvider, LikesContext };
