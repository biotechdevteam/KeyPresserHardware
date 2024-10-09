import { useTranslations } from "next-intl";
import LandingTemp from "../landing-temp";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <div>
      <h1 className="text-center text-4xl mt-4">{t("title")}</h1>
      <LandingTemp/>
    </div>
  );
}
