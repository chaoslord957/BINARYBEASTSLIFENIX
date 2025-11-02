'use server';

import { aiSymptomChecker } from '@/ai/ai-symptom-checker';
import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const schema = z.object({
  symptoms: z.string().min(10, { message: 'Please describe your symptoms in at least 10 characters.' }),
  medicalHistory: z.string().optional(),
  photo: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
});

type FormState = {
  possibleConditions: string;
  recommendedSpecialties: string;
  disclaimer: string;
  error: string;
};

async function fileToDataUri(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return `data:${file.type};base64,${buffer.toString('base64')}`;
}

export async function checkSymptoms(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const validatedFields = schema.safeParse({
      symptoms: formData.get('symptoms'),
      medicalHistory: formData.get('medicalHistory'),
      photo: formData.get('photo') instanceof File && formData.get('photo').size > 0 ? formData.get('photo') : undefined,
    });

    if (!validatedFields.success) {
      return {
        possibleConditions: '',
        recommendedSpecialties: '',
        disclaimer: '',
        error: validatedFields.error.errors.map((e) => e.message).join(', '),
      };
    }

    const { photo, ...rest } = validatedFields.data;
    const photoDataUri = photo ? await fileToDataUri(photo) : undefined;
    
    const result = await aiSymptomChecker({
      ...rest,
      photo: photoDataUri,
    });

    if (!result) {
      return {
        possibleConditions: '',
        recommendedSpecialties: '',
        disclaimer: '',
        error: 'The AI service could not provide an analysis. Please try again.',
      };
    }

    return {
      possibleConditions: result.possibleConditions,
      recommendedSpecialties: result.recommendedSpecialties,
      disclaimer: result.disclaimer,
      error: '',
    };
  } catch (error) {
    console.error(error);
    return {
      possibleConditions: '',
      recommendedSpecialties: '',
      disclaimer: '',
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}
