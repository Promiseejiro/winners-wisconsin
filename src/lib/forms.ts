const getApiBase = () => {
  const configured = (process.env.NEXT_PUBLIC_SERVER_URL || "https://winners-be.onrender.com").replace(/\/+$/, "");
  return configured.endsWith("/api/v1") ? configured : `${configured}/api/v1`;
};

export async function submitWebsiteForm(formType: string, payload: Record<string, unknown>) {
  const response = await fetch(`${getApiBase()}/contact/forms/${encodeURIComponent(formType)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => null);
  if (!response.ok) {
    const message = typeof result?.message === "string"
      ? result.message
      : Array.isArray(result?.message) ? result.message.join(", ") : "";
    throw new Error(message || "Your submission could not be sent. Please try again.");
  }
  return result;
}
