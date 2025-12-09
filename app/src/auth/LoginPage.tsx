import { LoginForm, signup, useAuth } from "wasp/client/auth";
import { Link as WaspRouterLink, routes } from "wasp/client/router";
import { AuthPageLayout } from "./AuthPageLayout";
import { useState } from "react";

export default function Login() {
  const { isLoading } = useAuth();
  const [guestLoading, setGuestLoading] = useState(false);

  const handleGuestLogin = async () => {
    setGuestLoading(true);
    try {
      const randomId = crypto.randomUUID();
      const guestEmail = `guest-${randomId}@guest.example.com`;
      const guestPassword = crypto.randomUUID();
      await signup({
        email: guestEmail,
        password: guestPassword,
        username: guestEmail,
        isAdmin: false,
        isGuest: true,
      });
      // signup will automatically log in and redirect per onAuthSucceededRedirectTo
    } catch (error) {
      console.error("Guest signup failed:", error);
      // Optionally show error to user
    } finally {
      setGuestLoading(false);
    }
  };

  return (
    <AuthPageLayout>
      <LoginForm />
      <br />
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={handleGuestLogin}
          disabled={guestLoading || isLoading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
        >
          {guestLoading ? "Creating guest account..." : "Continue as Guest"}
        </button>
        <p className="text-xs text-gray-500">
          Guest accounts are temporary and may be deleted later.
        </p>
      </div>
      <br />
      <span className="text-sm font-medium text-gray-900 dark:text-gray-900">
        Don't have an account yet?{" "}
        <WaspRouterLink to={routes.SignupRoute.to} className="underline">
          go to signup
        </WaspRouterLink>
        .
      </span>
      <br />
      <span className="text-sm font-medium text-gray-900">
        Forgot your password?{" "}
        <WaspRouterLink
          to={routes.RequestPasswordResetRoute.to}
          className="underline"
        >
          reset it
        </WaspRouterLink>
        .
      </span>
    </AuthPageLayout>
  );
}
