import React, { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { auth } from "../../../../frontend/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <Link
        to="/"
        className="inline-flex items-center text-sm text-gray-400 transition-colors hover:text-gray-200 mb-10"
      >
        <ChevronLeftIcon className="size-5" />
        Back to website
      </Link>

      <div>
        <div className="mb-8">
          <h1 className="mb-2 font-semibold text-white text-2xl sm:text-3xl">
            Sign In
          </h1>
          <p className="text-sm text-gray-400">
            Enter your email and password to sign in!
          </p>
        </div>

        <form onSubmit={handleSignIn}>
          <div className="space-y-5">
            <div>
              <Label>
                Email <span className="text-error-500">*</span>
              </Label>
              <Input
                placeholder="info@gmail.com"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label>
                Password <span className="text-error-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                >
                  {showPassword ? (
                    <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                  ) : (
                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                  )}
                </span>
              </div>
            </div>
            {error && (
              <p className="text-sm text-error-500">{error}</p>
            )}
            <div className="flex items-center gap-3">
              <Checkbox checked={isChecked} onChange={setIsChecked} />
              <span className="block font-normal text-gray-400 text-theme-sm">
                Keep me logged in
              </span>
            </div>
            <Button className="w-full" size="sm" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
