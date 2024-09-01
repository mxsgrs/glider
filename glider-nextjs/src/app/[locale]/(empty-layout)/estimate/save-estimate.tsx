"use client";

import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import { Estimate } from '@/types/estimate';
import { EstimatePdf } from './estimate-pdf';
import { Button } from "@/components/ui/button";

interface SaveEstimateProps {
    estimate: Estimate;
}

export default function SaveEstimate({ estimate }: SaveEstimateProps) {

    const handleSaveEstimate = async () => {
        try {
            const doc = <EstimatePdf estimate={estimate} />;
            const asPdf = pdf(doc);

            const pdfBlob = await asPdf.toBlob();
            saveAs(pdfBlob, 'document.pdf');
        } catch (error) {
            console.error('Error converting document to PDF blob:', error);
            alert('Error generating PDF');
        }
    };

    return (
        <div className="m-4">
            <Button onClick={handleSaveEstimate}>Download</Button>
        </div>
    );
}