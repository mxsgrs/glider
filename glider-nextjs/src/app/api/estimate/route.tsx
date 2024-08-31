import { NextResponse } from "next/server"
import { renderToStream } from '@react-pdf/renderer';
import { Estimate } from "./estimate";

export async function GET() {
    const estimate = await renderToStream(<Estimate />)

    return new NextResponse(estimate as unknown as ReadableStream, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=estimate.pdf',
      },
    });
}