"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import EmptyState from "./empty-state";
import { Note } from "@/lib/types";
import { Button } from "./ui/button";
import { Trash2, Plus, Search, Clock, Loader2, LogOut } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";

interface NotesSidebarProps {
  notes: Note[];
  onSelectNote: (note: Note) => void;
  createNewNote: () => void;
  onDeleteNote: (id: string) => void;
  activeNoteId?: string;
  isLoading?: boolean;
}

export default function NotesSidebar({
  notes,
  onSelectNote,
  createNewNote,
  onDeleteNote,
  activeNoteId,
  isLoading = false,
}: NotesSidebarProps) {
  const [search, setSearch] = useState("");

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="h-full flex flex-col bg-gradient-to-b from-background to-primary/5 border-primary/10 shadow-xl backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-l from-indigo-400 to-primary bg-clip-text text-transparent">
              Your Notes
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {notes.length} {notes.length === 1 ? 'thought' : 'thoughts'}
            </p>
          </div>
          <Button
            onClick={createNewNote}
            size="sm"
            className="rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/20"
          >
            <Plus className="h-4 w-4 mr-2" />
            New
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 rounded-xl border-primary/20 bg-background/50"
          />
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="h-full flex items-center justify-center p-6">
            <EmptyState
              message={search ? "No notes found" : "No notes yet"}
              buttonText="Create First Note"
              onButtonClick={createNewNote}
            />
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <ScrollArea className="flex-1 px-4">
              <AnimatePresence>
                <div className="space-y-2 py-2">
                  {filteredNotes.map((note) => (
                    <motion.div
                      key={note.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        onClick={() => onSelectNote(note)}
                        className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${activeNoteId === note.id
                            ? "bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 shadow-lg shadow-primary/10"
                            : "bg-background/50 border border-primary/5 hover:bg-primary/5 hover:border-primary/10"
                          }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-semibold truncate ${activeNoteId === note.id
                                ? "text-primary"
                                : "text-foreground"
                              }`}>
                              {note.title || "Untitled"}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {note.content.substring(0, 80) || "Empty note..."}
                            </p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>
                                  {note.createdAt ? new Date(note.createdAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric'
                                  }) : 'Just now'}
                                </span>
                              </div>
                              <span>•</span>
                              <span>
                                {note.content.split(/\s+/).filter(w => w.length > 0).length} words
                              </span>
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteNote(note.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            </ScrollArea>
          </div>
        )}
      </CardContent>

      <div className="p-4 border-t border-primary/10 mt-auto">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </div>
    </Card>
  );
}