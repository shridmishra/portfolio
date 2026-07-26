import React from 'react';

interface Title {
    title: string,
    subtitle?: string,
}

const Title = ({ title, subtitle }: Title) => {
    return (
        <header className="text-center py-1 md:py-2 my-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-foreground">
                {title}
            </h2>
            {subtitle && (
                <p className="mt-2 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    {subtitle}
                </p>
            )}
        </header>
    )
}

export default Title;