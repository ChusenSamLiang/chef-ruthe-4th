"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Utensils, PartyPopper, Calendar } from "lucide-react"

const services = [
  {
    title: "Private Dining",
    description: "Bespoke in-home dining experiences where luxury meets comfort. Chef Eric (RuThe4th) brings the 5-star restaurant experience directly to your table, documenting every sear and sauce for an unforgettable culinary journey.",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop",
    icon: Utensils,
  },
  {
    title: "Luxury Catering",
    description: "From intimate gatherings in Ozone Park to boutique events across NYC, our catering services specialize in 'Elevated Comfort.' We tailor every menu to your vision, ensuring consistency and excellence in Every. Single. Plate.",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000&auto=format&fit=crop",
    icon: PartyPopper,
  },
  {
    title: "Bespoke Meal Prep",
    description: "Personalized luxury meal prep designed for your lifestyle. High-quality, vibrant ingredients prepared with the 'Chef's Touch' to keep your palate satisfied throughout the week.",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1000&auto=format&fit=crop",
    icon: Calendar,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

export function ServicesSection() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-serif text-sm tracking-[0.3em] uppercase mb-4">
            Our Services
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Tailored Culinary Excellence
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every service is crafted with precision, passion, and an unwavering commitment to quality.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service) => (
            <motion.article
              key={service.title}
              variants={itemVariants}
              className="group relative bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-colors duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
              </div>

              <div className="p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-bold">{service.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
