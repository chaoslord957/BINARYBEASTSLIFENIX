'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { generatePlan } from './actions';
import { PageHeader } from '@/components/PageHeader';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Bot, Loader2, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 animate-spin" />}
      Generate Diet Plan
    </Button>
  );
}

export default function DietPlanPage() {
  const form = useForm<{ needs: string }>();
  const [state, formAction] = useFormState(generatePlan, {
    dietPlan: '',
    error: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: state.error,
      });
    }
  }, [state.error, toast]);

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6">
      <PageHeader
        title="Personalized Diet Plan"
        description="Let our AI nutritionist create a diet plan tailored for you."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <Form {...form}>
            <form action={formAction}>
              <CardHeader>
                <CardTitle>Your Dietary Needs</CardTitle>
                <CardDescription>
                  Describe your goals, preferences, and any allergies. For
                  example: "I want to gain muscle, I'm vegetarian, and I am
                  allergic to nuts."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="needs"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          name="needs"
                          placeholder="e.g., Weight loss, muscle gain, vegetarian, allergies..."
                          className="min-h-[200px] resize-y"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <SubmitButton />
              </CardFooter>
            </form>
          </Form>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>AI Generated Diet Plan</CardTitle>
            <CardDescription>
              A personalized plan will appear here. Please consult a real
              nutritionist before making any major changes.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            {!(state.dietPlan || state.error) && (
              <div className="flex h-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted bg-background p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <p className="text-muted-foreground">
                  Your plan will appear here.
                </p>
              </div>
            )}
            {state.dietPlan && (
              <div className="prose prose-sm max-w-none rounded-lg border bg-secondary/30 p-4 text-foreground/80 whitespace-pre-wrap">
                {state.dietPlan}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
