
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext, UserData } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({
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

  const handleIndustryChange = (value: string) => {
    setValue("industry", value, { shouldValidate: true });
  };

  return (
    <Layout requiresAuth={false}>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 animate-fade-in">
        <div className="glass-card max-w-md w-full p-8 rounded-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gradient">Welcome to Flowly</h1>
            <p className="text-muted-foreground">Let's set up your account in a few steps</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    {...register("name")}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    placeholder="john.doe@example.com"
                    {...register("email")}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    placeholder="Acme Inc."
                    {...register("company")}
                    className={errors.company ? "border-destructive" : ""}
                  />
                  {errors.company && (
                    <p className="text-sm text-destructive">{errors.company.message}</p>
                  )}
                </div>

                <Button 
                  type="button" 
                  className="w-full"
                  onClick={() => setStep(2)}
                  disabled={
                    !watch("name") || 
                    !watch("email") || 
                    !watch("company") ||
                    !!errors.name ||
                    !!errors.email ||
                    !!errors.company
                  }
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    {...register("phone")}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input
                    id="website"
                    placeholder="https://example.com"
                    {...register("website")}
                    className={errors.website ? "border-destructive" : ""}
                  />
                  {errors.website && (
                    <p className="text-sm text-destructive">{errors.website.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select onValueChange={handleIndustryChange}>
                    <SelectTrigger
                      id="industry"
                      className={errors.industry ? "border-destructive" : ""}
                    >
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.industry && (
                    <p className="text-sm text-destructive">{errors.industry.message}</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1"
                    disabled={!isValid || isLoading}
                  >
                    {isLoading ? "Processing..." : "Complete Setup"}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>

        <p className="mt-4 text-muted-foreground text-sm">
          &copy; 2025 Flowly. All rights reserved.
        </p>
      </div>
    </Layout>
  );
}
