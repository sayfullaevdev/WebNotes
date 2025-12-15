
import { Note } from "@/lib/types";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Edit2, Calendar, Tag } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface NoteViewProps {
  note: Note;
  onEdit: () => void;
}

export default function NoteView({ note, onEdit }: NoteViewProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col bg-card border-primary/10 shadow-xl overflow-hidden">
        {/* Header */}
        <CardHeader className="pb-4 bg-card">
          <div className="flex items-start justify-between mb-2">
            <div>
              <motion.h2
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                className="text-3xl font-bold mb-2 bg-gradient-to-l  to-primary bg-clip-text text-transparent"
              >
                {note.title}
              </motion.h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(note.createdAt).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  <span>{note.content.split(/\s+/).filter(w => w.length > 0).length} words</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Content Area */}
        <CardContent className="flex-1 p-6">
          <ScrollArea className="h-full pr-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <div className="whitespace-pre-wrap leading-relaxed text-foreground/90">
                {note.content || (
                  <div className="text-center py-12 text-muted-foreground italic">
                    This note is empty. Click edit to add content.
                  </div>
                )}
              </div>
            </motion.div>
          </ScrollArea>
        </CardContent>

        {/* Action Footer */}
        <CardFooter className="p-6 border-t border-primary/10 bg-card">
          <Button
            onClick={onEdit}
            className="ml-auto rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg shadow-primary/20"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Note
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}