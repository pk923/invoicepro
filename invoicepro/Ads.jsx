import { useEffect } from "react";

export default function Ads() {
  useEffect(() => {
    const scripts = [];

    const addScript = (src, attrs = {}) => {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      Object.entries(attrs).forEach(([k, v]) =>
        s.setAttribute(k, v)
      );
      document.body.appendChild(s);
      scripts.push(s);
    };

    // Ad 1
    addScript(
      "https://pl28330114.effectivegatecpm.com/ac/a4/09/aca409517e820f6ead8e0743c70d18be.js"
    );

    // Ad 2
    addScript(
      "https://pl28330150.effectivegatecpm.com/13/75/83/1375836df6e7980ce49d73c6afc6d733.js"
    );

    // Ad 3 (iframe config)
    window.atOptions = {
      key: "772831fe045efd4b47c2d839addf68e2",
      format: "iframe",
      height: 300,
      width: 160,
      params: {}
    };

    addScript(
      "https://www.highperformanceformat.com/772831fe045efd4b47c2d839addf68e2/invoke.js"
    );

    // Ad 4
    addScript(
      "https://pl28330167.effectivegatecpm.com/66c012a1833046421187ce1b10f6f8c1/invoke.js",
      { "data-cfasync": "false" }
    );

    return () => {
      scripts.forEach(s => document.body.removeChild(s));
    };
  }, []);

  // ⭐ VERY IMPORTANT: container return
  return (
    <div
      id="container-66c012a1833046421187ce1b10f6f8c1"
      style={{ margin: "20px 0", textAlign: "center" }}
    />
  );
}
