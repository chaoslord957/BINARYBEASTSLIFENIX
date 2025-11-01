'use server';

import { summarizeMedicalReport } from '@/ai/flows/summarize-medical-reports';
import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['text/plain'];

const schema = z.object({
  reportText: z.string().optional(),
  reportFile: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => !file || ACCEPTED_FILE_TYPES.includes(file.type),
      'Only .txt files are accepted for upload.'
    ),
})
.refine(data => data.reportText || data.reportFile, {
    message: "Please either paste text or upload a file.",
    path: ["reportText"],
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
    const rawData = {
        reportText: formData.get('reportText'),
        reportFile: formData.get('reportFile'),
    }

    const validatedFields = schema.safeParse({
      reportText: rawData.reportText,
      reportFile: rawData.reportFile instanceof File && rawData.reportFile.size > 0 ? rawData.reportFile : undefined,
    });

    if (!validatedFields.success) {
      return {
        summary: '',
        abnormalValues: '',
        dietPlan: '',
        error: validatedFields.error.errors.map((e) => e.message).join(', '),
      };
    }
    
    let textToSummarize = validatedFields.data.reportText || '';

    if (validatedFields.data.reportFile) {
        const file = validatedFields.data.reportFile;
        const extracted = await file.text();
        if (extracted) {
            textToSummarize += `\n\n--- Extracted from ${file.name} ---\n` + extracted;
        } else {
             return {
                summary: '',
                abnormalValues: '',
                dietPlan: '',
                error: `Could not extract text from the uploaded file: ${file.name}`,
             };
        }
    }


    if (!textToSummarize || textToSummarize.trim().length < 50) {
      return {
        summary: '',
        abnormalValues: '',
        dietPlan: '',
        error: 'The report content must be at least 50 characters long.',
      };
    }

    const result = await summarizeMedicalReport({reportText: textToSummarize});

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
