"use client"

import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"

const testimonials = [
    {
        name: "C. Jones",
        handle: "@cj_energy",
        text: "My boy @chefruthe4th took me behind the scenes of his latest private event... Run Don't Walk! Everything is consistent and the vibe is unmatched.",
        stars: 5,
    },
    {
        name: "Sarah L.",
        handle: "@sl_queens",
        text: "The salmon is perfectly seared every single time. Honestly the best plates in Queens if you're looking for luxury dining at home.",
        stars: 5,
    },
    {
        name: "Marcus T.",
        handle: "@themarcust",
        text: "He brings the luxury of a 5-star restaurant right to your dining table. Unforgettable night for our anniversary. Pure elevation.",
        stars: 5,
    },
]

export function Testimonials() {
    return (
        <section className="py-24 bg-[#1a1a1a]">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    {/* <span className="inline-block text-accent font-serif text-sm uppercase tracking-[0.3em] mb-4">Social Proof</span> */}
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Guest Experiences</h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-neutral-900 border border-white/5 p-8 rounded-2xl relative group hover:border-accent/30 transition-all"
                        >
                            <Quote className="absolute top-6 right-8 w-8 h-8 text-white/5 group-hover:text-accent/10 transition-colors" />
                            <div className="flex gap-1 mb-4">
                                {[...Array(t.stars)].map((_, j) => (
                                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                                ))}
                            </div>
                            <p className="text-gray-300 mb-6 italic italic leading-relaxed">"{t.text}"</p>
                            <div className="border-t border-white/5 pt-6">
                                <h4 className="text-white font-serif font-bold">{t.name}</h4>
                                <p className="text-accent text-sm">{t.handle}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
