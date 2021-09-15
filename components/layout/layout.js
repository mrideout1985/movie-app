import React from 'react'
import styles from "../../styles/Layout.module.scss"
import Footer from '../footer/footer'
import Navbar from '../navbar/navbar'

const Layout = ({ children }) => {
	return (
		<>
			<Navbar />
			<main className={styles.container}>
				{children}
			</main>
			<Footer />
		</>
	)
}

export default Layout
