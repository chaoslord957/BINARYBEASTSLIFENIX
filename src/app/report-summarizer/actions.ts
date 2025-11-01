'use server';

import { summarizeMedicalReport } from '@/ai/flows/summarize-medical-reports';
import { z } from 'zod';

const schema = z.object({
  reportText: z
    .string()
    .min(50, { message: 'Report text must be at least 50 characters long.' }),
});

type FormState = {
  summary: string;
  abnormalValues: string;
  dietPlan: string;
  error: string;
};

export async function summarizeReport(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const validatedFields = schema.safeParse({
      reportText: formData.get('reportText'),
    });

    if (!validatedFields.success) {
      return {
        summary: '',
        abnormalValues: '',
        dietPlan: '',
        error: validatedFields.error.errors.map((e) => e.message).join(', '),
      };
    }

    const result = await summarizeMedicalReport(validatedFields.data);

    if (!result) {
      return {
        summary: '',
        abnormalValues: '',
        dietPlan: '',
        error: 'The AI service could not generate a summary. Please try again.',
      };
    }

    return {
      summary: result.summary,
      abnormalValues: result.abnormalValues,
      dietPlan: result.dietPlan,
      error: '',
    };
  } catch (error) {
    console.error(error);
    return {
      summary: '',
      abnormalValues: '',
      dietPlan: '',
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}
