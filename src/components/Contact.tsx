"use client";

import Button from "./common/Button";
import content from "@/content/home.json";
import { useChurchSettings } from "@/providers/church-settings-provider";

const Contact = () => {
  const { settings } = useChurchSettings();

  const address = settings.address || content.footer.address;

  const emails = settings.email ? [settings.email] : content.footer.emails;

  const phones =
    settings.phones?.length > 0 ? settings.phones : content.footer.phones;

  return (
    <section className="bg-[#f6f6f6] py-[100px] text-center">
      <div className="container">
        <h2 className="mb-6 font-cormorant text-4xl font-bold sm:text-5xl lg:text-[65px]">
          {content.contact.title}
        </h2>

        <div className="mx-auto mb-8 max-w-2xl space-y-2 text-[#444]">
          <p>{address}</p>

          {emails.map((email) => (
            <a
              key={email}
              className="block font-semibold hover:text-primary"
              href={`mailto:${email}`}
            >
              {email}
            </a>
          ))}

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            {phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                className="hover:text-primary"
              >
                {phone}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-5">
          <Button
            variant="primary"
            size="lg"
            href={content.contact.contactLink}
          >
            {content.contact.contactButton}
          </Button>

          <Button variant="primary" size="lg" href={content.contact.prayerLink}>
            {content.contact.prayerButton}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
