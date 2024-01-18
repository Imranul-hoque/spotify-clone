"use client";

import { Slider } from "@/components/ui/slider";

interface SliderComponentsProps {
  value?: number;
  onChange?: (value: number) => void;
}

export const SliderComponents = ({ value = 0, onChange }:SliderComponentsProps) => {
   
      const handleChange = (newValue: number[]) => {
        onChange?.(newValue[0]);
      };
   
    return (
      <Slider
        defaultValue={[1]}
        value={[value]}
        onValueChange={handleChange}
        max={1}
        step={0.1}
        aria-label="Volume"
      />
    );
}