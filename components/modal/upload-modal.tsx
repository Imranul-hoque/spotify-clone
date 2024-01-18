"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUploadModal } from "@/hooks/use-upload-modal";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { toast } from "sonner";
import uniqid from 'uniqid';
import { Loader } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title will be 3 charechter long" }),
  author: z.string().min(3, { message: "Author will be 3 charechter long" }),
  image: z.any(),
  song: z.any(),
});

export const UploadModal = () => {
  const { isOpen, onClose } = useUploadModal((state) => state);
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: "",
      image: null,
      song: null,
      title: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const imageFile = values.image;
    const songFile = values.song;
    

      try {
          if (!imageFile || !songFile) {
            return;
          }

          const uniqID = uniqid();

          const { data: songData, error: songError } =
            await supabaseClient.storage
              .from("songs")
              .upload(`song-${values.title}-${uniqID}`, songFile, {
                cacheControl: "3600",
                upsert: false,
              });

          if (songError) {
            return toast.error("Failed song upload");
          }

          const { data: imageData, error: imageError } =
            await supabaseClient.storage
              .from("images")
              .upload(`image-${values.title}-${uniqID}`, imageFile, {
                cacheControl: "3600",
                upsert: false,
              });

          if (imageError) {
            return toast.error("Failed image upload");
          }

          const { error: supabaseError } = await supabaseClient
            .from("songs")
            .insert({
              user_id: user?.id,
              title: values.title,
              author: values.author,
              image_path: imageData.path,
              song_path: songData.path,
            });

          if (supabaseError) {
            return toast.error(supabaseError.message);
          }

          router.refresh();
          toast.success("Song created!");
          form.reset();
          onClose();
      } catch (error) {
          console.log(error)
      }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-white font-bold text-2xl text-center">
            Add a Song
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground text-center">
            upload mp3 file
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-3"
              encType="multipart/form-data"
            >
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        className={cn(
                          `
                                                bg-neutral-800 
                                                py-2 px-1 border-none focus-visible:border-none ring-0 focus-visible:ring-0 fucus-visible:ring-offset-0
                                                focus:border-none`
                        )}
                        placeholder="Enter title..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="author"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input
                        className={cn(
                          `
                                                bg-neutral-800 
                                                py-2 px-1 border-none focus-visible:border-none ring-0 focus-visible:ring-0 fucus-visible:ring-offset-0
                                                focus:border-none`
                        )}
                        placeholder="Enter author name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="image"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        className={cn(
                          `
                                                bg-neutral-800 
                                                py-2 px-1 border-none focus-visible:border-none ring-0 focus-visible:ring-0 fucus-visible:ring-offset-0
                                                focus:border-none`
                        )}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          field.onChange(e.target?.files?.[0])
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="song"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Song</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".mp3"
                        className={cn(
                          `
                                                bg-neutral-800 
                                                py-2 px-1 border-none focus-visible:border-none ring-0 focus-visible:ring-0 fucus-visible:ring-offset-0
                                                focus:border-none`
                        )}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          field.onChange(e.target?.files?.[0])
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                disabled={form.formState.isSubmitting}
                className="transition hover:bg-pink-500 hover:opacity-75 w-full rounded-full bg-pink-500 text-white border-none"
              >
                { form.formState.isSubmitting ? <Loader className="animate-spin" />: "upload" }
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
