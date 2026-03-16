'use server';

import { ChatType, TextMessage } from '@/components/ChatAnalysis/chatAnalysis.types';
import { ChatAnalysisResponseSchema } from '@/lib/schemas/chatAnalysis.schemas';
import { GoogleGenAI } from '@google/genai';
import z from 'zod';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL_CODE = 'gemini-2.5-flash';

const SCORING_CRITERIA = `
  For each user, score these dimensions 0-10 and write insights based on what you actually see in their messages:
  - romance: use of love language, terms of endearment, romantic intent
  - friendliness: warmth, words of affirmation, appreciation, showing interest in others
  - anger: expressive frustriations and anger
  - vulnerability: personal sharing, emotional honesty, admitting feelings or fears
  - reciprocation: how well they match others' energy and emotional investment
  - expressiveness: use of emojis, punctuation, enthusiasm, emotional range in text
  - powerDynamics: who invests more emotionally - 10 means this user clearly drives/dominates, 5 means equal
`;

const prompts = {
  [ChatType.DirectChat]: `
    Analyze this conversation between two people.
    ${SCORING_CRITERIA}
    For each user also determine their personal tendency towards the other person (romantic, friendly, mixed, neutral or unclear).
    Two users can have different tendencies - one can lean romantic while the other stays friendly.
    Finally determine the overall relationship type between both users combined (romantic, friendly, mixed, neutral or unclear).
    `,

  [ChatType.GroupChat]: `
    Analyze this group conversation between multiple people.
    ${SCORING_CRITERIA}
    For each user also determine their personal tendency in the group (romantic, friendly, mixed, neutral or unclear).
    Focus on each person's general social dynamic within the group - not pairwise relationships.
    Tendency reflects how this person engages with the group overall (friendly, mixed, neutral or unclear - romantic is valid only if clearly directed at someone in the group).
    Determine the overall group dynamic (friendly, mixed, neutral or unclear).
  `,
};

const GEMINI_CONFIG = {
  systemInstruction: `
    You are an expert human relationship analyst who reads between the lines.
    You analyze real private conversations and give honest, specific, evidence-based insights.
    You do not sugarcoat. If someone is cold, say so. If the dynamic is unbalanced, name it.
    Base every observation on actual message patterns you see - never generalize.
`,
  thinkingConfig: {
    thinkingBudget: 0,
  },
  responseMimeType: 'application/json',
  responseSchema: z.toJSONSchema(ChatAnalysisResponseSchema),
};

export const getChatAnalysis = async (messages: TextMessage[], chatType: ChatType) => {
  console.log('API CALLED');

  const formattedMessages = messages.map((m, i) => `[${i}] ${m.from}: "${m.text}"`).join('\n');
  const chatAnalysisPrompt = prompts[chatType] + `\n Messages: ${formattedMessages}`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_CODE,
      config: GEMINI_CONFIG,
      contents: chatAnalysisPrompt,
    });

    if (!response.text) throw new Error('Empty response from Gemini');

    return ChatAnalysisResponseSchema.parse(JSON.parse(response.text));
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};
