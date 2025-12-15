"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmptyState from "@/components/empty-state";
import Header from "@/components/header";
import NoteEditor from "@/components/note-editor";
import NoteView from "@/components/note-view";
import { Note } from "@/lib/types";
import { Brain} from "lucide-react";
import NotesSidebar from "@/components/notes-siderbar";

export default function Home() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [activeNote, setActiveNote] = useState<Note | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("/api/notes")
            .then((res) => res.json())
            .then((data) => {
                setNotes(data);
                setActiveNote(data[0] ?? null);
                setIsLoading(false);
            });
    }, []);

    const createNewNote = async () => {
        const res = await fetch("/api/notes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: "Untitled",
                content: "",
            }),
        });

        if (!res.ok) return;

        const newNote = await res.json();
        setNotes([newNote, ...notes]);
        setActiveNote(newNote);
        setIsEditing(true);
    };

    const selectNote = (note: Note) => {
        setActiveNote(note);
        setIsEditing(false);
    };

    const saveNote = async (updatedNote: Note) => {
        await fetch(`/api/notes/${updatedNote.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: updatedNote.title,
                content: updatedNote.content,
            }),
        });

        setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
        setActiveNote(updatedNote);
        setIsEditing(false);
    };

    const deleteNote = async (id: string) => {
        await fetch(`/api/notes/${id}`, { method: "DELETE" });
        setNotes(notes.filter((note) => note.id !== id));
        if (activeNote?.id === id) {
            setActiveNote(notes[1] ?? null);
        }
    };

    const renderNoteContent = () => {
        if (!activeNote && notes.length === 0 && !isLoading) {
            return (
                <EmptyState
                    message="Create your first note to get started"
                    buttonText="New Note"
                    onButtonClick={createNewNote}
                />
            );
        }

        if (activeNote && isEditing) {
            return (
                <NoteEditor
                    note={activeNote}
                    onSave={saveNote}
                    onCancel={() => setIsEditing(false)}
                />
            );
        }

        if (activeNote) {
            return <NoteView note={activeNote} onEdit={() => setIsEditing(true)} />;
        }

        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                    <Brain className="w-16 h-16 mx-auto text-primary/30" />
                    <p className="text-lg text-muted-foreground">Select a note to view</p>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            <Header />

            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <main className="container relative mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[calc(100vh-80px)]">
                {/* Sidebar */}
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="lg:col-span-1 flex flex-col h-[calc(100vh-120px)]"
                >
                    <NotesSidebar
                        createNewNote={createNewNote}
                        notes={notes}
                        onSelectNote={selectNote}
                        onDeleteNote={deleteNote}
                        activeNoteId={activeNote?.id}
                        isLoading={isLoading}
                    />
                </motion.div>

                {/* Main Content */}
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-3"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeNote?.id || "empty"}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="h-full"
                        >
                            {renderNoteContent()}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </main>

            {/* Floating Action Button */}

        </div>
    );
}