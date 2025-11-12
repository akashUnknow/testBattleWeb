import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";

const ProfileFormField = ({
  name,
  control,
  label,
  icon: Icon,
  disabled = false,
  placeholder = "",
  helperText = "",
}) => {
  return (
    <div className="group">
      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
        <Icon className="w-4 h-4 text-gray-400" />
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <Input
              {...field}
              disabled={disabled}
              placeholder={placeholder}
              className={`h-12 transition-all ${
                disabled
                  ? "bg-gray-50 border-gray-200 cursor-not-allowed"
                  : "border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }`}
            />
            {helperText && (
              <p className="text-xs text-gray-500 mt-1">{helperText}</p>
            )}
            {fieldState.invalid && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {fieldState.error?.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default ProfileFormField;