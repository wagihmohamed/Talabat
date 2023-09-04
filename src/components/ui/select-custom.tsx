import { useTheme } from "@/providers/theme-provider";
import Select from "react-select";

interface CustomSelectProps {
  options: { label: string; value: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: any;
  withLabel?: boolean;
  label?: string;
  error?: boolean;
  helperText?: string;
  value?: { label: string; value: string } | { label: string; value: string }[];
  placeholder?: string;
  disabled?: boolean;
  isMulti?: boolean;
  width?: string;
  maxWidth?: string;
  name?: string;
  isLoading?: boolean;
  className?: string;
  defaultValue?: { label: string; value: string } | { label: string; value: string }[];
}

export const CustomSelect = ({
  onChange,
  options,
  withLabel,
  label,
  error,
  helperText,
  disabled,
  placeholder,
  value,
  isMulti,
  width,
  name,
  maxWidth,
  isLoading,
  className,
  defaultValue,
}: CustomSelectProps) => {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return (
    <>
      {withLabel && (
        <p className="mb-2 text-sm font-bold flex self-end">
          {label}
        </p>
      )}
      <Select
        value={value}
        name={name}
        isRtl={true}
        noOptionsMessage={() => "لا يوجد نتائج"}
        isLoading={isLoading}
        loadingMessage={() => "Loading..."}
        isMulti={isMulti}
        isDisabled={disabled}
        className={className}
        defaultValue={defaultValue}
        placeholder={placeholder || "اختر"}
        styles={{
          control: (provided) => ({
            ...provided,
            minHeight: "45px",
            width,
            maxWidth,
            backgroundColor: "bg-background",
            border: error ? "1px solid hsl(var(--destructive))" : `1px solid hsl(var(--border))`,
            "&:hover": {
              border: error ? "1px solid hsl(var(--destructive))" : `1px solid hsl(var(--border))`,
            },
            outline: `1px solid hsl(var(--border))`,
            "&:focus": {
              border: error ? "1px solid hsl(var(--destructive))" : `1px solid hsl(var(--border))`,
            },
            "&:active": {
              border: error ? "1px solid hsl(var(--destructive))" : `1px solid hsl(var(--border))`,
            },
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: "0 10px",
          }),
          menuList: (provided) => ({
            ...provided,
            maxHeight: "200px",
          }),
          menu: (provided) => ({
            ...provided,
            zIndex: 9999,
            color: "#fff",
            backgroundColor: dark ? "hsl(var(--background))" : "#fff",
            border: "1px solid hsl(var(--border))",
          }),
          option: (provided) => ({
            ...provided,
            backgroundColor: dark ? "hsl(var(--background))" : "#fff",
            color: dark ? "#fff" : "#000",
            "&:hover": {
              backgroundColor: "hsl(var(--muted))",
              color: dark ? "#fff" : "#000",
            },
          }),
          singleValue: (provided) => ({
            ...provided,
            color: dark ? "#fff" : "#000",
          }),
        }}
        options={options}
        onChange={(e) => {
          onChange(e);
        }}
      />
      {error && <p className="text-destructive text-xs font-medium">{helperText}</p>}
    </>
  );
};
