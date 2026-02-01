import { useMutation } from "@tanstack/react-query";

export function useChat() {
  return useMutation({
    mutationFn: async (data: any) => {
      console.log("Attempting to send message to /api/chat...", data);

      // 1. Direct fetch to the Vercel API route
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // 2. Check for HTTP errors (404, 500, etc)
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server Error:", errorText);
        throw new Error(`Server error: ${res.status} ${errorText}`);
      }

      // 3. Return the raw JSON
      const result = await res.json();
      console.log("Server response:", result);
      
      // 4. Adapt the response for Home.tsx
      // If the server sends { message: "..." }, we pass it through.
      // If the server sends { reply: "..." }, we map it to message.
      return {
        message: result.message || result.reply || "No response text found"
      };
    },
  });
}