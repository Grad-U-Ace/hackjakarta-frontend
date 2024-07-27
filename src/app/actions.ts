"use server";

export async function sendMessage(formData: FormData): Promise<string> {
  const message = formData.get("message") as string;
  console.log(message);
  // Simulate a response for demonstration purposes
  
  return "response message";
}
