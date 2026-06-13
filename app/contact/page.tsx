import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import SectionWrapper from "@/components/shared/SectionWrapper";
import ContactForm from "@/components/contact/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { createPageMetadata } from "@/lib/metadata";
import { Clock, Mail, MapPin, Phone, Globe } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us",
  description:
    "Contact Army Public School (APS) Girls & Boys DHA for admissions, inquiries, or to schedule a campus visit in Lahore.",
  path: "/contact",
});

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "F9RP+93V, Faisal Ghuman Rd, Askari 8 (Army Housing Scheme Defence), Lahore, Pakistan",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+92 42 37164886",
  },
  {
    icon: Globe,
    label: "Website",
    value: "lges.edu.pk",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon – Fri: 7:30 AM – 2:00 PM",
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
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.207585368038!2d74.38323044213033!3d31.4909774830117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391905e889d37e7d%3A0xf28b836e13310c3f!2sArmy%20Public%20School%20(Boys%20%26%20Girls)%2C%20DHA%2C%20Nishat%20Colony!5e0!3m2!1sen!2s!4v1781373116253!5m2!1sen!2s"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                />
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
