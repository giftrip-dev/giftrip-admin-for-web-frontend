import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";

export type DepthMenu = {
  label: string;
  icon: string;
  path: {
    label: string;
    path: string;
  }[];
};

interface MenuAccordionProps {
  currentPath: string; // 현재 경로
  menu: DepthMenu; // 메뉴 탭
}

const MenuAccordion = ({ menu, currentPath }: MenuAccordionProps) => {
  return (
    <Accordion key={menu.label} type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="px-4 py-6 text-title-2">
          <Image
            className="-mt-px"
            src={`/svg/gnb/${menu.icon}.svg`}
            alt={menu.label}
            width={24}
            height={24}
            sizes="size-6"
          />
          {menu.label}
        </AccordionTrigger>
        <AccordionContent className="bg-line">
          {menu.path.map((tab) => (
            <Link
              prefetch={false}
              href={tab.path}
              key={tab.label}
              className={`block rounded-md py-4 pl-8 text-subtitle-2 hover:underline ${currentPath === tab.path ? "bg-[#353434]" : ""}`}
            >
              {tab.label}
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default MenuAccordion;
