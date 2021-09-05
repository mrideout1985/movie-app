import Head from 'next/head'
import React from 'react'

const Meta = ({ title, children }) => {
	return (
		<Head>
			<title>{title} | RMDB</title>
			{children}
		</Head>
	)
}

export default Meta
