"use server";

import RecommendationCarousel from "@/components/RecommendationCarousel";

const BASE_URL = "https://grabin-food-be-kv422ek6cq-et.a.run.app/api";

export async function sendMessage(formData: FormData): Promise<any> {
  const message = formData.get("message") as string;
  console.log(message);

  const res = await fetch(`${BASE_URL}/chat/send_message/`, {
    method: "POST",
    body: JSON.stringify({ content: message, is_user: true }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Failed to fetch data: ${res.status} ${res.statusText} - ${errorText}`,
    );
  }

  const data = await res.json();
  console.log(data);

  if (!data.valid) {
    return data.data;
  }

  if (data.followUpType) {
    console.log(data.followUpType);
    switch (data.followUpType) {
      case "price":
        return "price slider";
      case "rating":
        // Code for handling rating follow-up
        break;
      case "distance":
        // Code for handling distance follow-up
        break;
      case "category":
        // Code for handling category follow-up
        break;
      default:
        // Code for handling unknown follow-up type
        break;
    }
  }

  // Construct search params from the data array
  const searchParams = new URLSearchParams();
  data.data.forEach((item: Record<string, string>) => {
    const [key, value] = Object.entries(item)[0];
    searchParams.append(key, value);
  });

  const res2 = await fetch(`${BASE_URL}/menus/?${searchParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res2.ok) {
    const errorText = await res2.text();
    throw new Error(
      `Failed to fetch menu data: ${res2.status} ${res2.statusText} - ${errorText}`,
    );
  }

  const menuData = await res2.json();
  console.log(menuData);

  return menuData;
}

export async function clearChat(): Promise<void> {
  const res = await fetch(`${BASE_URL}/chat/clear_chat/`, {
    method: "POST",
    body: JSON.stringify({ content: "string", is_user: true }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Failed to clear chat: ${res.status} ${res.statusText} - ${errorText}`,
    );
  }
}

export async function getMenuQuiz(payload) {
  try {
    const response = await fetch("http://localhost:8000/api/menus", {
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
    } catch (error) {
    console.error(error);
    }
}