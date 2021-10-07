import Navbar from "../components/navbar/navbar"
import { render, screen } from '@testing-library/react'


const useRouter = jest.spyOn(require('next/router'), 'useRouter')
test('renders navbar', () => {
	render(<Navbar />)
})