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
    <Button {...rest} variant={variant} className="w-full justify-start">
      {icon}
      {title}
    </Button>
  );
};
