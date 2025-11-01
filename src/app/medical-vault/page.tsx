import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Shield, Upload } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medical Vault | LifeNix',
};

export default function MedicalVaultPage() {
  return (
    <div className="flex flex-1 flex-col p-4 md:p-6">
      <PageHeader
        title="Medical Vault"
        description="Securely store and manage your medical documents."
      >
        <Button>
          <Upload className="mr-2" />
          Upload Document
        </Button>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted bg-background p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <p className="text-muted-foreground">
              Our secure medical vault is currently under development. Please
              check back later!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
