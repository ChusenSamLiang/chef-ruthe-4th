"use client"

import React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Users, UtensilsCrossed, Leaf, ChevronRight, ChevronLeft, Check, Loader2 } from "lucide-react"
import { toast } from "sonner"

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  date: z.string().min(1, "Please select a date"),
  guests: z.number().min(1, "Minimum 1 guest").max(500, "For groups over 500, please contact us directly"),
  serviceType: z.string().min(1, "Please select a service type"),
  dietary: z.array(z.string()).optional(),
  message: z.string().optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

const steps = [
  { id: 1, title: "Event Details", icon: Calendar },
  { id: 2, title: "Guest Count", icon: Users },
  { id: 3, title: "Service Type", icon: UtensilsCrossed },
  { id: 4, title: "Preferences", icon: Leaf },
]

const serviceTypes = [
  { id: "private-dining", label: "Private Dining", description: "Intimate multi-course experience" },
  { id: "catering", label: "Bespoke Catering", description: "Events & celebrations" },
  { id: "meal-prep", label: "Daily Meal Prep", description: "Weekly gourmet nutrition" },
]

const dietaryOptions = [
  "No Restrictions",
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
  "Kosher",
  "Halal",
  "Nut Allergies",
]

export function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      dietary: [],
      guests: 2,
    },
  })

  const formValues = watch()

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSubmitted(true)
        toast.success("Inquiry sent successfully!")
      } else {
        throw new Error("Failed to submit inquiry")
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = async () => {
    let fieldsToValidate: (keyof BookingFormData)[] = []
    if (currentStep === 1) fieldsToValidate = ["name", "email", "phone", "date"]
    if (currentStep === 2) fieldsToValidate = ["guests"]
    if (currentStep === 3) fieldsToValidate = ["serviceType"]

    const isValid = await trigger(fieldsToValidate)
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4))
    }
  }

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  const toggleDietary = (option: string) => {
    const current = formValues.dietary || []
    const updated = current.includes(option)
      ? current.filter((d) => d !== option)
      : [...current, option]
    setValue("dietary", updated)
  }

  if (isSubmitted) {
    return (
      <section id="booking" className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center bg-card rounded-2xl p-12 border border-border"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              Thank You for Your Inquiry
            </h3>
            <p className="text-muted-foreground mb-8">
              We've received your consultation request and will be in touch within 24 hours to discuss your culinary experience.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-serif"
            >
              Submit Another Request
            </Button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="booking" className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-primary font-serif text-sm tracking-[0.3em] uppercase mb-4">
            Book Now
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Begin Your Culinary Journey
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tell us about your event and we'll craft a bespoke experience tailored to your vision.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${currentStep >= step.id
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border text-muted-foreground"
                    }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 md:w-20 h-0.5 mx-2 transition-colors ${currentStep > step.id ? "bg-primary" : "bg-border"
                      }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-card rounded-2xl p-8 md:p-12 border border-border">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="font-serif text-xl font-bold mb-6">Event Details</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          {...register("name")}
                          placeholder="Your name"
                          className="bg-input border-border"
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          placeholder="you@example.com"
                          className="bg-input border-border"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          {...register("phone")}
                          placeholder="(555) 123-4567"
                          className="bg-input border-border"
                        />
                        {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date">Preferred Date</Label>
                        <Input
                          id="date"
                          type="date"
                          {...register("date")}
                          className="bg-input border-border"
                        />
                        {errors.date && <p className="text-red-500 text-xs">{errors.date.message}</p>}
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="font-serif text-xl font-bold mb-6">Guest Count</h3>
                    <div className="space-y-2">
                      <Label htmlFor="guests">Number of Guests</Label>
                      <Input
                        id="guests"
                        type="number"
                        {...register("guests", { valueAsNumber: true })}
                        placeholder="Enter number of guests"
                        className="bg-input border-border text-lg py-6"
                      />
                      {errors.guests && <p className="text-red-500 text-xs">{errors.guests.message}</p>}
                      <p className="text-muted-foreground text-sm">
                        We accommodate intimate dinners for 2 up to large events for 500+ guests.
                      </p>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="font-serif text-xl font-bold mb-6">Select Service Type</h3>
                    <div className="grid gap-4">
                      {serviceTypes.map((service) => (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => setValue("serviceType", service.id)}
                          className={`p-6 rounded-xl border-2 text-left transition-colors ${formValues.serviceType === service.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                            }`}
                        >
                          <p className="font-serif font-bold text-lg">{service.label}</p>
                          <p className="text-muted-foreground text-sm">{service.description}</p>
                        </button>
                      ))}
                      {errors.serviceType && <p className="text-red-500 text-xs">{errors.serviceType.message}</p>}
                    </div>
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="font-serif text-xl font-bold mb-6">Dietary Preferences</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {dietaryOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleDietary(option)}
                          className={`px-4 py-2 rounded-full border transition-colors ${formValues.dietary?.includes(option)
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border hover:border-primary/50"
                            }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Notes</Label>
                      <Textarea
                        id="message"
                        {...register("message")}
                        placeholder="Tell us about your vision, special requests, or any other details..."
                        className="bg-input border-border min-h-[120px]"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="border-border bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-serif"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : null}
                    Submit Request
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
