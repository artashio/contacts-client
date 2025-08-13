"use client"
import { useRouter } from "next/navigation";
import { JSX } from "react";

type Props = {
  path: string;
  copy: string;
};

function NavButton({ path, copy }: Props): JSX.Element {
  const router = useRouter();
  if (!path) return <></>;
  return (
    <div>
      <button onClick={() => router.push(path)} className="buttonStyle">
        {copy}
      </button>
      <br />
    </div>
  );
};

export default NavButton;
