import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import SectionWrapper from "@/components/shared/SectionWrapper";
import ContactForm from "@/components/contact/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { createPageMetadata } from "@/lib/metadata";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us",
  description:
    "Contact Army Public School (APS) Girls & Boys DHA for admissions, inquiries, or to schedule a campus visit in Karachi.",
  path: "/contact",
});

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "DHA Phase, Karachi, Pakistan",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+92 (021) 000-0000",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@apsdhagb.edu.pk",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon – Fri: 8:00 AM – 2:00 PM",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out for admissions, general inquiries, or to schedule a campus visit."
      />

      <SectionWrapper className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-gold">
                Reach Us
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Get in Touch
              </h2>
              <p className="mt-3 text-sm text-white/60 sm:text-base">
                Our team is available during school hours to assist with
                admissions, academic queries, and general information.
              </p>

              <div className="mt-8 space-y-4">
                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 rounded-xl border border-white/10 bg-charcoal-light/60 p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-army/50">
                      <item.icon className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-gold">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm text-white/80">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 overflow-hidden rounded-xl border border-white/10">
                <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-army/30 via-charcoal-light to-charcoal sm:h-56">
                  <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(212,175,55,0.1) 20px, rgba(212,175,55,0.1) 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(212,175,55,0.1) 20px, rgba(212,175,55,0.1) 21px)",
                  }} />
                  <div className="relative text-center">
                    <MapPin className="mx-auto h-8 w-8 text-gold" />
                    <p className="mt-2 text-sm font-medium text-white">
                      DHA Phase, Karachi
                    </p>
                    <p className="text-xs text-white/50">Map placeholder</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="border-white/10">
              <CardContent className="p-6 sm:p-8">
                <p className="text-sm font-medium uppercase tracking-widest text-gold">
                  Message Us
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  Send a Message
                </h3>
                <p className="mt-2 text-sm text-white/60">
                  Fill out the form below and we will respond as soon as
                  possible.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
