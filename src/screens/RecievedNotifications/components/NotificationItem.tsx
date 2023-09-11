import { Badge } from "@/components";
import { cn } from "@/lib/utils";
import { BellIcon, CheckCheck } from "lucide-react"
import { useNavigate } from "react-router-dom";

interface NotificationItemProps {
    title: string;
    description: string;
    seen: boolean;
    orderId: number;
}

export const NotificationItem = ({ description, orderId, seen, title }: NotificationItemProps) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if (orderId) {
            navigate(`/orders/${orderId}`);
        }
    }
    return (
        <div onClick={handleClick} className={cn(
            "gap-2 border shadow-sm flex items-start space-x-4 rounded-md p-2 py-3 transition-all hover:bg-accent hover:text-accent-foreground",
            seen ? "bg-background text-muted-foreground" : "bg-accent-foreground text-accent",
            orderId ? "cursor-pointer" : "cursor-default"
        )}>
            {seen ? <CheckCheck className="mt-px h-5 w-5" /> : <BellIcon className="mt-px h-5 w-5" />}
            <div className="space-y-2 flex-col flex-1">
                <div className="text-sm flex gap-3 items-center font-medium leading-none">
                    {title}
                    {seen ? <Badge variant='secondary'>قديم</Badge> : <Badge> جديد</Badge>}
                </div>
                <p dir="ltr" className="text-sm text-muted-foreground text-end">
                    {description}
                </p>
            </div>
        </div>
    )
}