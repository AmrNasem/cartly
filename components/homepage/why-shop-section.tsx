import {
  HeadphonesIcon,
  Package,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";

const features = [
  {
    icon: Package,
    title: "Fast Delivery",
    description: "Free shipping on orders over $50 with express delivery options.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "Your transactions are protected with industry-standard encryption.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "Hassle-free 30-day returns on all eligible items, no questions asked.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Customer Support",
    description: "Our dedicated team is always here to help you with any questions.",
  },
];

function WhyShopSection() {
  return (
    <section className="mycontainer my-12 md:my-16">
      <div className="text-center mb-8">
        <h2 className="text-foreground text-2xl md:text-3xl font-semibold mb-2">
          Why Shop With Us
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
          We&apos;re committed to delivering an exceptional shopping experience
          from browse to delivery.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="border-black/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 duration-200"
          >
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-muted">
                <feature.icon className="size-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default WhyShopSection;
