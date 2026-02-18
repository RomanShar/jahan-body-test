'use client'

import { scienceHeadline, scienceSubheadline, scienceItems } from './constants'

export default function ScienceSection() {
    return (
        <section className="bg-brand-sage/10 py-20 px-6 border-y border-brand-border/50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl text-brand-dark mb-4">
                        {scienceHeadline}
                    </h2>
                    <p className="text-brand-muted max-w-2xl mx-auto">
                        {scienceSubheadline}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {scienceItems.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-sm shadow-sm border border-brand-border/30 hover:shadow-md transition-shadow duration-300"
                        >
                            <p className="text-brand-clay uppercase tracking-widest text-xs mb-4 pb-4 border-b border-brand-border">
                                {item.label}
                            </p>

                            <p className="text-brand-dark leading-relaxed text-[15px]">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
