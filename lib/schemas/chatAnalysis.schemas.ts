import z from 'zod';

const tendencies = ['Romantic', 'Friendly', 'Mixed', 'Neutral', 'Unclear'] as const;

const UserAnalysisSchema = z.object({
  username: z.string().describe('Name of the user'),
  scores: z.object({
    romance: z.number().min(0).max(10).describe('Romance score from 1 to 10'),
    friendliness: z.number().min(0).max(10).describe('Friendliness score from 1 to 10'),
    anger: z.number().min(0).max(10).describe('Anger score from 1 to 10'),
    vulnerability: z.number().min(0).max(10).describe('Vulnerability score from 1 to 10'),
    reciprocation: z.number().min(0).max(10).describe('Reciprocation score from 1 to 10'),
    expressiveness: z.number().min(0).max(10).describe('Expressiveness score from 1 to 10'),
    powerDynamics: z.number().min(0).max(10).describe('10 = this user clearly invests more emotionally, 5 = balanced'),
  }),
  insights: z.object({
    romance: z.string().describe('2-3 sentences, cite specific message patterns'),
    friendliness: z.string().describe('2-3 sentences, cite specific message patterns'),
    anger: z.string().describe('2-3 sentences, cite specific message patterns'),
    vulnerability: z.string().describe('2-3 sentences, cite specific message patterns'),
    reciprocation: z.string().describe('2-3 sentences, cite specific message patterns'),
    expressiveness: z.string().describe('2-3 sentences, cite specific message patterns'),
    powerDynamics: z.string().describe('2-3 sentences, cite specific message patterns'),
  }),
  tendency: z.enum(tendencies).describe('This is specific users emotional tendency towards the other person'),
  summary: z.string().describe('Few sharp poetic sentences capturing this persons role in the relationship'),
});

export const ChatAnalysisResponseSchema = z.object({
  relationshipOverview: z.string().describe('Few sentence read on the overall relationship dynamic'),
  relationshipType: z.enum(tendencies).describe('Overall dynamic between users combined'),
  users: z.array(UserAnalysisSchema),
});

export type ChatAnalysisType = z.infer<typeof ChatAnalysisResponseSchema>;
