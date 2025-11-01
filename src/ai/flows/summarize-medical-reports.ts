'use server';

/**
 * @fileOverview Summarizes medical reports, highlights abnormal values, and suggests a diet plan.
 *
 * - summarizeMedicalReport - A function that handles the medical report summarization process.
 * - SummarizeMedicalReportInput - The input type for the summarizeMedicalReport function.
 * - SummarizeMedicalReportOutput - The return type for the summarizeMedicalReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeMedicalReportInputSchema = z.object({
  reportText: z
    .string()
    .describe('The text content extracted from the medical report.'),
});
export type SummarizeMedicalReportInput = z.infer<typeof SummarizeMedicalReportInputSchema>;

const SummarizeMedicalReportOutputSchema = z.object({
  summary: z.string().describe('A summary of the medical report.'),
  abnormalValues: z
    .string()
    .describe('Highlighted abnormal values found in the report.'),
  dietPlan: z
    .string()
    .describe('A suggested diet plan based on the abnormal values.'),
});
export type SummarizeMedicalReportOutput = z.infer<typeof SummarizeMedicalReportOutputSchema>;

export async function summarizeMedicalReport(
  input: SummarizeMedicalReportInput
): Promise<SummarizeMedicalReportOutput> {
  return summarizeMedicalReportFlow(input);
}

const summarizeMedicalReportPrompt = ai.definePrompt({
  name: 'summarizeMedicalReportPrompt',
  input: {schema: SummarizeMedicalReportInputSchema},
  output: {schema: SummarizeMedicalReportOutputSchema},
  prompt: `You are a medical expert who can summarize medical reports, highlight abnormal values, and suggest a diet plan based on those values. Analyze the following medical report text and provide a summary, highlight any abnormal values, and suggest a diet plan.

Medical Report Text:
{{{reportText}}}`,
});

const summarizeMedicalReportFlow = ai.defineFlow(
  {
    name: 'summarizeMedicalReportFlow',
    inputSchema: SummarizeMedicalReportInputSchema,
    outputSchema: SummarizeMedicalReportOutputSchema,
  },
  async input => {
    const {output} = await summarizeMedicalReportPrompt(input);
    return output!;
  }
);
