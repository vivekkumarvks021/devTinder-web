import { Inbox } from "lucide-react";

const EmptyState = ({
  title = "Nothing here",
  message = "No data available right now.",
  icon: Icon = Inbox,
}) => {
  return (
    <div className="flex min-h-75 flex-col items-center justify-center text-center">
      <div className="rounded-full bg-base-200 p-4">
        <Icon size={32} className="text-base-content/50" />
      </div>

      <h2 className="mt-4 text-lg font-semibold">{title}</h2>

      <p className="mt-1 max-w-sm text-sm text-base-content/60">{message}</p>
    </div>
  );
};

export default EmptyState;
