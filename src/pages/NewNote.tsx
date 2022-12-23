import { NoteData } from "../App";
import NoteForm from "../components/NoteForm";

type Props = {
    onSubmit: (data: NoteData) => void
}

export default function NewNote({ onSubmit }: Props) {
    return (
        <>
            <h1 className="mb-4">New Note</h1>
            <NoteForm onSubmit={onSubmit} />
        </>
    )
}