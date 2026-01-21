"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function PhilosophySection() {
  return (
    <section id="philosophy" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] relative rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=1000&auto=format&fit=crop"
                alt="Chef Ruthe 4th"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-primary/30 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-2xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-primary font-serif text-sm tracking-[0.3em] uppercase mb-4">
              {"The Chef's Table"}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-balance">
              Culinary Philosophy
            </h2>

            <article className="prose prose-invert max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Chef Eric (RuThe4th) isn't just preparing plates; he's documenting the evolution of a culinary mind. Based in Ozone Park, Queens, his philosophy centers on "Elevated Comfort"—turning familiar flavors into luxury experiences.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                Every dish documented on his feed starts with a commitment to consistency and vibrancy. Eric believes that luxury dining should be intimate and personal, bridging the gap between high-end restaurant technique and the comfort of a residential kitchen.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                Known for his modern minimalist plating and high-heat technique, Chef Eric's journey is one of continuous elevation. Whether it's a signature seared salmon or a weekly menu drop, his mission is to provide 5-star quality in Every. Single. Plate.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Documenting the sizzle, the sauce, and the soul of modern cooking, Chef Eric invites you to bring the luxury home. Run, Don't Walk to a culinary experience designed specifically for your palate.
              </p>
            </article>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-border">
              <div>
                <p className="font-serif text-3xl lg:text-4xl font-bold text-primary">15+</p>
                <p className="text-muted-foreground text-sm mt-1">Years Experience</p>
              </div>
              <div>
                <p className="font-serif text-3xl lg:text-4xl font-bold text-primary">500+</p>
                <p className="text-muted-foreground text-sm mt-1">Events Catered</p>
              </div>
              <div>
                <p className="font-serif text-3xl lg:text-4xl font-bold text-primary">100%</p>
                <p className="text-muted-foreground text-sm mt-1">Satisfaction</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
