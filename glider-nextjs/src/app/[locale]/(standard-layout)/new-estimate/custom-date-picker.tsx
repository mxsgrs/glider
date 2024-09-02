import React, { useState } from 'react';
import { useController } from 'react-hook-form';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

import {
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form"

import { Locale } from 'date-fns';

interface DatePickerProps {
  name: string;
  label: string,
  locale: Locale,
  control: any;
}

const DatePicker: React.FC<DatePickerProps> = ({ name, label, locale, control }) => {
  const { field } = useController({ name, control });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(field.value || undefined);

  // Update the form field value when date changes
  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    field.onChange(date);
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, 'PPP', { 'locale': locale }) : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateChange}
              initialFocus locale={locale}
            />
          </PopoverContent>
        </Popover>
      </FormControl>
    </FormItem>
  );
};

export default DatePicker;
