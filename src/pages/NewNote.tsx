import { NoteData, Tag } from "../App";
import NoteForm from "../components/NoteForm";

type Props = {
    onSubmit: (data: NoteData) => void
    addTag: (tag: Tag) => void
    tags: Tag[]
}

export default function NewNote({ onSubmit, addTag, tags }: Props) {
    return (
        <>
            <h1 className="mb-4">New Note</h1>
            <NoteForm onSubmit={onSubmit} addTag={addTag} tags={tags} />
        </>
    )
}