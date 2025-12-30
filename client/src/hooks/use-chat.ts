import { useMutation } from "@tanstack/react-query";
import { api, type ChatRequest, type ChatResponse } from "@shared/routes";

export function useChat() {
  return useMutation({
    mutationFn: async (data: ChatRequest) => {
      // Validate request data using shared schema
      const validatedData = api.chat.sendMessage.input.parse(data);

      const res = await fetch(api.chat.sendMessage.path, {
        method: api.chat.sendMessage.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      });

      if (!res.ok) {
        const error = await res.json();
        // Try to parse specific validation errors if available
        try {
          const parsedError = api.chat.sendMessage.responses[400].parse(error);
          throw new Error(parsedError.message);
        } catch {
          throw new Error(error.message || "Failed to send message");
        }
      }

      const responseData = await res.json();
      return api.chat.sendMessage.responses[200].parse(responseData);
    },
  });
}
