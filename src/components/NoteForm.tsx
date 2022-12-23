import { useRef } from "react"
import { Form, Stack, Row, Col, Button } from "react-bootstrap"
import CreatableReactSelect from 'react-select/creatable'
import { Link } from "react-router-dom"
import { NoteData } from "../App"

type Props = {
    onSubmit: (data: NoteData) => void
}

export default function NoteForm({ onSubmit }: Props) {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)

    function handleSubmit(evt: React.FormEvent) {
        evt.preventDefault()
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control required ref={titleRef} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='tags'>
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect isMulti />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId='markdown'>
                    <Form.Label>Body</Form.Label>
                    <Form.Control required as='textarea' rows={15} ref={markdownRef} />
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