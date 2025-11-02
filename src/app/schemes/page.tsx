import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Government Health Schemes | LifeNix',
};

const governmentSchemes = [
  {
    id: 'scheme-1',
    title: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)',
    description: 'A flagship scheme providing health coverage to over 10 crore poor and vulnerable families.',
  },
  {
    id: 'scheme-2',
    title: 'Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)',
    description: 'Aims to provide comprehensive and quality antenatal care, free of cost, to all pregnant women on the 9th of every month.',
  },
  {
    id: 'scheme-3',
    title: 'National Health Mission (NHM)',
    description: 'Envisages achievement of universal access to equitable, affordable & quality health care services.',
  }
]

export default function GovernmentSchemesPage() {
  return (
    <div className="flex flex-1 flex-col p-4 md:p-6">
      <PageHeader
        title="Government Health Schemes"
        description="Explore and apply for central government health schemes."
      />
      <section>
        <h2 className="mb-4 font-headline text-2xl font-bold">
          Central Government Schemes
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {governmentSchemes.map((scheme) => (
            <Card key={scheme.id}>
              <CardHeader>
                <CardTitle className="font-headline text-xl tracking-normal">{scheme.title}</CardTitle>
                <CardDescription>{scheme.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor={`file-upload-${scheme.id}`}>Upload Documents</Label>
                  <div className="flex gap-2">
                    <Input id={`file-upload-${scheme.id}`} type="file" />
                    <Button variant="outline" size="icon">
                      <Upload />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
