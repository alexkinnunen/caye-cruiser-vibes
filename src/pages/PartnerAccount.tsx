import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PartnerAccount = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-24">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user?.user_metadata.avatar_url} />
                <AvatarFallback>
                  {user?.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">
                  Partner/Driver Account
                </CardTitle>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>
              Welcome to your Caye Cruiser partner dashboard. Here you can
              manage your availability, view ride requests, and track your
              earnings.
            </p>
            {/* Future content will go here */}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default PartnerAccount;
