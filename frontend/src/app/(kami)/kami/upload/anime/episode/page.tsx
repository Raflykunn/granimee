"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { H4 } from "@/components/ui/typography";
import { useAnime } from "@/hooks/use-anime";
import { BackendIP, cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon, Home, Minus, Plus } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function UploadEpisodePage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { anime } = useAnime("/api/list/anime");

  const animeList = anime && anime.map((item) => item.title);

  const formSchema = z.object({
    episodes: z.array(
      z.object({
        animeTitle: z.string().min(1, "Wajib diisi"),
        title: z.string().min(1, "Wajib diisi"),
        episodeNum: z.string().min(1, "Wajib diisi"),
        duration: z.string().min(1, "Wajib diisi"),
        videoUrl: z.string().min(1, "Wajib diisi"),
        releaseDate: z.date().min(1, "Wajib diisi"),
      })
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      episodes: [
        {
          animeTitle: "",
          title: "",
          episodeNum: "",
          duration: "",
          videoUrl: "",
          releaseDate: new Date(),
        },
      ],
    },
  });

  const { append, remove, fields } = useFieldArray({
    control: form.control,
    name: "episodes",
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const data = values.episodes

    try {
      const response = await fetch(`${BackendIP}/api/upload/episode`, {
        method: "POST",
        body: JSON.stringify({
          data
        }),
      });
      if (response.status !== 200) {
        toast.error("Kesalahan: upload gagal");
      }
      // console.log(response);
      toast.success("Berhasil: upload berhasil");
      form.reset();
    } catch (error) {
      console.log(error);
      //   throw new Error(error);
    }
  };

  return (
    <div>
      <div
        className={cn(
          "my-24 mx-auto flex flex-col gap-6 max-w-5xl w-full",
          className
        )}
        {...props}
      >
        <div className="flex flex-col gap-3 w-3/5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/home"
                  className="flex items-center gap-2 text-xs"
                >
                  <Home className="w-4 h-4" /> Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="text-xs">Upload</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xs">Anime</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xs">Episode</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Card className="">
          <CardHeader className="mb-4">
            <CardTitle className="flex text-xl mb-1">
              Upload Episode Anime
            </CardTitle>
            <CardDescription className="">
              Silahkan mengisi detail episode anime yang benar dan sesuai
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4 flex flex-col gap-6"
              >
                {fields.map((v, index) => (
                  <div
                    id={`${index}`}
                    key={index}
                    className="space-y-4 flex flex-col"
                  >
                    <H4 text={`Anime ${index + 1}`} />
                    <FormField
                      control={form.control}
                      name={`episodes.${index}.animeTitle`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Anime Title</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select an anime title" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {animeList.map((anime) => (
                                <SelectItem key={anime} value={anime}>
                                  {anime}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`episodes.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Episode Title</FormLabel>
                          <div className="relative">
                            <Input placeholder="01" {...field} />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`episodes.${index}.videoUrl`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL Video</FormLabel>
                          <div className="relative">
                            <Input
                              placeholder="Taruh URL video disini"
                              {...field}
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`episodes.${index}.duration`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration</FormLabel>
                          <div className="relative">
                            <Input placeholder="20 min" {...field} />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`episodes.${index}.episodeNum`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Episode</FormLabel>
                          <Input placeholder="01" {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`episodes.${index}.releaseDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Release Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="end">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                captionLayout="dropdown"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-6 justify-center items-center">
                      {index !== 0 && (
                        <Button
                          onClick={() => remove(index)}
                          type="button"
                          variant={"outline"}
                          className="w-12 aspect-square rounded-sm"
                        >
                          <Minus className="w-5 h-5" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex flex-col items-center justify-center gap-4">
                  <Button
                    onClick={() =>
                      append({
                        animeTitle: "",
                        title: "",
                        episodeNum: "",
                        duration: "",
                        videoUrl: "",
                        releaseDate: new Date(),
                      })
                    }
                    type="button"
                    variant={"outline"}
                    className="w-12 aspect-square rounded-sm"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                  <Button type="submit" className="w-full">
                    Upload
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
