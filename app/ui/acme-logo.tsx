import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";

export default function AcmeLogo({ black }: { black?: boolean }) {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none ${black ? "text-black" : "text-white"}`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">Acme</p>
    </div>
  );
}
