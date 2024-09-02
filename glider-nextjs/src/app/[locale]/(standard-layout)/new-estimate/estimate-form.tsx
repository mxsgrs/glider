"use client";

import { useState } from "react";
import { saveAs } from "file-saver";
import { pdf, PDFViewer } from "@react-pdf/renderer";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { useTranslations } from "next-intl";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

import { Estimate } from "@/types/estimate";
import { EstimatePdf } from "./estimate-pdf";

import DatePicker from "./custom-date-picker";

// Schema
const estimateDetailSchema = z.object({
    estimateDetailId: z.number(),
    estimateId: z.number(),
    rawDescription: z.string(),
    quantity: z.coerce.number(),
    unitPrice: z.coerce.number(),
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
    estimateRef: z.string(),
    userCredentialsId: z.number(),
    subjectMatter: z.string(),
    creationDate: z.date().optional(),
    updateDate: z.date().optional(),
    expiracyDate: z.date().optional(),
    currency: z.string(),
    taxRate: z.number(),
    conditions: z.string(),
    estimateDetail: z.array(estimateDetailSchema),
    estimateCompany: z.array(estimateCompanySchema),
});

export default function EstimateForm() {
    const t = useTranslations('newEstimate');

    // Details tabs
    const [tab, setTab] = useState("0");
    const onTabChange = (value: string) => {
        setTab(value);
    }

    type FormValues = z.infer<typeof estimateSchema>

    // Default values
    var form = useForm<FormValues>({
        resolver: zodResolver(estimateSchema),
        defaultValues: {
            estimateId: 1,
            estimateRef: "2394729",
            userCredentialsId: 1001,
            subjectMatter: 'Mise en réseau',
            creationDate: new Date(),
            updateDate: new Date(),
            expiracyDate: new Date(),
            currency: "EUR",
            taxRate: 20,
            conditions: "Ce devis est valable pour une durée de trois mois. Concernant le réglement, un tiers à la commande et le solde à la livraison.",
            estimateDetail: [
                {
                    estimateDetailId: 1,
                    estimateId: 1,
                    rawDescription: 'Pose de cables',
                    quantity: 50,
                    unitPrice: 100,
                    creationDate: new Date('2024-01-01'),
                    updateDate: new Date('2024-01-15'),
                },
                {
                    estimateDetailId: 2,
                    estimateId: 1,
                    rawDescription: 'Raccordements électriques',
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
                    businessName: 'Solutions Tech SAS',
                    businessAddress: '12 Avenue de la Technologie, 75008 Paris, France',
                    phone: '01 23 45 67 89',
                    email: 'contact@solutionstech.fr',
                    taxNumber: 'FR12345678901',
                    siretNumber: '12345678901234',
                    sirenNumber: '123456789',
                    creationDate: new Date('2024-01-01'),
                    updateDate: new Date('2024-01-15'),
                },
                {
                    estimateCompanyId: 2,
                    estimateId: 1,
                    estimateCompanyParty: 'Recipient',
                    businessName: 'Agence Créative SARL',
                    businessAddress: '89 Rue du Design, 33000 Bordeaux, France',
                    phone: '05 67 89 01 23',
                    email: 'info@agencecreative.fr',
                    taxNumber: 'FR98765432109',
                    siretNumber: '23456789012345',
                    sirenNumber: '987654321',
                    creationDate: new Date('2024-01-01'),
                    updateDate: new Date('2024-01-15'),
                }

            ],
        },
    });

    const { control } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "estimateDetail"
    });

    function addDetail() {
        const detailLength = form.watch('estimateDetail').length;

        if (detailLength < 8) {
            append({
                estimateDetailId: 0,
                estimateId: 1,
                rawDescription: '',
                quantity: 0,
                unitPrice: 0,
                creationDate: new Date(),
                updateDate: new Date(),
            });

            setTab(detailLength.toString());
        }
    };

    function removeDetail() {
        const index = parseInt(tab, 10);

        if (!isNaN(index) && index >= 0 && index < fields.length) {
            remove(index);
            setTab(Math.max(index - 1, 0).toString());
        }
    }

    async function onSubmit(values: FormValues) {
        const estimate: Estimate = {
            estimateId: values.estimateId,
            estimateRef: values.estimateRef,
            userCredentialsId: values.userCredentialsId,
            subjectMatter: values.subjectMatter,
            creationDate: values.creationDate,
            updateDate: values.updateDate,
            expiracyDate: values.expiracyDate,
            currency: values.currency,
            taxRate: values.taxRate,
            conditions: values.conditions,
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
            const doc = <EstimatePdf estimate={estimate} translations={t} />;
            const asPdf = pdf(doc);

            const pdfBlob = await asPdf.toBlob();
            saveAs(pdfBlob, 'document.pdf');
        } catch (error) {
            console.error('Error converting document to PDF blob:', error);
            alert('Error generating PDF');
        }
    }

    return (
        <div className="md:flex md:flex-row my-6">
            <Form {...form}>
                <div className="px-4 lg:min-w-[390px]">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* Estimate metadata */}
                        <div className="max-w-md space-y-4 p-1">
                            <FormField
                                control={form.control}
                                name="estimateRef"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('estimateReference')}
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder={t('estimateReference')} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="subjectMatter"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('subjectMatter')}
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder={t('subjectMatter')} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="expiracyDate"
                                render={({ }) => (
                                    <DatePicker name="expiracyDate" control={form.control} label={t('expiracyDate')} />
                                )}
                            />
                        </div>

                        {/* Issuer and recipient */}
                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold px-4">
                                {t('companies')}
                            </h2>
                            <Tabs defaultValue="issuer">
                                <TabsList className="m-1 mx-2">
                                    <TabsTrigger value="issuer">{t('issuer')}</TabsTrigger>
                                    <TabsTrigger value="recipient">{t('recipient')}</TabsTrigger>
                                </TabsList>

                                {form.watch('estimateCompany').map((company, index) => (
                                    <TabsContent className="max-w-md space-y-4 p-1"
                                        value={company.estimateCompanyParty.toLowerCase()}
                                        key={company.estimateCompanyId}>

                                        <FormField
                                            control={form.control}
                                            name={`estimateCompany.${index}.businessName`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        {t('businessName')}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={t('businessName')} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`estimateCompany.${index}.businessAddress`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        {t('businessName')}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={t('businessName')} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`estimateCompany.${index}.phone`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        {t('phone')}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={t('phone')} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`estimateCompany.${index}.email`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        {t('email')}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={t('email')} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`estimateCompany.${index}.taxNumber`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        {t('taxNumber')}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={t('taxNumber')} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`estimateCompany.${index}.siretNumber`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        {t('siretNumber')}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={t('siretNumber')} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`estimateCompany.${index}.sirenNumber`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        {t('sirenNumber')}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={t('sirenNumber')} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    </TabsContent>
                                ))}

                            </Tabs>
                        </div>

                        {/* Details */}
                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold px-4">
                                {t('details')}
                            </h2>
                            <Tabs value={tab} onValueChange={onTabChange}>
                                <TabsList className="m-1 mx-2">
                                    {form.watch('estimateDetail').map((detail, index) => (
                                        <TabsTrigger value={index.toString()} key={index}>{index}</TabsTrigger>
                                    ))}
                                    <Button className="p-2 px-4 ml-2" type="button" onClick={addDetail}>+</Button>
                                </TabsList>

                                {form.watch('estimateDetail').map((detail, index) => (
                                    <TabsContent className="max-w-md space-y-4 p-1"
                                        value={index.toString()}
                                        key={index}>

                                        <FormField
                                            control={form.control}
                                            name={`estimateDetail.${index}.rawDescription`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        {t('description')}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={t('description')} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`estimateDetail.${index}.quantity`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        {t('quantity')}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input type="number" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`estimateDetail.${index}.unitPrice`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        {t('unitPrice')}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input type="number" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    </TabsContent>
                                ))}
                            </Tabs>
                            <div className="p-1">
                                <Button type="button" onClick={removeDetail}>{t('remove')}</Button>
                            </div>
                        </div>

                        {/* Totals */}
                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold px-4">
                                {t('payment')}
                            </h2>
                            <div className="max-w-md space-y-4 p-1">
                                <FormField
                                    control={form.control}
                                    name="taxRate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {t('taxes')}
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="conditions"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {t('conditions')}
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="p-1">
                            <Button className="w-full" type="submit">{t('download')}</Button>
                        </div>
                    </form>
                </div>
            </Form>
            <div className="hidden lg:block">
                <PDFViewer width={799} height={1190}>
                    <EstimatePdf estimate={form.getValues()} translations={t} />
                </PDFViewer>
            </div>
        </div>
    )
}