import { notFound } from "next/navigation";
// No approved beat inventory exists in this checkout. Do not invent products or offers.
export default function BeatDetailPage() {
  notFound();
}
