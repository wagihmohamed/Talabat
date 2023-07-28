import { ErrorImage } from "@/assets";
import { Spinner } from "..";

interface LoadingErrorPlaceholderProps {
  isLoading: boolean;
  isError: boolean;
  height?: string;
  children: React.ReactNode;
  width?: string;
  isEmpty?: boolean;
  emptyImg?: string;
  emptyText?: React.ReactNode;
  imgWidth?: string;
  imgHeight?: string;
}

export const LoadingErrorPlaceholder = ({
  isError,
  isLoading,
  height = "100vh",
  children,
  width,
  isEmpty,
  emptyText,
}: LoadingErrorPlaceholderProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spinner />
      </div>
    );
  }

  if (isEmpty && !isLoading) {
    return (
      <div
        className={`${height} ${
          width || "w-full"
        } flex flex-col items-center justify-center`}
      >
        {emptyText}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col h-[90%] w-full items-center justify-center p-6">
        <img
          style={{
            width: "400px",
            height: "400px",
            objectFit: "contain",
          }}
          src={ErrorImage}
          alt="error"
        />
        <div className="text-center">
          <p className="text-lg">حدث خطأ ما!</p>
          <p className="mt-6 text-lg text-gray-600">
            للأسف حدث خطأ ما، يرجى المحاولة مرة أخرى
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
