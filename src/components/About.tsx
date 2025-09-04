import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Shield, Users, MapPin, Phone, Mail } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-right mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-primary">For the Island,</span> By the Island
          </h2>
          <p className="text-xl text-muted-foreground text-right">
            Built to support local drivers, empower island businesses, and
            enhance the Caribbean experience for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Community First</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We partner with local taxi drivers and independent cart
                  owners, creating economic opportunities while preserving the
                  authentic San Pedro experience.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Safety & Trust</h3>
                <p className="text-muted-foreground leading-relaxed">
                  All our drivers are verified locals with extensive island
                  knowledge. Every trip includes real-time tracking and 24/7
                  support.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Island Expertise</h3>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  Our drivers aren't just transportation – they're your
                  connection to authentic Belize. Ask about the best fishing
                  spots, hidden beaches, or local favorites.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-lg">Service Area</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              All of San Pedro, Ambergris Caye
              <br />
              From the airport to Secret Beach
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-lg">24/7 Support</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              WhatsApp: +501-XXX-XXXX
              <br />
              Always here to help
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-lg">Get Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              hello@cayecruiser.com
              <br />
              Join our launch newsletter
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default About;
