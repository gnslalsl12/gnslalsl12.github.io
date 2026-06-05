import type { ReactNode } from "react";
import Reveal from "./Reveal";
import { cn } from "../lib/cn";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
};

export default function SectionHeader({ eyebrow, title, description, align = "left" }: Props) {
  return (
    <Reveal>
      <div className={cn(align === "center" && "mx-auto max-w-2xl text-center")}>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">{title}</h2>
        {description && <p className="mt-4 text-pretty text-muted">{description}</p>}
      </div>
    </Reveal>
  );
}
