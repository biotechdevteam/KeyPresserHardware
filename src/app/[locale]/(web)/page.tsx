import { useTranslations } from "next-intl";
import ComingSoon from "../coming-soon";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <div>
      <h1 className="text-center text-4xl mt-4">{t("title")}</h1>
      <ComingSoon />
    </div>
  );
}
