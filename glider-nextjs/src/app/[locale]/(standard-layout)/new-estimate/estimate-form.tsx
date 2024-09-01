"use client"

import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { Estimate } from '@/types/estimate';
import { EstimatePdf } from './estimate-pdf';

// Schema
const estimateDetailSchema = z.object({
    estimateDetailId: z.number(),
    estimateId: z.number(),
    rawDescription: z.string(),
    quantity: z.number(),
    unitPrice: z.number(),
    creationDate: z.date().optional(),
    updateDate: z.date().optional(),
});

const estimateCompanySchema = z.object({
    estimateCompanyId: z.number(),
    estimateId: z.number(),
    estimateCompanyParty: z.enum(['Issuer', 'Recipient']),
    businessName: z.string(),
    businessAddress: z.string(),
    phone: z.string(),
    email: z.string(),
    taxNumber: z.string(),
    siretNumber: z.string(),
    sirenNumber: z.string(),
    creationDate: z.date().optional(),
    updateDate: z.date().optional(),
});

const estimateSchema = z.object({
    estimateId: z.number(),
    userCredentialsId: z.number(),
    subjectMatter: z.string(),
    creationDate: z.date().optional(),
    updateDate: z.date().optional(),
    estimateDetail: z.array(estimateDetailSchema),
    estimateCompany: z.array(estimateCompanySchema),
});

export default function EstimateForm() {
    type FormValues = z.infer<typeof estimateSchema>

    // Default values
    const form = useForm<FormValues>({
        resolver: zodResolver(estimateSchema),
        defaultValues: {
            estimateId: 1,
            userCredentialsId: 1001,
            subjectMatter: 'Web Development Project',
            creationDate: new Date(),
            updateDate: new Date(),
            estimateDetail: [
                {
                    estimateDetailId: 1,
                    estimateId: 1,
                    rawDescription: 'Frontend Development',
                    quantity: 50,
                    unitPrice: 100,
                    creationDate: new Date('2024-01-01'),
                    updateDate: new Date('2024-01-15'),
                },
                {
                    estimateDetailId: 2,
                    estimateId: 1,
                    rawDescription: 'Backend Development',
                    quantity: 60,
                    unitPrice: 120,
                    creationDate: new Date('2024-01-01'),
                    updateDate: new Date('2024-01-15'),
                }
            ],
            estimateCompany: [
                {
                    estimateCompanyId: 1,
                    estimateId: 1,
                    estimateCompanyParty: 'Issuer',
                    businessName: 'Tech Solutions Inc.',
                    businessAddress: '123 Tech Avenue, Silicon Valley, CA',
                    phone: '555-1234',
                    email: 'contact@techsolutions.com',
                    taxNumber: 'TAX123456',
                    siretNumber: '12345678901234',
                    sirenNumber: '987654321',
                    creationDate: new Date('2024-01-01'),
                    updateDate: new Date('2024-01-15'),
                },
                {
                    estimateCompanyId: 2,
                    estimateId: 1,
                    estimateCompanyParty: 'Recipient',
                    businessName: 'Creative Agency LLC',
                    businessAddress: '456 Design Street, New York, NY',
                    phone: '555-5678',
                    email: 'info@creativeagency.com',
                    taxNumber: 'TAX987654',
                    siretNumber: '23456789012345',
                    sirenNumber: '123456789',
                    creationDate: new Date('2024-01-01'),
                    updateDate: new Date('2024-01-15'),
                }
            ],
        },
    });

    async function onSubmit(values: FormValues) {
        const estimate: Estimate = {
            estimateId: values.estimateId,
            userCredentialsId: values.userCredentialsId,
            subjectMatter: values.subjectMatter,
            creationDate: values.creationDate,
            updateDate: values.updateDate,
            estimateCompany: values.estimateCompany.map((company, index) => ({
                estimateCompanyId: company.estimateCompanyId,
                estimateId: values.estimateId,
                estimateCompanyParty: company.estimateCompanyParty,
                businessName: company.businessName,
                businessAddress: company.businessAddress,
                phone: company.phone,
                email: company.email,
                taxNumber: company.taxNumber,
                siretNumber: company.siretNumber,
                sirenNumber: company.sirenNumber,
            })),
            estimateDetail: values.estimateDetail.map((detail, index) => ({
                estimateDetailId: detail.estimateDetailId,
                estimateId: values.estimateId,
                rawDescription: detail.rawDescription,
                quantity: detail.quantity,
                unitPrice: detail.unitPrice,
                creationDate: detail.creationDate,
                updateDate: detail.updateDate,
            })),
        };

        try {
            // Generate PDF and save it into a file
            const doc = <EstimatePdf estimate={estimate} />;
            const asPdf = pdf(doc);

            const pdfBlob = await asPdf.toBlob();
            saveAs(pdfBlob, 'document.pdf');
        } catch (error) {
            console.error('Error converting document to PDF blob:', error);
            alert('Error generating PDF');
        }
    }

    return (
        <div className="px-4 mt-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Estimate metadata */}
                    <FormField
                        control={form.control}
                        name="subjectMatter"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subject Matter</FormLabel>
                                <FormControl>
                                    <Input placeholder="Subject matter" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Issuer and recipient */}
                    <Tabs defaultValue="Issuer" className="">
                        <TabsList>
                            <TabsTrigger value="Issuer">Issuer</TabsTrigger>
                            <TabsTrigger value="Recipient">Recipient</TabsTrigger>
                        </TabsList>
                        {form.watch('estimateCompany').map((company, index) => (
                            <TabsContent value={company.estimateCompanyParty} key={company.estimateCompanyId} className="max-w-md space-y-4 p-1">
                                <h2 className="text-2xl font-semibold">
                                    {company.estimateCompanyParty}
                                </h2>

                                <FormField
                                    control={form.control}
                                    name={`estimateCompany.${index}.businessName`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Business Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Business Name" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`estimateCompany.${index}.businessAddress`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Business Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Business Address" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`estimateCompany.${index}.phone`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Phone" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`estimateCompany.${index}.email`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Email" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`estimateCompany.${index}.taxNumber`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tax Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Tax Number" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`estimateCompany.${index}.siretNumber`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>SIRET Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="SIRET Number" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`estimateCompany.${index}.sirenNumber`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>SIREN Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="SIREN Number" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </TabsContent>
                        ))}
                    </Tabs>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}