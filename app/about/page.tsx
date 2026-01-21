import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#1a1a1a] text-white">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 border-b border-white/10">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
                            Documenting a <span className="text-accent italic">Culinary Mind</span>
                        </h1>
                        <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
                            Chef Eric (RuThe4th) isn't just preparing plates; he's crafting elevated comfort and documenting the evolution of modern flavor.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10">
                            <Image
                                src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=1000&auto=format&fit=crop"
                                alt="Chef Eric RuThe4th at work"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        <div className="space-y-8">
                            <span className="text-accent uppercase tracking-[0.3em] text-sm font-semibold">The Journey</span>
                            <h2 className="text-4xl font-serif leading-tight">From Ozone Park to Luxury In-Home Dining</h2>
                            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                                <p>
                                    Based in Ozone Park, Queens, Chef Eric—widely known as **RuThe4th**—has built a reputation for "Elevated Comfort." His culinary journey is rooted in the vibrant energy of NYC, where he transforms familiar dishes into 5-star bespoke experiences.
                                </p>
                                <p>
                                    Whether it's a perfectly seared salmon dish or a meticulously planned private event, Eric's approach is defined by consistency and a "Run, Don't Walk" commitment to quality. He believes that luxury dining shouldn't be confined to a restaurant; it should be an intimate, personal experience shared in the comfort of your own home.
                                </p>
                                <p>
                                    Through **@chefruthe4th**, Eric documents his process, bringing his followers behind the scenes of every sear, every sauce, and every finished plate. It's more than a service—it's a movement toward culinary excellence in Every. Single. Plate.
                                </p>
                            </div>

                            <div className="pt-8 grid grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-white font-bold mb-1">Service Area</h4>
                                    <p className="text-gray-400">NYC Metro (Queens, Brooklyn, Manhattan)</p>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">Specialty</h4>
                                    <p className="text-gray-400">Elevated Comfort & Bespoke Catering</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 bg-neutral-900/50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-serif mb-8">Ready for an Unforgettable Night?</h2>
                    <Link
                        href="/#booking"
                        className="inline-block bg-accent text-white px-10 py-5 uppercase tracking-widest text-sm font-bold hover:bg-accent/80 transition-all transform hover:scale-105"
                    >
                        Book Chef Ruthe 4th
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
