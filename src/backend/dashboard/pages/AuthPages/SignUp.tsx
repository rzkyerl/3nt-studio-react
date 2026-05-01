import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Sign Up | 3NT Studio Admin"
        description="Create an account for 3NT Studio admin dashboard"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
