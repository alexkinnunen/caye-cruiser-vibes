import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, DollarSign, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Partners = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="pt-20 pb-16 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Partner with <span className="text-primary">Caye Cruiser</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join our network of local drivers and businesses to earn more and
              help us provide the best transportation service on the island.
            </p>
            <Button size="lg" variant="hero">
              <a
                href="https://wa.me/5016252086?text=I'm%20interested%20in%20partnering%20with%20Caye%20Cruiser"
                target="_blank"
                rel="noopener noreferrer"
              >
                Become a Partner Today
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <DollarSign className="w-8 h-8 text-primary" />
                <CardTitle>Earn More</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Earn a competitive commission on every ride and get access to
                  our growing customer base.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Zap className="w-8 h-8 text-primary" />
                <CardTitle>Flexible Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Drive when you want, where you want. You're in control of your
                  own schedule.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CheckCircle className="w-8 h-8 text-primary" />
                <CardTitle>Easy to Use</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our WhatsApp-based system is simple and easy to use. No
                  complicated apps to download.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partners;
