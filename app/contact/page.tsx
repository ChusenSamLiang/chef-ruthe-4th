import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BookingForm } from "@/components/booking-form";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#1a1a1a] text-white">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
                        Connect with the <span className="text-accent italic">Chef</span>
                    </h1>
                    <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
                        Ready to elevate your next event or start your luxury meal prep journey? Let's discuss your vision.
                    </p>
                </div>
            </section>

            {/* Contact Info & Form */}
            <section className="pb-24">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto items-start">

                        {/* Info Cards */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-neutral-900/50 p-8 rounded-2xl border border-white/10 hover:border-accent transition-colors">
                                <MapPin className="w-8 h-8 text-accent mb-4" />
                                <h3 className="text-xl font-serif mb-2">Location</h3>
                                <p className="text-gray-400">Ozone Park, Queens, NY</p>
                                <p className="text-gray-400 text-sm">Serving NYC Metro Area</p>
                            </div>

                            <div className="bg-neutral-900/50 p-8 rounded-2xl border border-white/10 hover:border-accent transition-colors">
                                <Mail className="w-8 h-8 text-accent mb-4" />
                                <h3 className="text-xl font-serif mb-2">Email</h3>
                                <p className="text-gray-400">chef@chefruthe4th.com</p>
                            </div>

                            <div className="bg-neutral-900/50 p-8 rounded-2xl border border-white/10 hover:border-accent transition-colors">
                                <Instagram className="w-8 h-8 text-accent mb-4" />
                                <h3 className="text-xl font-serif mb-2">Follow the Journey</h3>
                                <a
                                    href="https://instagram.com/chefruthe4th"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-accent transition-colors"
                                >
                                    @chefruthe4th
                                </a>
                            </div>
                        </div>

                        {/* Booking Form Integration */}
                        <div className="lg:col-span-2">
                            <div className="bg-neutral-900/30 rounded-3xl p-4 border border-white/5">
                                <BookingForm />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
