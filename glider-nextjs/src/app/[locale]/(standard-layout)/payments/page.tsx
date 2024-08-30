import PageHeader from "@/components/ui/page-header"
import { DataTable } from "./data-table"

export default function Page() {
    return (
        <div>
            <PageHeader title="Payment status" subtitle="Check user payments in real time." />
            <DataTable />
        </div>
    )
}