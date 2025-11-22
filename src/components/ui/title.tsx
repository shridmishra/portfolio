import React from 'react';

interface Title {
    title: string,
    subtitle?: string,
}

const Title = ({ title, subtitle }: Title) => {
    return (
        <header className="text-center my-4 lg:my-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-foreground mb-3" style={{ fontFamily: 'ClashDisplay, sans-serif' }}>
                {title}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {subtitle}
            </p>
        </header>
    )
}

export default Title;