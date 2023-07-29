import { Button } from "@/components";

interface SideBarItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant: "secondary" | "ghost";
  icon: React.ReactNode;
  title: string;
}

export const SideBarItem = ({
  icon,
  title,
  variant,
  ...rest
}: SideBarItemProps) => {
  return (
    <Button {...rest} variant={variant} className="w-full flex justify-start gap-2">
      {icon}
      <p className="hidden md:block text-xs md:text-sm font-semibold text-slate-900">
        {title}
      </p>
    </Button>
  );
};
