import { useState, useMemo } from 'react'
import { Row, Col, Stack, Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import ReactSelect from 'react-select'
import { Note, Tag } from "../App"

type SimplifiedNote = {
    tags: Tag[]
    title: string
    id: string
}

type Props = {
    tags: Tag[]
    notes: SimplifiedNote[]
}

export default function NoteList({ tags, notes }: Props) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState('')
    const filteredNotes = useMemo(() => {
        return notes.filter((n) => {
            return (title === '' || n.title.toLowerCase().includes(title.toLocaleLowerCase())) && (selectedTags.length === 0 || selectedTags.every(t => n.tags.some(noteTag => noteTag.id === t.id)))
        })
    }, [title, selectedTags, notes])
    return (
        <>
            <Row className='align-items-center mb-4'>
                <Col>
                    <h1>Notes</h1>
                </Col>
                <Col xs='auto'>
                    <Stack gap={2} direction='horizontal'>
                        <Link to='/new'>
                            <Button variant='primary'>Create</Button>
                        </Link>
                        <Button variant='outline-secondary'>Edit Tags</Button>
                    </Stack>
                </Col>
            </Row>
            <Form>
                <Row className='mb-4'>
                    <Col>
                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type='text' value={title} onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setTitle(evt.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='tags'>
                            <Form.Label>Tags</Form.Label>
                            <ReactSelect
                                isMulti
                                options={tags.map((t) => ({ label: t.label, value: t.id }))}
                                value={selectedTags.map((tag: Tag) => ({ label: tag.label, value: tag.id }))}
                                onChange={(tags) => {
                                    setSelectedTags(tags.map((tag) => ({ label: tag.label, id: tag.value })))
                                }} />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Row xs={1} sm={2} xl={4} className='g-3'>
                {filteredNotes.map(note => (
                    <Col key={note.id}>
                        <NoteCard note={note} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

function NoteCard({ note }: { note: SimplifiedNote }) {
    return (
        <h2>Hello!</h2>
    )
}