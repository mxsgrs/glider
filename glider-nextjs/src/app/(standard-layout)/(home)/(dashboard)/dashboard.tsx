"use client"

import { BrowserPieChart } from "./pie-chart"
import PlatformBarChart from "./platform-bar-chart"
import Kpis from "./kpis"
import InvoiceTable from "./invoice-table"

export default function Dashboard() {
    return (
        <div className="md:grid grid-cols-12 gap-8 gap-y-12 px-4 mt-6">
            <div className="col-start-1 col-end-9 row-start-1 row-end-2">
                <Kpis />
            </div>
            <div className="col-start-1 col-end-6 row-start-2 row-end-3 mt-10 md:mt-0">
                <PlatformBarChart />
            </div>
            <div className="col-start-6 col-end-9 row-start-2 row-end-3 mt-10 md:mt-0">
                <BrowserPieChart />
            </div>
            <div className="col-start-9 col-end-13 row-start-1 row-end-3 mt-3 md:mt-0">
                <InvoiceTable />
            </div>
        </div>
    )
}