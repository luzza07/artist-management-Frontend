"use client";
import { useState } from "react";
import { login } from "@/api/api";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { cn } from "@/lib/utils"; // Adjust the import path as necessary

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
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

      // Debug: Log the entire response
      console.log("API Response:", response);

      if (response && response.access_token) {
        localStorage.setItem("access_token", response.access_token);

        if (response.refresh_token) {
          localStorage.setItem("refresh_token", response.refresh_token);
        }

        if (response.user) {
          localStorage.setItem("user", JSON.stringify(response.user));
        }

        // Debug: Log the user's role
        console.log("User role:", response.user.role_type);

        
        if (response.user.role_type === "super_admin") {
          router.push("/super_admin_dashboard");
        } else if (response.user.role_type === "artist_manager") {
          router.push("/artist_manager_dashboard");
        } else if (response.user.role_type === "artist") {
          router.push("/artist_dashboard");
        } else {
          router.push("/dashboard"); // Fallback
        }
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      const err = error as any;
      if (err.response) {
        console.error("Server response:", err.response.data);
        console.error("Status code:", err.response.status);
      }
      setError(
        error instanceof Error
          ? error.message
          : "Invalid email or password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat overflow-x-hidden",
        className
      )}
      style={{
        backgroundImage: "url('/bgimg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        width: "100%",
      }}
      {...props}
    >
      <div className="flex flex-col md:flex-row w-full max-w-6xl items-center justify-center gap-10 p-6">
        {/* Left-side Login Card */}
        <Card className="w-full md:w-1/2 rounded-2xl shadow-xl overflow-hidden bg-white/30 backdrop-blur-md p-10 border border-white/20">
          <CardContent className="grid gap-6">
            <form
              method="POST"
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
              noValidate
            >
              <div className="flex flex-col items-center text-center">
                <h1 className="text-4xl font-bold text-white mb-3">
                  Artist Management Login
                </h1>
                <p className="text-white/80 text-lg">
                  Sign in to manage artists & music
                </p>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-3 rounded-lg shadow-md">
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-4">
                <Label htmlFor="email" className="text-lg text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter Email "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all bg-white/20 border border-white/30 text-white placeholder-white/50"
                />
              </div>

              <div className="flex flex-col gap-4">
                <Label htmlFor="password" className="text-lg text-white">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all pr-12 bg-white/20 border border-white/30 text-white placeholder-white/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-white/50 hover:text-white/70"
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
                {isLoading ? "Logging In..." : "Login"}
              </Button>

              <Button
                type="button"
                onClick={() => router.push("/signup")}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold p-4 rounded-lg shadow-md transition-all text-lg"
              >
                Create Account
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Right-side Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <Image
            src="/coverpage.png"
            alt="Artist Management System"
            width={500}
            height={500}
            className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}