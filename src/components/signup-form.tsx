"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Mail, MailCheck, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

export const SignupForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [showPass, setShowPass] = useState(false);
  const [isVerification, setIsVerification] = useState(false)

  const formSchema = z.object({
    username: z.string().min(1, "Username tidak boleh kosong"),
    email: z
      .email({
        message: "Email tidak valid",
      })
      .min(1, "Email tidak boleh kosong"),
    password: z.string().min(1, "Password tidak boleh kosong"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const googleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://localhost:3000/home`,
      },
    });

    if (error) console.error(error.message);
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    
    const validation = formSchema.safeParse(values);
    if (!validation.success) {
      toast.error(`Error: ${validation.error.message}`);
    }

    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          name: values.username,
          role: "admin"
        },
      }
    });

    if (data.user) {
      await supabase.from("user").insert({
        id: data.user.id,
        username: values.username,
        email: values.email,
        role: "admin"
    })
  }

    if (error) {
      toast.error(`Error:, ${error.message}`);
    }

    setIsVerification(true)
  };

  return (
    <div>
      {isVerification ? (
        <VerificationCard />
      ) : (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-center text-xl mb-1">
                Daftar Akun
              </CardTitle>
              <CardDescription className="text-center">
                Daftarkan akun kamu agar dapat menggunakan berbagai fitur
                granime.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <div className="relative">
                          <Input placeholder="uchiha_sasuke" {...field} />
                          <User className="w-5 h-5 absolute top-1.5 right-3.5 text-muted-foreground" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <div className="relative">
                          <Input placeholder="sasuke@example.com" {...field} />
                          <Mail className="w-5 h-5 absolute top-1.5 right-3.5 text-muted-foreground" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <div className="relative">
                          <Input
                            type={showPass ? "text" : "password"}
                            {...field}
                          />
                          <button
                            type="button"
                            className="cursor-pointer"
                            onClick={() => setShowPass(!showPass)}
                          >
                            {showPass ? (
                              <EyeClosed className="w-5 h-5 absolute top-1/5 right-3.5 text-muted-foreground" />
                            ) : (
                              <Eye className="w-5 h-5 absolute top-1.5 right-3.5 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col items-center justify-center gap-4">
                    <Button type="submit" className="w-full">
                      Daftar
                    </Button>
                    <div className="flex gap-4 w-4/5 items-center">
                      <span className="h-[1px] w-full bg-muted"></span>
                      <p className="text-sm text-muted-foreground">Atau</p>
                      <span className="h-[1px] w-full bg-muted"></span>
                    </div>
                    <Button
                      type="button"
                      variant={"outline"}
                      className="w-full"
                      onClick={googleLogin}
                    >
                      <FaGoogle /> Daftar dengan Google
                    </Button>
                  </div>
                </form>
              </Form>
              <div className="text-xs flex justify-center mt-6 flex-wrap gap-1">
                <p className="text-muted-foreground">Sudah punya akun?</p>
                <Link
                  className="text-primary hover:underline"
                  href={"/auth/login"}
                >
                  Masuk disini
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

const VerificationCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-center text-xl mb-1">
          Verifikasi Email
        </CardTitle>
        <CardDescription className="text-center">
          Periksa inbox email kamu yang berisikan link verifikasi email
        </CardDescription>
        <CardContent className="flex flex-col mt-4 gap-4 items-center justify-center">
          <span className="text-primary">
            <MailCheck className="w-16 h-16" />
          </span>
        </CardContent>
      </CardHeader>
    </Card>
  );
}

