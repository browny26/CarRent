import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Car, Shield, Clock, Star } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] grid grid-cols-6 grid-rows-3 gap-5 p-3">
        <div className="col-span-3 row-span-2 bg-neutral-950 rounded-3xl p-10 flex flex-col items-center justify-center gap-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-grotesk">
            Experience Luxury on Every Journey
          </h1>
          <p className="text-lg text-neutral-300 mb-8">
            Discover our premium selection of vehicles for your next adventure.
            From luxury sedans to powerful SUVs, find the perfect car for any
            occasion.
          </p>
        </div>

        <div
          className="relative col-span-3 row-span-3 rounded-3xl"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* <div className="absolute inset-0 bg-black/60 rounded-3xl" /> */}
        </div>

        {/* <div className="col-span-2 row-span-1 w-full h-full bg-neutral-950 hover:bg-neutral-950/80 rounded-3xl flex items-center justify-center"> */}
        <Link
          href="/search"
          className="col-span-2 row-span-1 w-full h-full bg-lux hover:bg-neutral-950/80 text-neutral-50 rounded-3xl flex items-center justify-center"
        >
          Browse Cars <ArrowRight className="ml-2" />
        </Link>
        {/* </div> */}

        <Link
          href="/register"
          className="col-span-1 row-span-1 w-full h-full bg-neutral-950/20 hover:bg-neutral-950/30 border-white text-neutral-950 font-semibold rounded-3xl flex items-center justify-center"
        >
          Sign Up
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto h-[80vh] flex flex-col justify-center gap-20 px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Car,
                title: "Premium Vehicles",
                description:
                  "Access to a wide range of luxury and premium vehicles",
              },
              {
                icon: Shield,
                title: "Full Insurance",
                description: "Comprehensive insurance coverage included",
              },
              {
                icon: Clock,
                title: "24/7 Support",
                description: "Round-the-clock customer support",
              },
              {
                icon: Star,
                title: "Best Rates",
                description: "Competitive pricing and loyalty rewards",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Hit the Road?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their car
            rental needs.
          </p>
          <Link href="/search">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Start Browsing
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
