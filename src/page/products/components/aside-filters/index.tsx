import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { mockCategories } from "@/lib/mock-data";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import z from "zod";

const schema = z.object({
  categories: z
    .array(z.string())
    .min(1, { error: "Precisa escolher ao menos uma opção" }),
});

export default function AsideFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  type schema = z.infer<typeof schema>;

  const form = useForm<schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      categories: [],
    },
  });

  const order = searchParams.get("order");

  function sendForm({ categories }: schema) {
    if (categories.length === 0) return;

    if (categories.includes("all")) {
      searchParams.delete("categories");
      setSearchParams(searchParams);
      return;
    }

    if (order) {
      setSearchParams({
        order,
        categories: categories.toString(),
      });
      return;
    }

    setSearchParams({
      categories: categories.toString(),
    });
  }

  useEffect(() => {
    const categories = searchParams.get("categories")?.split(",") as string[];
    form.setValue("categories", categories);
  }, [form, searchParams]);

  return (
    <aside>
      <div className="bg-card border border-border rounded-xl p-6 sticky top-24 w-full md:w-[280px]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-foreground">Filtros</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:bg-secondary lg:hidden"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-foreground mb-4">
            Categorias
          </h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(sendForm)}>
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem className="">
                    {mockCategories.map((item) => {
                      const checked = field.value?.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          className="flex items-center space-x-2"
                        >
                          <FormControl>
                            <Checkbox
                              id={item.id}
                              checked={checked}
                              onCheckedChange={(isChecked) => {
                                if (isChecked) {
                                  field.onChange([
                                    ...(field.value || []),
                                    item.id,
                                  ]);
                                } else {
                                  field.onChange(
                                    field.value?.filter((id) => id !== item.id)
                                  );
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel htmlFor={item.id}>{item.name}</FormLabel>
                        </div>
                      );
                    })}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-4"
              >
                Aplicar Filtros
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </aside>
  );
}
