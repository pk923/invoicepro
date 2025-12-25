import { useEffect } from "react";

export default function Ads() {
  useEffect(() => {
    // Ad 1
    const s1 = document.createElement("script");
    s1.src =
      "https://pl28330114.effectivegatecpm.com/ac/a4/09/aca409517e820f6ead8e0743c70d18be.js";
    s1.async = true;
    document.body.appendChild(s1);

    // Ad 2
    const s2 = document.createElement("script");
    s2.src =
      "https://pl28330150.effectivegatecpm.com/13/75/83/1375836df6e7980ce49d73c6afc6d733.js";
    s2.async = true;
    document.body.appendChild(s2);

    // Ad 3 (iframe)
    window.atOptions = {
      key: "772831fe045efd4b47c2d839addf68e2",
      format: "iframe",
      height: 300,
      width: 160,
      params: {}
    };

    const s3 = document.createElement("script");
    s3.src =
      "https://www.highperformanceformat.com/772831fe045efd4b47c2d839addf68e2/invoke.js";
    s3.async = true;
    document.body.appendChild(s3);

    // Ad 4
    const s4 = document.createElement("script");
    s4.src =
      "https://pl28330167.effectivegatecpm.com/66c012a1833046421187ce1b10f6f8c1/invoke.js";
    s4.async = true;
    s4.setAttribute("data-cfasync", "false");
    document.body.appendChild(s4);
  }, []);

  // Ad 5 (container)
  return (
    <div
      id="container-66c012a1833046421187ce1b10f6f8c1"
      style={{ minHeight: 250, textAlign: "center" }}
    />
  );
}

