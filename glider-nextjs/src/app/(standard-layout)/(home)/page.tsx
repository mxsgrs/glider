import PageHeader from "@/components/ui/page-header"
import Dashboard from "./(dashboard)/dashboard"
import type { Metadata } from "next"
 
export const metadata: Metadata = {
  title: "Home | Glider: Global logistics",
  description: "Following up your business.",
}

export default function Page() {
    return (
        <div>
            <PageHeader title="Hello Robert" subtitle="Following up your business." />
            <Dashboard />
        </div>
    )
}