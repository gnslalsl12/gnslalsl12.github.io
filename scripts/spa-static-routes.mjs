// GitHub Pages는 요청 경로에 실제 파일이 없으면 항상 HTTP 404로 응답한다.
// public/404.html의 SPA 리다이렉트 트릭은 사용자의 브라우저(JS 실행)에는 통하지만,
// 카카오톡/페이스북 등 링크 미리보기 크롤러는 응답 코드가 404면 본문의 OG 태그를
// 무시하고 미리보기를 만들지 않는다. 라우트 경로마다 index.html을 복제해두면
// 실제 정적 파일이 존재하게 되어 200으로 응답하고, 클라이언트에서는 React Router가
// window.location.pathname을 그대로 읽어 정상적으로 라우팅한다.
import { cpSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const distDir = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const indexHtml = join(distDir, "index.html");

const STATIC_ROUTES = ["tools", "blog", "blog/write", "archive", "archive/upload", "guestbook", "2048"];

for (const route of STATIC_ROUTES) {
  const dir = join(distDir, route);
  mkdirSync(dir, { recursive: true });
  cpSync(indexHtml, join(dir, "index.html"));
}
