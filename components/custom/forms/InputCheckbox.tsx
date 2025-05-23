/* eslint-disable no-unused-vars */
import { Checkbox } from '@/components/ui/checkbox';

export interface CheckboxProps {
  onChange: (checked: boolean) => void
  value: boolean
  label?: string
  description?: string
}

function InputCheckbox({
  onChange, value, label, description,
}: CheckboxProps) {
  return (
    <div className="flex flex-row items-center space-x-2 hover:bg-slate-50 hover:cursor-pointer p-2 rounded-lg">
      <Checkbox
        id="checkedBox"
        checked={value}
        onCheckedChange={(checked: boolean) => {
          onChange(checked);
        }}
        className="shadow-none"
        // className="mt-1"
        // pt={1}
      />
      <div className="flex flex-col">
        <label
          htmlFor="checkedBox"
          className={`capitalize text-[12px] font-semibold ${
            value && 'text-slate-700'
          } text-slate-500 `}
        >
          {label}
        </label>
        {(description != null) && (
          <span
            className="text-slate-500 text-[14px]
        "
          >
            {description}
          </span>
        )}
      </div>
    </div>
  );
}

export default InputCheckbox;
