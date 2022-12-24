import { useParams, Navigate } from "react-router-dom"
import { Note } from "../App"

type Props = {
    notes: Note[]
}

export default function NoteLayout({ notes }: Props) {
    const { id } = useParams()
    const note = notes.find(n => n.id === id)
    if (note == null) return <Navigate to='/' replace />
    return (
        <div>NoteLayout</div>
    )
}
