import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Sign In | 3NT Studio Admin"
        description="Sign in to 3NT Studio admin dashboard"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
