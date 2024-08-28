"use client"

import PageHeader from "@/components/ui/page-header"
import Dashboard from "./(dashboard)/dashboard"

export default function Page() {
    return (
        <div>
            <PageHeader title="Hello Robert" subtitle="Following up your business." />
            <Dashboard />
        </div>
    )
}