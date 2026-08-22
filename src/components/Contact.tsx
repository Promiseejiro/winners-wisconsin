import Button from "./common/Button";

const Contact = () => {
  return (
    <section className="py-[100px] bg-[#f6f6f6] text-center">
      <div className="container">
        <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-[65px] font-bold mb-6">
          We'd love to hear from you
        </h2>
        <div className="flex flex-wrap justify-center gap-5">
          <Button variant="primary" size="lg">
            Contact Us
          </Button>
          <Button variant="primary" size="lg">
            Prayer Request
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
