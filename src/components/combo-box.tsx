'use client';

import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { Data } from '@/types/school-index';

interface ComboboxProps {
    value: string;
    onChange: (value: string) => void;
    data: Data[];
}

export function Combobox({ value, onChange, data }: ComboboxProps) {
    const [open, setOpen] = React.useState(false);
    console.log('data >>>>>', data)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                    className='w-full justify-between text-white'
                >
                    {data.find((object) => object.value === value)?.label ||
                        'Select ...'}
                    <ChevronDown />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-full p-0'>
                <Command>
                    <CommandInput placeholder='Search id...' className='h-9' />
                    <CommandList>
                        <CommandEmpty>No data found.</CommandEmpty>
                        <CommandGroup>
                            {data.map((object) => (
                                <CommandItem
                                    key={object.value}
                                    value={object.value}
                                    onSelect={(currentValue) => {
                                        onChange(currentValue === value ? '' : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    {object.label}
                                    <Check
                                        className={cn(
                                            'ml-auto',
                                            value === object.value ? 'opacity-100' : 'opacity-0'
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
