import { redirect } from "next/navigation";
import { auth } from "@/auth";
import CheckoutPage from "@/components/checkout/checkout-page";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/checkout");
  }

  return (
    <CheckoutPage
      initialUser={{
        name: session.user.name,
        email: session.user.email,
      }}
    />
  );
}
