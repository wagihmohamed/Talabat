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
}: CustomSelectProps) => {
  return (
    <>
      {withLabel && (
        <p className="mb-2 text-sm font-bold flex self-end text-primary">
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
        placeholder={placeholder || "اختر"}
        styles={{
          control: (provided) => ({
            ...provided,
            minHeight: "45px",
            width,
            maxWidth,
            border: error ? "1px solid #d32f2f" : `1px solid #D3D3D3`,
            "&:hover": {
              border: error ? "1px solid #d32f2f" : `1px solid #D3D3D3`,
            },
            outline: `1px solid #D3D3D3`,
            "&:focus": {
              border: error ? "1px solid #d32f2f" : `1px solid #D3D3D3`,
            },
            "&:active": {
              border: error ? "1px solid #d32f2f" : `1px solid #D3D3D3`,
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
        }}
        options={options}
        onChange={(e) => {
          onChange(e);
        }}
      />
      {error && <p className="select-error">{helperText}</p>}
    </>
  );
};
