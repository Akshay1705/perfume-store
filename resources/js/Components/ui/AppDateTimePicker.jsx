import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

export default function AppDateTimePicker({
    value,
    onChange,
    placeholder = "Select date & time",
}) {
    const [open, setOpen] = useState(false);

    // value is "YYYY-MM-DDTHH:mm" string
    const dateValue = value ? parseISO(value) : null;
    const timeValue = value ? value.slice(11, 16) : "00:00";

    const handleDaySelect = (day) => {
        if (!day) return;
        const dateStr = format(day, "yyyy-MM-dd");
        onChange(`${dateStr}T${timeValue}`);
        setOpen(false);
    };

    const handleTimeChange = (e) => {
        const time = e.target.value;
        if (dateValue) {
            const dateStr = format(dateValue, "yyyy-MM-dd");
            onChange(`${dateStr}T${time}`);
        } else {
            const today = format(new Date(), "yyyy-MM-dd");
            onChange(`${today}T${time}`);
        }
    };

    const handleClear = () => {
        onChange("");
        setOpen(false);
    };

    return (
        <div className="flex gap-2">
            {/* Date Picker */}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        className="flex-1 flex items-center gap-2 px-4 py-3 min-h-[50px] rounded-lg bg-slate-900/50 border border-slate-700/50 text-left transition-all duration-200 focus:outline-none focus-visible:ring-0 hover:border-slate-600 data-[state=open]:border-red-500/50"
                    >
                        <CalendarIcon
                            size={16}
                            className="text-slate-400 shrink-0"
                        />
                        <span
                            className={
                                dateValue
                                    ? "text-slate-100 text-sm"
                                    : "text-slate-500 text-sm"
                            }
                        >
                            {dateValue
                                ? format(dateValue, "dd MMM yyyy")
                                : placeholder}
                        </span>
                    </button>
                </PopoverTrigger>

                <PopoverContent
                    className="w-auto p-0 bg-slate-900 border border-slate-700/50 rounded-lg shadow-xl shadow-black/30"
                    align="start"
                >
                    <Calendar
                        mode="single"
                        selected={dateValue}
                        onSelect={handleDaySelect}
                        initialFocus
                        classNames={{
                            months: "p-3 text-red-500",
                            head_cell: "text-slate-400 text-xs font-medium w-8",
                            cell: "text-center p-0",
                            day: "h-8 w-8 rounded-md text-slate-300 text-sm hover:bg-slate-800 hover:text-white transition-colors",

                            selected:
                                "!bg-red-500 !text-white font-semibold hover:!bg-red-600 focus:!bg-red-500",

                            day_today:
                                "text-red-400 font-bold underline underline-offset-4",
                            day_outside: "text-slate-600 opacity-50",

                            button_previous:
                                "text-slate-400 hover:text-white hover:bg-slate-800 rounded-md p-1 transition-colors",
                            button_next:
                                "text-slate-400 hover:text-white hover:bg-slate-800 rounded-md p-1 transition-colors",

                            caption:
                                "text-slate-200 font-semibold text-sm flex items-center justify-between px-1 mb-2",
                        }}
                    />
                    {dateValue && (
                        <div className="px-3 pb-3">
                            <button
                                type="button"
                                onClick={handleClear}
                                className="text-xs text-slate-400 hover:text-red-400 transition-colors"
                            >
                                Clear
                            </button>
                        </div>
                    )}
                </PopoverContent>
            </Popover>

            {/* Time Input */}
            <input
                type="time"
                value={timeValue}
                onChange={handleTimeChange}
                className="w-36 px-4 py-3 min-h-[50px] rounded-lg bg-slate-900/50 border border-slate-700/50 text-slate-100 text-sm focus:outline-none focus:border-red-500/50 transition-colors cursor-pointer
                [&::-webkit-calendar-picker-indicator]:opacity-70
                hover:[&::-webkit-calendar-picker-indicator]:opacity-100
                hover:border-slate-600"
                style={{ colorScheme: "dark" }}
            />
        </div>
    );
}
