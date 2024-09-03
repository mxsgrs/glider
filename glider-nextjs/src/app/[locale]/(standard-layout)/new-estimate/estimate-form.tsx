"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { saveAs } from "file-saver";
import { pdf, PDFViewer } from "@react-pdf/renderer";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"

import { useTranslations, useLocale } from "next-intl";
import { enUS, fr } from "date-fns/locale";

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
    logo: z.string(),
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
    const locale = useLocale();
    var calendarLocale = enUS;

    switch (locale) {
        case "fr":
            calendarLocale = fr;
            break;

        case "enGB":
            calendarLocale = enUS;
            break;
    }

    // Company logo hook
    const defaultLogo = 'data:image/jpeg;base64,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';
    const [base64String, setBase64String] = useState(defaultLogo);
    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setBase64String(reader.result as string);
            setValue('logo', reader.result as string);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    // Details tab hook
    const [tab, setTab] = useState("0");
    const onTabChange = (value: string) => {
        setTab(value);
    }


    type FormValues = z.infer<typeof estimateSchema>

    // Form default values
    var form = useForm<FormValues>({
        resolver: zodResolver(estimateSchema),
        defaultValues: {
            estimateId: 1,
            estimateRef: "2394729",
            userCredentialsId: 1001,
            logo: base64String,
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
                    businessAddress: '12 Avenue de la Technologie, 75008 Paris',
                    phone: '01 23 45 67 89',
                    email: 'contact@solutionstech.fr',
                    taxNumber: '',
                    siretNumber: '',
                    sirenNumber: '',
                    creationDate: new Date('2024-01-01'),
                    updateDate: new Date('2024-01-15'),
                },
                {
                    estimateCompanyId: 2,
                    estimateId: 1,
                    estimateCompanyParty: 'Recipient',
                    businessName: 'Agence Créative SARL',
                    businessAddress: '89 Rue du Design, 33000 Bordeaux',
                    phone: '05 67 89 01 23',
                    email: 'info@agencecreative.fr',
                    taxNumber: '',
                    siretNumber: '',
                    sirenNumber: '',
                    creationDate: new Date('2024-01-01'),
                    updateDate: new Date('2024-01-15'),
                }

            ],
        },
    });

    const { control, setValue } = form;

    useEffect(() => {
        setValue('logo', base64String);
    }, [base64String, setValue]);

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
            logo: values.logo,
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
                                name="logo"
                                render={({ }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('logo')}
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="file" placeholder="Picture" onChange={handleImageUpload} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

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
                                    <DatePicker name="expiracyDate" locale={calendarLocale} control={form.control} label={t('expiracyDate')} />
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
                                                        {t('businessAddress')}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={t('businessAddress')} {...field} />
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
                                                        <Input placeholder="FR12345678901" {...field} />
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
                                                        <Input placeholder="12345678901234" {...field} />
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
                                                        <Input placeholder="123456789" {...field} />
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