"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";



import {Input} from "@/components/ui/input";
import {useDebounce} from "@/hooks/use-debounce";

export const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: "/search",
      query,
    },{ skipEmptyString : true });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input
      placeholder="What do you want to listen to?"
      className="border-none bg-neutral-700 ring-0 focus-visible:ring-0 ring-offset-0 focus-visible:ring-offset-transparent focus-visible:border focus-visible:outline-none"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

