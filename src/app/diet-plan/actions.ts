'use server';

import { generateDietPlan } from '@/ai/flows/generate-diet-plan';
import { z } from 'zod';

const schema = z.object({
  needs: z
    .string()
    .min(10, { message: 'Please describe your needs in more detail (at least 10 characters).' }),
});

type FormState = {
  dietPlan: string;
  error: string;
};

export async function generatePlan(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const validatedFields = schema.safeParse({
      needs: formData.get('needs'),
    });

    if (!validatedFields.success) {
      return {
        dietPlan: '',
        error: validatedFields.error.errors.map((e) => e.message).join(', '),
      };
    }

    const result = await generateDietPlan(validatedFields.data);

    if (!result || !result.dietPlan) {
      return {
        dietPlan: '',
        error: 'The AI service could not generate a plan. Please try again.',
      };
    }

    return {
      dietPlan: result.dietPlan,
      error: '',
    };
  } catch (error) {
    console.error(error);
    return {
      dietPlan: '',
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}
