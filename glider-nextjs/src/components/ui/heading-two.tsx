interface HeadingTwoProps {
    title: string,
    padding?: number,
}

export default function HeadingTwo({ title, padding = 3 }: HeadingTwoProps) {
    return (
        <h2 className={`px-${padding} md:px-${padding + 1} text-lg text-muted-foreground font-semibold leading-none tracking-tight`}>{title}</h2>
    )
}