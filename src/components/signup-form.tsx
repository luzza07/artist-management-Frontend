"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { signUp } from "@/api/api";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    email: "",
    password: "",
    rePassword: "",
    role: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.rePassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await signUp(formData);
      console.log("Success:", response);
      setError(null);
    } catch (error) {
      setError("Account already exists. Please use a different email.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 max-w-3xl mx-auto p-6", className)} {...props}>
      {error && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="shadow-md p-6">
        <CardContent>
          <h1 className="text-2xl font-bold text-center mb-4">Create an Account</h1>

          <form onSubmit={handleSubmit} className="grid gap-4">
            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="first_name">First Name</Label>
                <Input id="first_name" type="text" required value={formData.first_name} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="last_name">Last Name</Label>
                <Input id="last_name" type="text" required value={formData.last_name} onChange={handleChange} />
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="text" required value={formData.phone} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required value={formData.email} onChange={handleChange} />
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" required value={formData.dob} onChange={handleChange} />
            </div>

            {/* Gender & Role */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={(value) => handleSelectChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m">Male</SelectItem>
                    <SelectItem value="f">Female</SelectItem>
                    <SelectItem value="o">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="role">Role</Label>
                <Select onValueChange={(value) => handleSelectChange("role", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                    <SelectItem value="artist_manager">Artist Manager</SelectItem>
                    <SelectItem value="artist">Artist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" type="text" required value={formData.address} onChange={handleChange} />
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required value={formData.password} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="rePassword">Confirm Password</Label>
                <Input id="rePassword" type="password" required value={formData.rePassword} onChange={handleChange} />
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">Sign Up</Button>
          </form>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <div className="text-muted-foreground text-center text-sm">
        By signing up, you agree to our <a href="/tos" className="underline">Terms of Service</a> and <a href="/policy" className="underline">Privacy Policy</a>.
      </div>
    </div>
  );
}
