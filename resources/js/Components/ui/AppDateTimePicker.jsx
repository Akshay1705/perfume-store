import { useState } from "react";
import { format, parseISO, startOfDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";

export default function AppDateTimePicker({
    value,
    onChange,
    placeholder = "Select date & time",
}) {
    const [openDate, setOpenDate] = useState(false);
    const [openTime, setOpenTime] = useState(false);

    // value is "YYYY-MM-DDTHH:mm" string
    const dateValue = value ? parseISO(value) : null;

    const currentHours = value ? value.slice(11, 13) : "00";
    const currentMinutes = value ? value.slice(14, 16) : "00";

    const handleDaySelect = (day) => {
        if (!day) return;
        const dateStr = format(day, "yyyy-MM-dd");
        onChange(`${dateStr}T${currentHours}:${currentMinutes}`);
        setOpenDate(false);
    };

    const handleTimeSelect = (type, timeVal) => {
        const nextHours = type === "hours" ? timeVal : currentHours;
        const nextMinutes = type === "minutes" ? timeVal : currentMinutes;

        if (dateValue) {
            const dateStr = format(dateValue, "yyyy-MM-dd");
            onChange(`${dateStr}T${nextHours}:${nextMinutes}`);
        } else {
            const today = format(new Date(), "yyyy-MM-dd");
            onChange(`${today}T${nextHours}:${nextMinutes}`);
        }
    };

    const handleClear = () => {
        onChange("");
        setOpenDate(false);
    };

    const hoursArray = Array.from({ length: 24 }, (_, i) =>
        String(i).padStart(2, "0"),
    );
    const minutesArray = Array.from({ length: 60 }, (_, i) =>
        String(i).padStart(2, "0"),
    );

    return (
        <div className="flex gap-2">
            {/* Date Picker */}
            <Popover open={openDate} onOpenChange={setOpenDate}>
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
                        // Clear time elements to guarantee a match with calendar rendering engine
                        today={startOfDay(new Date())}
                        classNames={{
                            months: "p-3 text-red-400",
                            head_cell: "text-red-400 text-xs font-medium w-8",
                            cell: "text-center p-0",
                            day: "h-8 w-8 rounded-md text-slate-300 text-sm hover:bg-slate-800 hover:text-red-500 transition-colors",

                            // Selected state (your solid red circle/square)
                            selected:
                                "!bg-red-500 !text-white font-semibold hover:!bg-red-600 focus:!bg-red-500",

                            // Explicit styling for today's real-time date (soft red outline/tint)
                            today:
                                "!border !border-red-500/50 !text-red-400 font-bold rounded-md !bg-red-500/10",

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

            {/* Custom Shadcn-Style Time Picker */}
            <Popover open={openTime} onOpenChange={setOpenTime}>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        className="w-36 flex items-center justify-between px-4 py-3 min-h-[50px] rounded-lg bg-slate-900/50 border border-slate-700/50 text-slate-100 text-sm focus:outline-none hover:border-slate-600 data-[state=open]:border-red-500/50 transition-colors"
                    >
                        <span>{`${currentHours}:${currentMinutes}`}</span>
                        <Clock size={16} className="text-slate-400 shrink-0" />
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-0 bg-slate-900 border border-slate-700/50 rounded-lg shadow-xl shadow-black/30">
                    <div className="flex h-60 divide-x divide-slate-800 text-center">
                        {/* Hours List */}
                        <div className="flex-1 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pb-1 sticky top-0 bg-slate-900">
                                HH
                            </div>
                            {hoursArray.map((hour) => (
                                <button
                                    key={hour}
                                    type="button"
                                    onClick={() =>
                                        handleTimeSelect("hours", hour)
                                    }
                                    className={`w-full text-sm py-1.5 transition-colors ${
                                        currentHours === hour
                                            ? "bg-red-500 text-white font-semibold"
                                            : "text-slate-300 hover:bg-slate-800"
                                    }`}
                                >
                                    {hour}
                                </button>
                            ))}
                        </div>
                        {/* Minutes List */}
                        <div className="flex-1 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pb-1 sticky top-0 bg-slate-900">
                                MM
                            </div>
                            {minutesArray.map((minute) => (
                                <button
                                    key={minute}
                                    type="button"
                                    onClick={() =>
                                        handleTimeSelect("minutes", minute)
                                    }
                                    className={`w-full text-sm py-1.5 transition-colors ${
                                        currentMinutes === minute
                                            ? "bg-red-500 text-white font-semibold"
                                            : "text-slate-300 hover:bg-slate-800"
                                    }`}
                                >
                                    {minute}
                                </button>
                            ))}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
