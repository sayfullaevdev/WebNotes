"use client";

import { Note } from "@/lib/types";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Save } from "lucide-react";

interface NoteEditorProps {
  note: Note;
  onSave: (note: Note) => void;
  onCancel: () => void;
}

export default function NoteEditor({ note, onCancel, onSave }: NoteEditorProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  // Синхронизация при смене активной заметки
  useEffect(() => {
     setTitle(note.title);
     setContent(note.content);
  }, [note]);

  const handleSave = async () => {
    // ... твоя логика handleSave
    // для краткости пропускаю fetch, он такой же как у тебя
    const updatedNote = { ...note, title, content };
    onSave(updatedNote);
  };

  return (
    <div className="flex flex-col h-full bg-white/50">
      {/* Toolbar */}
      <div className="flex justify-between items-center px-8 py-5 border-b border-slate-100/50">
        <span className="text-xs font-bold tracking-wider text-slate-300 uppercase">Режим редактирования</span>
        <div className="flex space-x-2">
            <Button variant="ghost" onClick={onCancel} className="text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100">
                Отмена
            </Button>
            <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 shadow-md shadow-purple-200">
                <Save className="h-4 w-4 mr-2" />
                Сохранить
            </Button>
        </div>
      </div>

      {/* Inputs Area */}
      <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок заметки"
          className="w-full text-4xl font-extrabold text-slate-800 bg-transparent border-none focus:ring-0 px-0 placeholder:text-slate-300 mb-4 font-sans"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Начните писать здесь..."
          className="w-full h-[calc(100%-80px)] text-lg leading-relaxed text-slate-600 bg-transparent border-none focus:ring-0 px-0 resize-none placeholder:text-slate-300 custom-scrollbar focus:outline-none"
        />
      </div>
    </div>
  );
}