import Header from "@/components/header";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Gallery from "@/components/gallery";
import About from "@/components/about";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Gallery />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
