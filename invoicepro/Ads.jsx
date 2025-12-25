import { useEffect } from "react";

export default function Ads() {
  useEffect(() => {
    // Prevent duplicate load
    if (document.getElementById("ad4-script")) return;

    const s4 = document.createElement("script");
    s4.id = "ad4-script";
    s4.src =
      "https://pl28330167.effectivegatecpm.com/66c012a1833046421187ce1b10f6f8c1/invoke.js";
    s4.async = true;
    s4.setAttribute("data-cfasync", "false");
    document.body.appendChild(s4);

    return () => {
      if (document.body.contains(s4)) {
        document.body.removeChild(s4);
      }
    };
  }, []);

  // ✅ Ad 5 container (MOST IMPORTANT)
  return (
    <div
      id="container-66c012a1833046421187ce1b10f6f8c1"
      style={{
        minHeight: "250px",
        width: "100%",
        textAlign: "center",
        margin: "20px 0"
      }}
    />
  );
}
