import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { MenuGallery } from "@/components/menu-gallery"
import { PhilosophySection } from "@/components/philosophy-section"
import { BookingForm } from "@/components/booking-form"
import { InstagramSection } from "@/components/instagram-section"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <MenuGallery />
      <PhilosophySection />
      <Testimonials />
      <BookingForm />
      <InstagramSection />
      <Footer />
    </main>
  )
}
