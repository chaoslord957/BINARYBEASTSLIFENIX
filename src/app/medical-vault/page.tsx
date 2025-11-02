'use client';

import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  useFirestore,
  useCollection,
  useMemoFirebase,
} from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import {
  FileText,
  Loader2,
  MoreVertical,
  Upload,
} from 'lucide-react';
import { collection, doc } from 'firebase/firestore';
import React, { useRef } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';

interface MedicalDocument {
  id: string; // Added from WithId<T>
  filename: string;
  fileType: string;
  fileSize: number;
  uploadDate: string;
  storageLocation: string;
}

export default function MedicalVaultPage() {
  const firestore = useFirestore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const medicalDocumentsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, `medicalDocuments`);
  }, [firestore]);

  const {
    data: documents,
    isLoading: isLoadingDocuments,
    error,
  } = useCollection<MedicalDocument>(medicalDocumentsQuery);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload to Firebase Storage.
      // For this demo, we create a temporary local URL to make the file viewable.
      const objectURL = URL.createObjectURL(file);

      const newDoc = {
        filename: file.name,
        fileType: file.type,
        fileSize: file.size,
        uploadDate: new Date().toISOString(),
        storageLocation: objectURL, // Store the temporary URL
      };

      if (medicalDocumentsQuery) {
        addDocumentNonBlocking(medicalDocumentsQuery, newDoc);
      }
    }
  };

  const handleDelete = (docId: string) => {
    if (!firestore) return;
    const docRef = doc(firestore, `medicalDocuments`, docId);
    deleteDocumentNonBlocking(docRef);
  };

  const handleOpen = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6">
      <PageHeader
        title="Medical Vault"
        description="Securely store and manage your medical documents."
      >
        <Button onClick={handleUploadClick}>
          <Upload className="mr-2" />
          Upload Document
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Your Documents</CardTitle>
          <CardDescription>
            All uploaded medical documents are stored here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingDocuments && (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="animate-spin text-primary" />
            </div>
          )}
          {!isLoadingDocuments && (!documents || documents.length === 0) && (
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted bg-background p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <p className="text-muted-foreground">
                Your vault is empty. Click "Upload Document" to get started.
              </p>
            </div>
          )}
          {!isLoadingDocuments && documents && documents.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Filename</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Uploaded On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.filename}</TableCell>
                    <TableCell>{doc.fileType}</TableCell>
                    <TableCell>
                      {(doc.fileSize / 1024).toFixed(2)} KB
                    </TableCell>
                    <TableCell>
                      {new Date(doc.uploadDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                           <DropdownMenuItem onSelect={() => handleOpen(doc.storageLocation)}>
                            Open
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => handleDelete(doc.id)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {error && (
             <div className="text-red-500 p-4 bg-red-100 border border-red-500 rounded-md">
                <p>An error occurred: {error.message}</p>
             </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
