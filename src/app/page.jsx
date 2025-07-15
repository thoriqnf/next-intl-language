import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to the simple demo for now
  redirect('/demo/day-7/session-3/simple');
}