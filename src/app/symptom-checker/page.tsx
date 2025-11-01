'use client';

import { useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { checkSymptoms } from './actions';
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Bot, Loader2, Stethoscope } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 animate-spin" />}
      Analyze Symptoms
    </Button>
  );
}

export default function SymptomCheckerPage() {
  const form = useForm<{ symptoms: string; medicalHistory: string; photo: FileList }>();
  const [state, formAction] = useActionState(checkSymptoms, {
    possibleConditions: '',
    recommendedSpecialties: '',
    disclaimer: '',
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
        title="AI Symptom Checker"
        description="Describe your symptoms to get AI-powered insights. This is not a substitute for professional medical advice."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <Form {...form}>
            <form action={formAction}>
              <CardHeader>
                <CardTitle>Your Symptoms</CardTitle>
                <CardDescription>
                  Provide as much detail as possible for a more accurate analysis.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="symptoms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Describe your symptoms</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          name="symptoms"
                          placeholder="e.g., I have a sharp pain in my chest, and I feel dizzy..."
                          className="min-h-[150px] resize-y"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="medicalHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medical History (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          name="medicalHistory"
                          placeholder="e.g., I have a history of high blood pressure..."
                          className="resize-y"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload a Photo (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          name="photo"
                          onChange={(e) => field.onChange(e.target.files)}
                        />
                      </FormControl>
                      <FormDescription>
                        If your symptom is visible (e.g., a rash), you can upload a photo.
                      </FormDescription>
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
            <CardTitle>AI Analysis</CardTitle>
            <CardDescription>
              Potential conditions and recommendations will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            {!(state.possibleConditions || state.error) && (
              <div className="flex h-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted bg-background p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <p className="text-muted-foreground">
                  Your analysis will appear here.
                </p>
              </div>
            )}
            {state.possibleConditions && (
              <Accordion type="multiple" defaultValue={['conditions', 'specialties', 'disclaimer']} className="w-full">
                <AccordionItem value="conditions">
                  <AccordionTrigger className="font-semibold"><AlertTriangle className="mr-2 text-destructive" /> Possible Conditions</AccordionTrigger>
                  <AccordionContent className="prose prose-sm max-w-none text-foreground/80 whitespace-pre-wrap">{state.possibleConditions}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="specialties">
                  <AccordionTrigger className="font-semibold"><Stethoscope className="mr-2 text-primary" /> Recommended Specialties</AccordionTrigger>
                  <AccordionContent className="prose prose-sm max-w-none text-foreground/80 whitespace-pre-wrap">{state.recommendedSpecialties}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="disclaimer">
                  <AccordionTrigger className="font-semibold">Disclaimer</AccordionTrigger>
                  <AccordionContent className="prose prose-sm max-w-none text-foreground/80 whitespace-pre-wrap">{state.disclaimer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
