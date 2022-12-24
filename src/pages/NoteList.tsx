import { Row, Col, Stack, Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function NoteList() {
    return (
        <>
            <Row>
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
                        <Form.Group controlId=''>Title</Form.Group>
                        <Form.Control type='text' />
                    </Col>
                </Row>
            </Form>
        </>
    )
}