"use client"

import React from "react";

interface PageHeaderProps {
    title: string;
    subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <div className="px-7 md:px-8 mt-10">
            <h1 className="text-2xl font-semibold leading-none tracking-tight">{title}</h1>
            <p className="text-muted-foreground">{subtitle}</p>
        </div>
    )
}