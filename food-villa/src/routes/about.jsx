import Accordion from "../components/Accordion";

function About() {
  return (
    <main className="container mx-auto max-w-[1280px] px-5">
      <h1 className="mb-3 text-6xl font-bold">About us</h1>
      <p className="mb-7">
        Food villa is a web page created using react. The purpose of this
        website is to learn how react works.
      </p>
      <Accordion />
    </main>
  );
}

export default About;
