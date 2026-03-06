"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// const categories = ["All", "Appetizers", "Mains", "Desserts"] as const
const categories = [] as const
type Category = typeof categories[number]

const menuItems = [
  {
    name: "Ahi Tuna Tartare",
    description: "Fresh ahi tuna, avocado mousse, sesame, wonton crisps",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c170db76?q=80&w=1000&auto=format&fit=crop",
    category: "Appetizers",
    price: "Market Price",
  },
  {
    name: "Pan-Seared Scallops",
    description: "Cauliflower purée, brown butter, capers, chive oil",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=1000&auto=format&fit=crop",
    category: "Appetizers",
    price: "Market Price",
  },
  {
    name: "A5 Wagyu Tenderloin",
    description: "Truffle mash, roasted asparagus, red wine reduction",
    image: "https://images.unsplash.com/photo-1544077960-604201fe74bc?q=80&w=1000&auto=format&fit=crop",
    category: "Mains",
    price: "Market Price",
  },
  {
    name: "Butter-Poached Lobster",
    description: "Saffron risotto, charred lemon, fresh herbs",
    image: "https://images.unsplash.com/photo-1534080564607-1981cb02796e?q=80&w=1000&auto=format&fit=crop",
    category: "Mains",
    price: "Market Price",
  },
  {
    name: "Chocolate Fondant",
    description: "Molten center, vanilla bean gelato, fresh raspberries",
    image: "https://images.unsplash.com/photo-1541944743827-e04bb645f9a3?q=80&w=1000&auto=format&fit=crop",
    category: "Desserts",
    price: "Included",
  },
  {
    name: "Deconstructed Tiramisu",
    description: "Mascarpone cream, espresso foam, cocoa, ladyfingers",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1000&auto=format&fit=crop",
    category: "Desserts",
    price: "Included",
  },
]

export function MenuGallery() {
  const [activeCategory, setActiveCategory] = useState<Category>("All")

  const filteredItems = activeCategory === "All"
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory)

  return (
    <section id="menu" className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-primary font-serif text-sm tracking-[0.3em] uppercase mb-4">
            Sample Menu
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            A Taste of Excellence
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
            Our menus are fully customizable to your preferences, dietary requirements, and seasonal availability.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={`font-serif ${activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "border-border hover:border-primary/50 text-foreground"
                  }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.article
                key={item.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-colors duration-300"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-serif text-primary">{item.price}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-lg font-bold">{item.name}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {item.description}
                  </p>
                  {/* <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-primary/30 hover:bg-primary hover:text-primary-foreground font-serif transition-colors bg-transparent"
                  >
                    Order Now
                  </Button> */}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
