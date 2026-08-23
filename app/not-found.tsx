import type { Metadata } from "next";
import Development404 from "./Development404";
import "./not-found.css";

export const metadata: Metadata = {
  title: "努力开发中 | Litchee Lab",
  description: "这个页面仍在开发中。",
};

export default function NotFound() {
  return <Development404 />;
}
