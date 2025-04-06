
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext, UserData } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  website: z.string().url("Please enter a valid URL").or(z.string().length(0)),
  industry: z.string().min(1, "Please select an industry"),
});

type FormValues = z.infer<typeof formSchema>;

const industries = [
  "Technology",
  "E-commerce",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Real Estate",
  "Entertainment",
  "Marketing",
  "Other",
];

export default function Onboarding() {
  const { saveUserData } = useUserContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      website: "",
      industry: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      saveUserData(data as UserData);
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <Layout requiresAuth={false}>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 animate-fade-in bg-background">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/89406594-7b8d-48fa-aae3-1f25b3209b52.png" 
            alt="InfoTech Brains Logo" 
            className="h-12 mx-auto mb-6" 
          />
        </div>
        
        <div className="glass-card max-w-md w-full p-8 rounded-xl shadow-lg dark:shadow-indigo-500/10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gradient">Welcome to InfoTech Brains</h1>
            <p className="text-muted-foreground">Let's set up your account in a few steps</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Anshumaan Saraf" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="anshumaansaraf24@gmail.com" 
                            type="email" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your Company" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="button" 
                    className="w-full mt-6 transition-all duration-300 hover:shadow-md"
                    onClick={() => setStep(2)}
                    disabled={
                      !form.getValues("name") || 
                      !form.getValues("email") || 
                      !form.getValues("company") ||
                      !!form.formState.errors.name ||
                      !!form.formState.errors.email ||
                      !!form.formState.errors.company
                    }
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="+1 (555) 123-4567" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://example.com" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your industry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {industries.map((industry) => (
                              <SelectItem key={industry} value={industry}>
                                {industry}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3 mt-6">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="flex-1 transition-all duration-300"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1 transition-all duration-300 hover:shadow-md"
                      disabled={!form.formState.isValid || isLoading}
                    >
                      {isLoading ? "Processing..." : "Complete Setup"}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </div>

        <p className="mt-4 text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} InfoTech Brains. All rights reserved.
        </p>
      </div>
    </Layout>
  );
}
