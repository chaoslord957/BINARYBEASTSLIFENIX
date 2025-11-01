'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized diet plans based on user input.
 *
 * It exports:
 * - `generateDietPlan`: An async function that takes user input and returns a personalized diet plan.
 * - `GenerateDietPlanInput`: The TypeScript type for the input to the `generateDietPlan` function.
 * - `GenerateDietPlanOutput`: The TypeScript type for the output of the `generateDietPlan` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDietPlanInputSchema = z.object({
  needs: z
    .string()
    .describe(
      'Specific dietary needs and preferences, e.g., weight loss, muscle gain, vegetarian, allergies.'
    ),
});
export type GenerateDietPlanInput = z.infer<typeof GenerateDietPlanInputSchema>;

const GenerateDietPlanOutputSchema = z.object({
  dietPlan: z
    .string()
    .describe(
      'A personalized diet plan tailored to the users specific needs and preferences, formatted in Markdown.'
    ),
});
export type GenerateDietPlanOutput = z.infer<typeof GenerateDietPlanOutputSchema>;

export async function generateDietPlan(input: GenerateDietPlanInput): Promise<GenerateDietPlanOutput> {
  return generateDietPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDietPlanPrompt',
  input: {schema: GenerateDietPlanInputSchema},
  output: {schema: GenerateDietPlanOutputSchema},
  prompt: `You are a nutritionist. Create a personalized diet plan based on the user's needs and preferences.

Format the diet plan in a readable, user-friendly way using Markdown. Use headers for meal times (e.g., Breakfast, Lunch, Dinner, Snacks), and use bullet points for food items.

Needs and preferences: {{{needs}}}

Diet Plan:`,
});

const generateDietPlanFlow = ai.defineFlow(
  {
    name: 'generateDietPlanFlow',
    inputSchema: GenerateDietPlanInputSchema,
    outputSchema: GenerateDietPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
