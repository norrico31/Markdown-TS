import { useState, useMemo } from 'react'
import { Row, Col, Stack, Button, Form, Card, Badge, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"
import ReactSelect from 'react-select'
import { Tag } from "../App"
import styles from '../styles/NoteList.module.css'

type SimplifiedNote = {
    tags: Tag[]
    title: string
    id: string
}

type Props = {
    tags: Tag[]
    notes: SimplifiedNote[]
    editTag: (id: string, label: string) => void
    deleteTag: (id: string) => void
}

export default function NoteList({ tags, notes, editTag, deleteTag }: Props) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState('')
    const [isModal, setIsModal] = useState(false)
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
                        <Button variant='outline-secondary' onClick={() => setIsModal(true)}>Edit Tags</Button>
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
            <EditTagsModal tags={tags} show={isModal} closeModal={() => setIsModal(false)} editTag={editTag} deleteTag={deleteTag} />
        </>
    )
}

function NoteCard({ note }: { note: SimplifiedNote }) {
    return (
        <Card as={Link} to={'/' + note.id} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
            <Card.Body>
                <Stack gap={2} className='align-items-center justify-content-center h-100'>
                    <span className='fs-5'>{note.title}</span>
                    {note.tags.length > 0 ? (
                        <Stack gap={1} direction='horizontal' className='justify-content-center flex-wrap'>
                            {note.tags.map((tag) => (
                                <Badge key={tag.id} className='text-truncate'>{tag.label}</Badge>
                            ))}
                        </Stack>
                    ) : null}
                </Stack>
            </Card.Body>
        </Card>
    )
}

type EditTagsModalProps = {
    tags: Tag[]
    show: boolean;
    closeModal: () => void
    editTag: (id: string, label: string) => void
    deleteTag: (id: string) => void
}

function EditTagsModal({ tags, show, closeModal, editTag, deleteTag }: EditTagsModalProps) {
    function handleDelete(id: string) {
        return () => deleteTag(id)
    }
    return <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
            <Modal.Title>Edit Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Stack gap={2}>
                    {tags.map(tag => (
                        <Row key={tag.id}>
                            <Col>
                                <Form.Control type='text' value={tag.label} onChange={(evt) => editTag(tag.id, evt.target.value)} />
                            </Col>
                            <Col xs='auto'>
                                <Button variant='outline-danger' onClick={handleDelete(tag.id)}>&times;</Button>
                            </Col>
                        </Row>
                    ))}
                </Stack>
            </Form>
        </Modal.Body>
    </Modal>
}