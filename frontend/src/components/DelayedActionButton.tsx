import { useRef, useEffect, useState, MouseEvent } from "react";
import { Loader } from "./Icons";

const DelayedActionButton = ({
  className,
  disabled,
  text,
  confirmText,
  busyText,
  isBusy,
  clickAction,
}: {
  className?: string;
  disabled?: boolean;
  text?: React.ReactNode;
  confirmText?: React.ReactNode;
  busyText?: React.ReactNode;
  isBusy?: boolean;
  clickAction: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
}) => {
  const actionReqTimeoutRef = useRef<number | undefined>();
  useEffect(() => {
    // Clear the interval when the component unmounts
    return () => clearTimeout(actionReqTimeoutRef.current);
  }, []);

  const [actionRequested, setActionRequested] = useState(false);
  const cancelActionRequest = () => setActionRequested(false);

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    clearTimeout(actionReqTimeoutRef.current);

    // execute action if a request was previously queued.
    if (actionRequested) {
      clickAction(e);
      setActionRequested(false);
      return;
    }

    // queue the action request and auto-cancel after 3s.
    setActionRequested(true);
    actionReqTimeoutRef.current = setTimeout(cancelActionRequest, 3000);
  };

  return (
    <button
      disabled={disabled ?? isBusy}
      className={className}
      onClick={handleClick}
    >
      {isBusy
        ? busyText ?? <Loader  className="h-5 w-5 text-red-500"  />
        : actionRequested
        ? confirmText ?? "Confirm"
        : text ?? "Click Me"}
    </button>
  );
};

export default DelayedActionButton;
