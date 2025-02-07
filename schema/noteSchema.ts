import { z } from 'zod';

import { URL_REGEX } from '@/constant/regex';

export const noteSchema = z.object({
  title: z.string().min(2).max(30),
  content: z.string(),
  linkUrl: z.string().regex(URL_REGEX).optional()
});

export type NoteInputData = z.infer<typeof noteSchema>;
