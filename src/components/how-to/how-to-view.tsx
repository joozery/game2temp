import { FaqCard } from "./faq-card";
import { HelpCard } from "./help-card";
import { SafetyBanner } from "./safety-banner";
import { StepCards } from "./step-cards";
import { SupportedGamesCard } from "./supported-games-card";

export function HowToView() {
  return (
    <>
      <StepCards />
      <SafetyBanner />
      <div className="grid items-start gap-5 lg:grid-cols-2 xl:grid-cols-[1.1fr_1.2fr_1fr]">
        <FaqCard />
        <SupportedGamesCard />
        <HelpCard />
      </div>
    </>
  );
}
