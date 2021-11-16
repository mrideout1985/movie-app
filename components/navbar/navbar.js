/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDebounce, useClickAway } from "react-use";
import { useRouter } from "next/router";
import { SvgMovie } from "../icons/Movie";
import useSearch from "hooks/useSearch";
import styles from "../../styles/Navbar.module.scss";
import { useUser } from "@auth0/nextjs-auth0";

const Navbar = () => {
	const [input, setInput] = useState("");
	const [search, setSearch] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const { user } = useUser();
	const results = useSearch(search);
	const router = useRouter();
	const listRef = useRef(null);

	useClickAway(listRef, () => {
		setIsOpen(false);
	});

	console.log(user);

	const [] = useDebounce(
		() => {
			setSearch(input);
		},
		100,
		[input]
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		router.push(`/search/${input}`);
		setInput("");
	};

	const handleResults = (results) => {
		if (results !== undefined) {
			return results?.results?.slice([0], [10]).map((result, i) => {
				if (result.poster_path) {
					return (
						<li className={styles.li}>
							{console.log(result)}
							<Link
								key={i}
								href={
									result.media_type === "movie"
										? `/movie/${result.id}`
										: `/tv/${result.id}`
								}
							>
								<a>
									<div className={styles.result}>
										<img
											src={`https://image.tmdb.org/t/p/original${result.poster_path}`}
											alt="poster"
										/>
										<div className={styles.text}>
											{result.title
												? result.title
												: result.name}
										</div>
									</div>
								</a>
							</Link>
						</li>
					);
				}
			});
		}
	};

	return (
		<nav className={styles.container} aria-label="RMDB Menu">
			<div className={styles.logo}>
				<Link href="/" role="menuitem" tabindex="-1">
					<a>
						<SvgMovie color={"fff"} height={50} width={50} />
						<h1>RMDb</h1>
					</a>
				</Link>
			</div>

			<div className={styles.links}>
				<Link role="link" href="/">
					<a
						className={[
							[styles["default"]],
							[router?.pathname === "/" ? styles["active"] : ""],
						].join(" ")}
					>
						Movies
					</a>
				</Link>
				<Link href="/tvshows">
					<a
						className={[
							[styles["default"]],
							[
								router?.pathname === "/tvshows"
									? styles["active"]
									: "",
							],
						].join(" ")}
					>
						TV Shows
					</a>
				</Link>
				<Link href="/actors">
					<a
						className={[
							[styles["default"]],
							[
								router?.pathname === "/actors"
									? styles["active"]
									: "",
							],
						].join(" ")}
					>
						Actors
					</a>
				</Link>
			</div>

			<div className={styles.search}>
				<div className={styles.buttons}>
					{!user ? (
						<a className={styles.login} href="/api/auth/login">
							Login
						</a>
					) : (
						<>
							<a
								className={styles.login}
								href={`/profile/${user?.nickname ?? "_"}`}
							>
								Profile
							</a>
							<a
								className={styles.logout}
								href="/api/auth/logout"
							>
								Logout
							</a>
						</>
					)}
				</div>
				<form className={styles.form} onSubmit={handleSubmit}>
					{/* <input type="submit" value="SEARCH" /> */}
					<input
						onFocus={() => setIsOpen(true)}
						type="search"
						className={styles.styledinput}
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Search RMDb"
					/>
				</form>
				<ul ref={listRef} className={styles.ul}>
					{isOpen && handleResults(results)}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;

export async function getServerSideProps(ctx) {
	const { req, res } = ctx;
	const session = getSession(req, res);

	return {
		props: { user: session?.user ?? null },
	};
}
