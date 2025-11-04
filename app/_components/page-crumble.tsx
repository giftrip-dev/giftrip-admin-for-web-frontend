import { ChevronRight } from "lucide-react";
import Image from "next/image";

interface PageCrumbleProps {
  props:
    | {
        type: "original"; // 기본 페이지 크럼블
        color?: "black" | "white"; // 기본값은 black
        icon: string;
        path: string;
        detailPath?: string;
      }
    | {
        type: "second"; // 상세 페이지의 뒤로 가기
        color?: "black" | "white"; // 기본값은 black
        path: string | string[];
      };
}

const PageCrumble = ({ props }: PageCrumbleProps) => {
  // 기본 페이지 크럼블인 경우
  if (props.type === "original") {
    // 아이콘 경로
    const iconPath =
      props.color === "white" ? `${props.icon}.svg` : `${props.icon}-black.svg`;

    return (
      <div className="flex items-center gap-3">
        <Image
          src={`/svg/gnb/${iconPath}`}
          alt={props.path}
          width={32}
          height={32}
          className="size-8"
        />
        <div
          className={`flex items-center gap-1 text-h1-M ${
            props.color === "white" ? "text-white" : "text-black"
          }`}
        >
          <p>{props.path}</p>
          {props.detailPath && (
            <>
              <ChevronRight />
              <p>{props.detailPath}</p>
            </>
          )}
        </div>
      </div>
    );
  }

  // 'second' 타입: path가 string | string[]
  if (props.type === "second") {
    const paths = Array.isArray(props.path) ? props.path : [props.path];
    return (
      <div
        className={`flex items-center gap-1 ${
          props.color === "white"
            ? "text-label-alternative"
            : "text-label-natural"
        }`}
      >
        {paths.map((p, idx) => (
          <span key={idx} className="flex items-center gap-2 text-body-2">
            {p}
            {idx < paths.length - 1 && <ChevronRight size={14} />}
          </span>
        ))}
      </div>
    );
  }

  return null;
};
export default PageCrumble;
