'use server';

import { summarizeMedicalReport } from '@/ai/flows/summarize-medical-reports';
import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TEXT_TYPES = ['text/plain'];
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const schema = z.object({
  reportText: z.string().optional(),
  reportFile: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => !file || ACCEPTED_TEXT_TYPES.includes(file.type),
      'Only .txt files are accepted for upload.'
    ),
    photo: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      '.jpg, .jpeg, .png and .webp files are accepted for images.'
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

async function fileToDataUri(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return `data:${file.type};base64,${buffer.toString('base64')}`;
}

export async function summarizeReport(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const rawData = {
        reportText: formData.get('reportText'),
        reportFile: formData.get('reportFile'),
        photo: formData.get('photo'),
    }

    const validatedFields = schema.safeParse({
      reportText: rawData.reportText,
      reportFile: rawData.reportFile instanceof File && rawData.reportFile.size > 0 ? rawData.reportFile : undefined,
      photo: rawData.photo instanceof File && rawData.photo.size > 0 ? rawData.photo : undefined,
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

    if (!textToSummarize || textToSummarize.trim().length < 10) {
      if (!validatedFields.data.photo) {
        return {
          summary: '',
          abnormalValues: '',
          dietPlan: '',
          error: 'The report content must be at least 10 characters long, or an image must be provided.',
        };
      }
    }

    const { photo, ...rest } = validatedFields.data;
    const photoDataUri = photo ? await fileToDataUri(photo) : undefined;

    const result = await summarizeMedicalReport({reportText: textToSummarize, photo: photoDataUri});

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
