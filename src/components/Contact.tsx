"use client";

import Button from "./common/Button";
import { useChurchSettings } from "@/providers/church-settings-provider";

const Contact = () => {
  const { settings } = useChurchSettings();

  return (
    <section className="py-[100px] bg-[#f6f6f6] text-center">
      <div className="container">
        <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-[65px] font-bold mb-6">We&apos;d love to hear from you</h2>
        <div className="mx-auto mb-8 max-w-2xl space-y-2 text-[#444]">
          <p>{settings.address}</p>
          <a className="block font-semibold hover:text-primary" href={`mailto:${settings.email}`}>{settings.email}</a>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            {settings.phones.map((phone) => <a key={phone} href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="hover:text-primary">{phone}</a>)}
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-5">
          <Button variant="primary" size="lg" onClick={() => { window.location.href = "/contact"; }}>Contact Us</Button>
          <Button variant="primary" size="lg" onClick={() => { window.location.href = "/contact"; }}>Prayer Request</Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
