"use client"

import { motion } from "framer-motion"
import { Instagram, Send } from "lucide-react"

export function InstagramFeed() {
    return (
        <div className="bg-neutral-900 border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center">
            <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-full flex items-center justify-center p-1">
                    <div className="bg-neutral-900 w-full h-full rounded-full flex items-center justify-center">
                        <Instagram className="w-10 h-10 text-white" />
                    </div>
                </div>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                    LIVE
                </span>
            </div>

            <h3 className="text-2xl font-serif font-bold text-white mb-3">Join the Journey</h3>
            <p className="text-gray-400 mb-8 max-w-xs px-4">
                Behind-the-scenes techniques, weekly menu drops, and the evolution of a culinary mind.
            </p>

            <a
                href="https://instagram.com/chefruthe4th"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-accent hover:text-white transition-all transform hover:scale-105"
            >
                Follow @chefruthe4th
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* <div className="mt-8 flex gap-2">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="w-12 h-12 bg-white/5 rounded-lg border border-white/5 overflow-hidden animate-pulse" />
                ))}
            </div> */}
        </div>
    )
}
