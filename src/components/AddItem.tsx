"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Command, CommandInput, CommandItem } from "./ui/command";
import { CommandEmpty, CommandGroup } from "cmdk";
import { Search } from "lucide-react";
import { useDebounce } from "use-debounce";
import { getSearchAPI } from "@/utils/api-requests";
import { useQuery } from "@tanstack/react-query";
import { searchResult } from "@/types/search";
import { ScrollArea } from "./ui/scroll-area";

const formSchema = z.object({
  title: z.string({ required_error: "Please enter title" }),
});

type formType = z.infer<typeof formSchema>;

type searchRes = {
  data?: searchResult;
  error?: any;
};

export default function AddItem() {
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const [title, setTitles] = useState<Array<any>>([]);
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 350);

  const onSearchChange = (e: string) => {
    if (!e || e === "") return;
    return getSearchAPI(e);
  };

  const { data, isSuccess } = useQuery({
    queryKey: ["titles", debouncedQuery],
    queryFn: () => onSearchChange(debouncedQuery[0]),
    staleTime: 300,
  });

  console.log(isSuccess);
  console.log(data);

  function onSubmit(val: formType) {
    console.log(val);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Title</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        title.find((t) => t.value === field.value)?.label
                      ) : (
                        <div className="flex items-center gap-2 ">
                          Search movie/tv-show <Search className="w-4 h-4" />
                        </div>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search movie..."
                      className="h-9"
                      onValueChange={setQuery}
                    />
                    <ScrollArea className="max-h-[180px] overflow-auto">
                      <CommandEmpty>No such title.</CommandEmpty>
                      <CommandGroup>
                        {isSuccess &&
                          data.data?.results.map((d: any, i: number) => {
                            if (d.media_type === "person") return;

                            if (d.media_type === "tv") {
                              return (
                                <CommandItem key={i} value={d.id}>
                                  {d.name}
                                </CommandItem>
                              );
                            }

                            return (
                              <CommandItem key={i} value={d.id}>
                                {d.title}
                              </CommandItem>
                            );
                          })}
                      </CommandGroup>
                    </ScrollArea>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
