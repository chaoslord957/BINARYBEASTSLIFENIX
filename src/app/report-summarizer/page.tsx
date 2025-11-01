'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { summarizeReport } from './actions';
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
import { AlertTriangle, Bot, FileText, Loader2, Salad } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 animate-spin" />}
      Summarize Report
    </Button>
  );
}

export default function ReportSummarizerPage() {
  const form = useForm<{ reportText: string, reportFile: FileList }>();
  const [state, formAction] = useFormState(summarizeReport, {
    summary: '',
    abnormalValues: '',
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
        title="Medical Report Summarizer"
        description="Paste your medical report text or upload a file to get a summary and insights."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <Form {...form}>
            <form action={formAction}>
              <CardHeader>
                <CardTitle>Your Medical Report</CardTitle>
                <CardDescription>
                  Paste the text from your medical report or upload a document.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="reportText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Paste Report Text</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          name="reportText"
                          placeholder="Start pasting your report text here..."
                          className="min-h-[200px] resize-y"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-center">
                  <div className="flex-1 border-t border-muted"></div>
                  <span className="mx-4 text-xs uppercase text-muted-foreground">Or</span>
                  <div className="flex-1 border-t border-muted"></div>
                </div>
                <FormField
                  control={form.control}
                  name="reportFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Report File</FormLabel>
                      <FormControl>
                        <Input 
                          type="file" 
                          accept=".txt" 
                          name="reportFile"
                          onChange={(e) => field.onChange(e.target.files)}
                        />
                      </FormControl>
                      <FormDescription>
                        Accepted formats: .txt. Max size: 5MB.
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
            <CardTitle>AI Generated Insights</CardTitle>
            <CardDescription>
              Our AI will provide a summary, highlight abnormal values, and
              suggest a diet plan.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            {!(state.summary || state.error) && (
              <div className="flex h-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted bg-background p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <p className="text-muted-foreground">
                  Your report summary will appear here.
                </p>
              </div>
            )}
            {state.summary && (
              <Accordion type="multiple" defaultValue={['summary', 'abnormal', 'diet']} className="w-full">
                <AccordionItem value="summary">
                  <AccordionTrigger className="font-semibold"><FileText className="mr-2 text-primary" /> Report Summary</AccordionTrigger>
                  <AccordionContent className="prose prose-sm max-w-none text-foreground/80 whitespace-pre-wrap">{state.summary}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="abnormal">
                  <AccordionTrigger className="font-semibold"><AlertTriangle className="mr-2 text-destructive" /> Abnormal Values</AccordionTrigger>
                  <AccordionContent className="prose prose-sm max-w-none text-foreground/80 whitespace-pre-wrap">{state.abnormalValues}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="diet">
                  <AccordionTrigger className="font-semibold"><Salad className="mr-2 text-green-600" /> Suggested Diet</AccordionTrigger>
                  <AccordionContent className="prose prose-sm max-w-none text-foreground/80 whitespace-pre-wrap">{state.dietPlan}</AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
