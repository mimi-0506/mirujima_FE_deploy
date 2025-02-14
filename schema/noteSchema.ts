import { z } from 'zod';

export const noteSchema = z.object({
  title: z.string().trim().min(2).max(30),
  content: z.string()
});

export type NoteInputData = z.infer<typeof noteSchema>;
