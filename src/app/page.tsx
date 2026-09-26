import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Calculator from "@/components/Calculator";
import About from "@/components/About";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 max-w-7xl section-hover">
          <div className="w-full mx-auto mb-16 text-center">
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight mb-6 text-white">¿Cuánto pierdes al no responder a tus clientes?</h2>
            <p className="text-white font-light text-base mx-auto">
              Descubre en segundos cuánto dinero dejas sobre la mesa por no responder de inmediato. 
              Nuestra IA convierte esos chats perdidos en clientes agendados.
            </p>
          </div>
          <Calculator />
        </div>
        <About />
        <Services />
      </main>
      <Footer />
    </>
  );
}
