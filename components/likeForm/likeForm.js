import React, { useState, useContext } from "react";
import { LikesContext } from "context/likesContext";

export default function LikeForm() {
	const [like, setLike] = useState("");
	const { addLike } = useContext(LikesContext);

	const handleSubmit = (e) => {
		e.preventDefault();
		addLike(like);
		setLike("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="like">Like</label>
				<input
					type="text"
					name="like"
					id="like"
					value={like}
					onChange={(e) => setLike(e.target.value)}
					placeholder="films I like"
				/>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
}
