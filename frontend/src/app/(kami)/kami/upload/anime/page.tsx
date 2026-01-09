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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BackendIP, cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Home } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Horror",
  "Mistery",
  "Romance",
  "Sci-Fi",
  "Slice of life",
  "Supernatural",
  "Thriller",
];

export default function UploadPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const formSchema = z.object({
    title: z.string().min(1, "Wajib diisi"),
    genre: z.array(z.enum(genres)).min(1, "Wajib diisi"),
    coverImage: z.string().min(1, "Wajib diisi"),
    bannerImage: z.string().min(1, "Wajib diisi"),
    releaseDate: z.string().min(1, "Wajib diisi"),
    rating: z.string().min(1, "Wajib diisi"),
    status: z.string().min(1, "Wajib diisi"),
    synopsis: z.string().min(1, "Wajib diisi"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      genre: [],
      coverImage: "",
      bannerImage: "",
      releaseDate: "",
      rating: "",
      status: "",
      synopsis: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const response = await fetch(`${BackendIP}/api/upload`, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (!response) {
        toast.error("Kesalahan: upload gagal");
      }
      console.log(response);
      toast.success("Berhasil: upload berhasil")
      form.reset()
    } catch (error) {
      console.log(error)
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
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Card className="">
          <CardHeader className="mb-4">
            <CardTitle className="flex text-xl mb-1">Upload Anime</CardTitle>
            <CardDescription className="">
              Silahkan mengisi detail anime yang benar dan sesuai
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4 flex flex-col gap-6"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Anime title</FormLabel>
                      <div className="relative">
                        <Input placeholder="Naruto Shippuden" {...field} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="synopsis"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        className="h-48"
                        placeholder="It has been two and a half years since Naruto Uzumaki left Konohagakure, the Hidden Leaf Village, for intense training following events which fueled his desire to be stronger."
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Image</FormLabel>
                      <div className="relative">
                        <Input
                          placeholder="Taruh URL gambar disini"
                          {...field}
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bannerImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Banner Image</FormLabel>
                      <div className="relative">
                        <Input
                          placeholder="Taruh URL gambar disini"
                          {...field}
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genre Anime</FormLabel>
                      <div className="w-full flex gap-6 items-center flex-wrap">
                        {genres.map((genre) => (
                          <div key={genre} className=" text-sm flex items-center">
                            <Input
                              type="checkbox"
                              id={genre}
                              value={genre}
                              className="bg-transparent w-4 h-4 rounded-full"
                              checked={field.value?.includes(genre)}
                              onChange={(e) => {
                                const newGenres = e.target.checked
                                  ? [...field.value, genre]
                                  : field.value.filter(
                                      (g: string) => g !== genre
                                    );
                                field.onChange(newGenres);
                              }}
                            />
                            <label htmlFor={genre} className="text-gray-400 flex ml-2 w-max">
                              {genre}
                            </label>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating Anime</FormLabel>
                      <div className="relative">
                        <Input placeholder="8.05" {...field} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="releaseDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Release Date</FormLabel>
                      <div className="relative">
                        <Input placeholder="2007" {...field} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <div className="relative">
                        <Input placeholder="Completed" {...field} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col items-center justify-center gap-4">
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
