"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/api/api";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const credentials = { email, password };
      console.log("Attempting login with:", email);
      const response = await login(credentials);
      console.log("Login successful:", response);

      if (response && response.access_token) {
        localStorage.setItem("access_token", response.access_token);

        if (response.refresh_token) {
          localStorage.setItem("refresh_token", response.refresh_token);
        }

        if (response.user) {
          localStorage.setItem("user", JSON.stringify(response.user));
        }

        router.push("/dashboard");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof Error) {
        setError(
          error.message || "Invalid email or password. Please try again."
        );
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn("flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat", className)}
      style={{ backgroundImage: "url('/artist-management-bg.jpg')" }}
      {...props}
    >
      <div className="flex w-full max-w-7xl items-center justify-center p-4 md:p-12">
        {/* Login Card */}
        <Card className="w-full max-w-md rounded-2xl shadow-xl overflow-hidden bg-white p-10 border border-gray-200">
          <CardContent className="grid gap-6">
            <form method="POST" onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
              <div className="flex flex-col items-center text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">Artist Management Login</h1>
                <p className="text-gray-500 text-lg">Sign in to manage artists & music</p>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-3 rounded-lg shadow-md">
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-4">
                <Label htmlFor="email" className="text-lg text-gray-800">Email / Phone No</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter Email / Phone No"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all bg-gray-100 border border-gray-300"
                />
              </div>

              <div className="flex flex-col gap-4">
                <Label htmlFor="password" className="text-lg text-gray-800">Passcode</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all pr-12 bg-gray-100 border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold p-4 rounded-lg shadow-md transition-all text-lg"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Right-side Image */}
        <div className="hidden md:block md:w-1/2 p-4">
          <img
            src="/coverpage.png"
            alt="Artist Management System"
            className="w-full h-full object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}