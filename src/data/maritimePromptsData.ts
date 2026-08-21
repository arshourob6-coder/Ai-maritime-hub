import { MaritimePrompt } from '../components/PromptLibrary';
import { PROMPTS_BATCH_1 } from './promptsBatch1';
import { PROMPTS_BATCH_2 } from './promptsBatch2';
import { PROMPTS_BATCH_3 } from './promptsBatch3';

export const ALL_MARITIME_PROMPTS: MaritimePrompt[] = [
  ...PROMPTS_BATCH_1,
  ...PROMPTS_BATCH_2,
  ...PROMPTS_BATCH_3
];
