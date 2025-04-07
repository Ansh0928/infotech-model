
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Integrations() {
  return (
    <Layout>
      <div className="p-6 md:p-8 space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold">Integrations</h1>
        <p className="text-muted-foreground">Manage all your messaging integrations in one place</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="hover-scale">
            <CardHeader>
              <CardTitle>WhatsApp Business API</CardTitle>
              <CardDescription>Send automated messages and chat with customers on WhatsApp</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Connect your WhatsApp Business API to send automated messages, broadcast announcements,
                and engage with your customers directly through WhatsApp.
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardHeader>
              <CardTitle>Instagram Messenger</CardTitle>
              <CardDescription>Manage Instagram direct messages from your dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Connect your Instagram business account to respond to direct messages,
                set up automated replies, and track engagement all from one place.
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardHeader>
              <CardTitle>Facebook Messenger</CardTitle>
              <CardDescription>Handle customer service through Facebook Messenger</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Link your Facebook pages to automate customer service, create chatbots,
                and manage all your Facebook customer interactions efficiently.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
