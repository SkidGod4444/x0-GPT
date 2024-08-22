import { cn } from "@/lib/utils";
import {
  IconNetwork,
  IconFileTypePdf,
  IconCurrencyDollar,
  IconEaseInOut,
  IconSpy,
  IconBrandGithubCopilot,
  IconMessage,
  IconCloud,
} from "@tabler/icons-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Free for Everyone",
      description:
        "No barriers, no fees. x0-GPT is a free tool accessible to anyone, anywhere.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Ease of use",
      description: "It's as easy as pressing some keys & buttons.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Universal Web Chat",
      description:
        "Easily chat with any website on the internet. Get answers, insights, and information directly from the source.",
      icon: <IconMessage />,
    },
    {
      title: "PDF Conversation",
      description:
        "Interact with PDF documents like never before. Ask questions, extract details, and navigate complex documents effortlessly.",
      icon: <IconFileTypePdf />,
    },
    {
      title: "Instant Information",
      description:
        "Get real-time responses from websites and documents, saving time and enhancing productivity.",
      icon: <IconCloud />,
    },
    {
      title: "AI-Powered by Vercel",
      description:
        "Leverage advanced AI to understand and respond to your queries, making interactions smarter and more accurate.",
      icon: <IconBrandGithubCopilot />,
    },
    {
      title: "Versatile Connectivity",
      description:
        "Connect with a wide range of online sources, from news sites to academic journals, all within a single platform.",
      icon: <IconNetwork />,
    },
    {
      title: "Privacy First",
      description:
        "Your data is yours. x0-GPT ensures secure interactions, keeping your information safe and encrypted.",
      icon: <IconSpy />,
    },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800",
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 dark:group-hover/feature:bg-white transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
