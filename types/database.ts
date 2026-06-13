export interface CouncilMember {
  id: string;
  name: string;
  role: string;
  category: string;
  image_url: string | null;
  display_order: number;
  created_at: string;
}

export interface NewsEvent {
  id: string;
  title: string;
  slug: string;
  date: string;
  description: string;
  content: string;
  image_url: string | null;
  created_at: string;
}
