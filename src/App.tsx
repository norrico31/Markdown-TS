import { useMemo, } from 'react'
import { Container } from 'react-bootstrap'
import { Routes, Route, Navigate } from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid'
import Note from './components/Note'
import NoteLayout from './components/NoteLayout'
import EditNote from './pages/EditNote'
import NewNote from './pages/NewNote'
import NoteList from './pages/NoteList'
import { useLocalStorage } from './utils/useLocalStorage'

export type Note = {
	id: string
} & NoteData

export type RawNote = {
	id: string
} & RawNoteData

export type RawNoteData = {
	title: string
	markdown: string
	tagIds: string[]
}
export type NoteData = {
	title: string
	markdown: string
	tags: Tag[]
}

export type Tag = { id: string; label: string }

function App() {
	const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
	const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

	const noteWithTags = useMemo(() => {
		return notes.map((note) => {
			return { ...note, tags: tags.filter((tag) => note.tagIds.includes(tag.id)) }
		})
	}, [notes, tags])

	function createNote({ tags, ...data }: NoteData) {
		setNotes((prevNotes) => {
			return [...prevNotes, { ...data, id: uuidV4(), tagIds: tags.map(t => t.id) }]
		})
	}

	function addTag(tag: Tag) {
		setTags((prevTag) => [...prevTag, tag])
	}

	function editNote(id: string, { tags, ...data }: NoteData) {
		setNotes((prevNotes => prevNotes.map((note) => note.id !== id ? note : { ...note, ...data, tagIds: tags.map(t => t.id) })))
	}

	function deleteNote(id: string) {
		setNotes((prevNotes) => prevNotes.filter((n) => n.id !== id))
	}

	return (
		<Container className='my-4'>
			<Routes>
				<Route path='/' element={<NoteList notes={noteWithTags} tags={tags} />} />
				<Route path='/new' element={<NewNote onSubmit={createNote} addTag={addTag} tags={tags} />} />
				<Route path='/:id' element={<NoteLayout notes={noteWithTags} />}>
					<Route index element={<Note deleteNote={deleteNote} />} />
					<Route path='edit' element={<EditNote onSubmit={editNote} addTag={addTag} tags={tags} />} />
				</Route>
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
		</Container>
	)
}

export default App
