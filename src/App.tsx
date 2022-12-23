import { Container } from 'react-bootstrap'
import { Routes, Route, Navigate } from 'react-router-dom'
import NewNote from './pages/NewNote'

export type Note = {
	id: string
} & NoteData

export type NoteData = {
	title: string
	markdown: string
	tags: Tags[]
}

export type Tags = { id: string; label: string }

function App() {
	return (
		<Container className='my-4'>
			<Routes>
				<Route path='/' element={<h1>Hello</h1>} />
				<Route path='/new' element={<NewNote />} />
				<Route path='/:id'>
					<Route index element={<h1>Show</h1>} />
					<Route path='edit' element={<h1>Edit</h1>} />
				</Route>
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
		</Container>
	)
}

export default App
