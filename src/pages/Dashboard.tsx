
import { useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Check, Instagram, MessageCircle, Phone } from "lucide-react";
import Layout from "@/components/Layout";

export default function Dashboard() {
  const { userData } = useUserContext();
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [integrations, setIntegrations] = useState<Record<string, boolean>>({
    whatsapp: false,
    instagram: false,
    facebook: false,
  });

  if (!userData) {
    return (
      <Layout>
        <div className="p-8 flex justify-center items-center h-full">
          <p>Loading user data...</p>
        </div>
      </Layout>
    );
  }

  const handleIntegration = (type: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIntegrations((prev) => ({ ...prev, [type]: true }));
      setIsLoading(false);
      setOpenDialog(null);
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} integration successful!`);
    }, 2000);
  };

  return (
    <Layout>
      <div className="p-6 md:p-8 space-y-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {userData.name}!</h1>
            <p className="text-muted-foreground">Here's an overview of your account</p>
          </div>
          <Button variant="outline">View Tutorials</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Company</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{userData.company}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Industry</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{userData.industry}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm truncate">{userData.email}</p>
              <p className="text-sm truncate">{userData.phone}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Website</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm truncate">{userData.website || "Not provided"}</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mt-8">Integrations</h2>
        <p className="text-muted-foreground">Connect your messaging channels</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* WhatsApp Integration Card */}
          <Card className={`hover-scale card-shine ${integrations.whatsapp ? 'border-green-500' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="rounded-full bg-green-500/20 p-3">
                  <Phone className="h-6 w-6 text-green-500" />
                </div>
                {integrations.whatsapp && (
                  <div className="bg-green-500/20 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                )}
              </div>
              <CardTitle className="text-xl mt-4">WhatsApp Business</CardTitle>
              <CardDescription>
                Connect your WhatsApp Business account to send automated messages
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Dialog open={openDialog === 'whatsapp'} onOpenChange={() => setOpenDialog(openDialog === 'whatsapp' ? null : 'whatsapp')}>
                <DialogTrigger asChild>
                  <Button variant={integrations.whatsapp ? "outline" : "default"} className="w-full">
                    {integrations.whatsapp ? "Manage Connection" : "Connect"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Connect WhatsApp Business API</DialogTitle>
                    <DialogDescription>
                      Enter your WhatsApp Business API credentials to connect your account.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone_number">WhatsApp Business Phone Number</Label>
                      <Input id="phone_number" placeholder="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="api_key">API Key</Label>
                      <Input id="api_key" type="password" placeholder="Enter your API key" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setOpenDialog(null)}>
                      Cancel
                    </Button>
                    <Button 
                      type="button" 
                      onClick={() => handleIntegration('whatsapp')}
                      disabled={isLoading}
                    >
                      {isLoading ? "Connecting..." : "Connect Account"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          {/* Instagram Integration Card */}
          <Card className={`hover-scale card-shine ${integrations.instagram ? 'border-purple-500' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="rounded-full bg-purple-500/20 p-3">
                  <Instagram className="h-6 w-6 text-purple-500" />
                </div>
                {integrations.instagram && (
                  <div className="bg-green-500/20 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                )}
              </div>
              <CardTitle className="text-xl mt-4">Instagram Messenger</CardTitle>
              <CardDescription>
                Connect your Instagram account to manage direct messages
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Dialog open={openDialog === 'instagram'} onOpenChange={() => setOpenDialog(openDialog === 'instagram' ? null : 'instagram')}>
                <DialogTrigger asChild>
                  <Button variant={integrations.instagram ? "outline" : "default"} className="w-full">
                    {integrations.instagram ? "Manage Connection" : "Connect"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Connect Instagram Messenger</DialogTitle>
                    <DialogDescription>
                      Link your Instagram business account to manage messages.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="instagram_username">Instagram Username</Label>
                      <Input id="instagram_username" placeholder="@yourbusiness" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instagram_password">Password</Label>
                      <Input id="instagram_password" type="password" placeholder="Enter your password" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setOpenDialog(null)}>
                      Cancel
                    </Button>
                    <Button 
                      type="button" 
                      onClick={() => handleIntegration('instagram')}
                      disabled={isLoading}
                    >
                      {isLoading ? "Connecting..." : "Connect Account"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          {/* Facebook Integration Card */}
          <Card className={`hover-scale card-shine ${integrations.facebook ? 'border-blue-500' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="rounded-full bg-blue-500/20 p-3">
                  <MessageCircle className="h-6 w-6 text-blue-500" />
                </div>
                {integrations.facebook && (
                  <div className="bg-green-500/20 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                )}
              </div>
              <CardTitle className="text-xl mt-4">Facebook Messenger</CardTitle>
              <CardDescription>
                Connect your Facebook page to manage customer messages
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Dialog open={openDialog === 'facebook'} onOpenChange={() => setOpenDialog(openDialog === 'facebook' ? null : 'facebook')}>
                <DialogTrigger asChild>
                  <Button variant={integrations.facebook ? "outline" : "default"} className="w-full">
                    {integrations.facebook ? "Manage Connection" : "Connect"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Connect Facebook Messenger</DialogTitle>
                    <DialogDescription>
                      Link your Facebook page to manage customer interactions.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="page_name">Facebook Page Name</Label>
                      <Input id="page_name" placeholder="Your Business Page" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="page_id">Page ID</Label>
                      <Input id="page_id" placeholder="Enter your page ID" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="access_token">Access Token</Label>
                      <Input id="access_token" type="password" placeholder="Enter access token" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setOpenDialog(null)}>
                      Cancel
                    </Button>
                    <Button 
                      type="button" 
                      onClick={() => handleIntegration('facebook')}
                      disabled={isLoading}
                    >
                      {isLoading ? "Connecting..." : "Connect Account"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
