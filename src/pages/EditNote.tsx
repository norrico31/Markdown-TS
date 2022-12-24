import { NoteData, Tag } from "../App"
import NoteForm from "../components/NoteForm"
import { useNote } from "../components/NoteLayout"

type Props = {
    onSubmit: (id: string, data: NoteData) => void
    addTag: (tag: Tag) => void
    tags: Tag[]
}

export default function EditNote({ onSubmit, addTag, tags }: Props) {
    const note = useNote()
    return (
        <>
            <h1 className="mb-4">Edit Note</h1>
            <NoteForm title={note.title} markdown={note.markdown} onSubmit={(data) => onSubmit(note.id, data)} addTag={addTag} tags={tags} />
        </>
    )
}