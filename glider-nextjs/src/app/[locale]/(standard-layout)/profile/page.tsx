"use client"

import PageHeader from "@/components/ui/page-header"

export default function Page() {
  const fetchData = async () => {
    const res = await fetch('/api/estimate');
    if (res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'estimate.pdf'; // The name of the downloaded file
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
      <PageHeader title="Profile information" subtitle="Your personal information on this app." />
    </div>
  )
}