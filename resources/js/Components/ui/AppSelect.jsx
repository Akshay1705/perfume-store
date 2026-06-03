import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function AppSelect({
    value,
    onChange,
    options,
    placeholder = "Select...",
    className = "",
}) {
    return (
        <Select
            value={value === "" ? "__all__" : value}
            onValueChange={(val) => onChange(val === "__all__" ? "" : val)}
        >
            <SelectTrigger
                className={`
                    w-full px-4 py-3 min-h-[50px] h-auto rounded-lg bg-slate-900/50 border transition-all duration-200
                    text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-0
                    focus:ring-red-500/30 focus:border-red-500/50 border-slate-700/50
                    data-[placeholder]:text-slate-500 [&>svg]:text-slate-400
                    ${className}
                `}
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent className="bg-slate-900 border border-slate-700/50 rounded-lg shadow-xl shadow-black/30">
                {options.map((opt) => (
                    <SelectItem
                        key={opt.value ?? "default"}
                        value={opt.value === "" ? "__all__" : String(opt.value)}
                        className="
                        text-slate-300 text-sm py-3 px-4 rounded-md
                        focus:bg-slate-800 focus:text-slate-100
                        data-[state=checked]:text-red-400
                        data-[state=checked]:bg-red-500/10
                        cursor-pointer
                    "
                    >
                        {opt.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
