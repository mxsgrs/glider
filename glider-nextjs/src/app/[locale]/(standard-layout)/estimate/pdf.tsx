"use client"

import { useTranslations } from "next-intl"

export default function Pdf() {
    const t = useTranslations('estimate');
  
    const fetchData = async () => {
      const res = await fetch('/api/estimate');
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'estimate.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Failed to fetch PDF');
      }
    };
  
    return (
      <div>
        <button onClick={fetchData}>Fetch Data</button>
      </div>
    )
  }