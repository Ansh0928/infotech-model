
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Integrations() {
  return (
    <Layout>
      <div className="p-6 md:p-8 space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold">Integrations</h1>
        <p className="text-muted-foreground">Manage all your messaging integrations in one place</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <Card className="hover:shadow-md transition-all duration-200">
            <CardHeader>
              <div className="w-12 h-12 mb-2 flex items-center justify-center rounded-full bg-green-100">
                <img src="/lovable-uploads/bf6cd761-09dd-4747-b4c3-030f01ebdda1.png" alt="WhatsApp Widget" className="w-7 h-7" />
              </div>
              <CardTitle className="flex items-center gap-2">
                WhatsApp Website Widget
              </CardTitle>
              <CardDescription>Drive WhatsApp sales with personalized CTAs</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Add a customizable WhatsApp chat widget to your website to convert visitors into 
                leads and customers through personalized interactions.
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all duration-200">
            <CardHeader>
              <div className="w-12 h-12 mb-2 flex items-center justify-center rounded-full bg-blue-100">
                <img src="/lovable-uploads/bf6cd761-09dd-4747-b4c3-030f01ebdda1.png" alt="WhatsApp Link" className="w-7 h-7" />
              </div>
              <CardTitle>WhatsApp Link Generator</CardTitle>
              <CardDescription>Create shareable links & QR for your WA business number</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Generate custom WhatsApp links and QR codes that can be used across your marketing 
                materials to simplify customer engagement.
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all duration-200">
            <CardHeader>
              <div className="w-12 h-12 mb-2 flex items-center justify-center rounded-full bg-orange-100">
                <img src="/lovable-uploads/824a9904-a695-4d3c-85bc-c4417a0e7418.png" alt="Razorpay" className="w-7 h-7" />
              </div>
              <CardTitle className="flex items-center gap-2">
                Razorpay
                <Badge variant="outline" className="bg-amber-100 text-amber-800 text-xs font-medium">New</Badge>
              </CardTitle>
              <CardDescription>Send payment links & subscription updates to drive quick payments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Streamline your payment processes by sending Razorpay payment links via WhatsApp
                for faster transactions and improved cash flow.
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all duration-200">
            <CardHeader>
              <div className="w-12 h-12 mb-2 flex items-center justify-center rounded-full bg-purple-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-7 h-7 text-purple-600">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <CardTitle className="flex items-center gap-2">
                EasyInsights
                <Badge variant="outline" className="bg-amber-100 text-amber-800 text-xs font-medium">New</Badge>
              </CardTitle>
              <CardDescription>Full-funnel visibility with a single source of truth</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Combine all your Marketing and CRM data for full-funnel visibility with the 
                Marketing data intelligence tool by EasyInsights.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
