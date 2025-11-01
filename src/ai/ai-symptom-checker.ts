'use server';

/**
 * @fileOverview An AI symptom checker flow.
 *
 * - aiSymptomChecker - A function that takes user-reported symptoms and returns possible conditions, recommended doctor specialties, and a disclaimer.
 * - AISymptomCheckerInput - The input type for the aiSymptomChecker function.
 * - AISymptomCheckerOutput - The return type for the aiSymptomChecker function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AISymptomCheckerInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A detailed description of the symptoms the user is experiencing.'),
  medicalHistory: z
    .string()
    .optional()
    .describe('Optional: Information about the user medical history.'),
  photo: z
    .string()
    .optional()
    .describe("Optional: A photo of the symptom, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type AISymptomCheckerInput = z.infer<typeof AISymptomCheckerInputSchema>;

const AISymptomCheckerOutputSchema = z.object({
  possibleConditions: z
    .string()
    .describe('A list of possible medical conditions that could be causing the symptoms.'),
  recommendedSpecialties: z
    .string()
    .describe('A list of doctor specialties that the user should consult.'),
  disclaimer: z
    .string()
    .describe('A disclaimer to consult a real doctor for proper diagnosis and treatment.'),
});
export type AISymptomCheckerOutput = z.infer<typeof AISymptomCheckerOutputSchema>;

export async function aiSymptomChecker(input: AISymptomCheckerInput): Promise<AISymptomCheckerOutput> {
  return aiSymptomCheckerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSymptomCheckerPrompt',
  input: {schema: AISymptomCheckerInputSchema},
  output: {schema: AISymptomCheckerOutputSchema},
  prompt: `You are an AI-powered chatbot designed to analyze user-reported symptoms and provide possible conditions, recommended doctor specialties, and a disclaimer to consult a real doctor.

  Symptoms: {{{symptoms}}}
  Medical History: {{{medicalHistory}}}
  {{#if photo}}
  Photo of symptom: {{media url=photo}}
  {{/if}}

  Based on the provided symptoms, medical history, and photo (if any), please provide the following:
  - Possible Conditions: A list of potential medical conditions that could be causing the symptoms.
  - Recommended Specialties: A list of doctor specialties that the user should consult for further evaluation.
  - Disclaimer: A disclaimer to always consult a real doctor for proper diagnosis and treatment, and that this AI is not a substitute for professional medical advice.

  Format your response clearly and concisely.
  `,
});

const aiSymptomCheckerFlow = ai.defineFlow(
  {
    name: 'aiSymptomCheckerFlow',
    inputSchema: AISymptomCheckerInputSchema,
    outputSchema: AISymptomCheckerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
