"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, RefreshCw } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const messageSchema = z.object({
  content: z.string().min(1, "Message is required").max(500, "Message is too long"),
});

type MessageFormData = z.infer<typeof messageSchema>;

const MessagePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>([]);
  const { toast } = useToast();
  const params = useParams();
  const username = params.username as string;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = async (data: MessageFormData) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/send-messages", {
        username,
        content: data.content,
      });

      if (response.data.success) {
        toast({
          title: "Success",
          description: "Message sent successfully!",
        });
        setValue("content", "");
      }
    } catch (e) {
      console.error(e);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestMessage = async () => {
    setIsSuggesting(true);
    try {
      const response = await axios.post("/api/suggest-messages");
      const suggestions = response.data.content.split("||");
      setSuggestedMessages(suggestions);
    } catch (e) {
      console.error(e);
      toast({
        title: "Error",
        description: "Failed to get message suggestions",
        variant: "destructive",
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleMessageSelect = (message: string) => {
    setValue("content", message);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Send a message to @{username}
        </h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <textarea
              {...register("content")}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px] resize-none"
              placeholder="Type your message here..."
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleSuggestMessage}
              disabled={isSuggesting}
              className="flex items-center gap-2"
            >
              {isSuggesting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Get Suggestions
            </Button>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Send Message"
              )}
            </Button>
          </div>
        </form>

        {suggestedMessages.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Suggested Messages</h2>
            <div className="space-y-2">
              {suggestedMessages.map((message, index) => (
                <div
                  key={index}
                  onClick={() => handleMessageSelect(message)}
                  className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <p className="text-gray-700">{message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Your message will be sent anonymously</p>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;