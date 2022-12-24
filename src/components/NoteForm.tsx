import { useState, useRef } from "react"
import { Form, Stack, Row, Col, Button } from "react-bootstrap"
import CreatableReactSelect from 'react-select/creatable'
import { Link, useNavigate } from "react-router-dom"
import { v4 as uuidV4 } from 'uuid'
import { NoteData, Tag } from "../App"

type Props = {
    onSubmit: (data: NoteData) => void
    addTag: (tag: Tag) => void
    tags: Tag[]
} & Partial<NoteData>

export default function NoteForm({ onSubmit, addTag, tags, title = '', markdown = '', tags: [] }: Props) {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
    const navigate = useNavigate()

    function handleSubmit(evt: React.FormEvent) {
        evt.preventDefault()
        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags
        })
        navigate('..')
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control required ref={titleRef} defaultValue={title} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='tags'>
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect
                                isMulti
                                options={tags.map((t) => ({ label: t.label, value: t.id }))}
                                onCreateOption={label => {
                                    const newTag = { id: uuidV4(), label }
                                    addTag(newTag)
                                    setSelectedTags([...selectedTags, newTag])
                                }}
                                value={selectedTags.map((tag: Tag) => ({ label: tag.label, value: tag.id }))}
                                onChange={(tags) => {
                                    setSelectedTags(tags.map((tag) => ({ label: tag.label, id: tag.value })))
                                }} />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId='markdown'>
                    <Form.Label>Body</Form.Label>
                    <Form.Control required as='textarea' rows={15} ref={markdownRef} defaultValue={markdown} />
                </Form.Group>
                <Stack direction="horizontal" gap={2} className='justify-content-end'>
                    <Button type='submit' variant='primary'>Save</Button>
                    <Link to='..'>
                        <Button type='button' variant='outline-secondary'>Cancel</Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
    )
}
