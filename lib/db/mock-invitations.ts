// Shared InvitationData type used by all templates
export interface InvitationData {
  brideName: string;
  groomName: string;
  weddingDate: string;
  weddingTime: string;
  venueName: string;
  venueAddress: string;
  contactNumber?: string;
  additionalMessage?: string;
  couplePhotoUrl?: string;
  familyDetails?: string;
  rsvpDetails?: string;
}

export interface InvitationRecord {
  id: string;
  slug: string;
  templateId: string;
  isPremium: boolean;
  data: InvitationData;
  createdAt: string;
}

// Temporary mock database until Phase 3 (DB Setup) is implemented
export const mockInvitations: Record<string, InvitationRecord> = {
  'rohit-priya': {
    id: 'inv_001',
    slug: 'rohit-priya',
    templateId: 'elegant-gold-001',
    isPremium: false,
    createdAt: '2026-06-01T10:00:00Z',
    data: {
      brideName: 'Priya',
      groomName: 'Rohit',
      weddingDate: 'Saturday, 14th February 2026',
      weddingTime: '7:00 PM onwards',
      venueName: 'The Grand Taj Palace',
      venueAddress: 'Marine Drive, Mumbai – 400001',
      contactNumber: '+91 98765 43210',
      additionalMessage: 'Your presence is our blessing',
      familyDetails: 'Son of Mr. & Mrs. Sharma',
      rsvpDetails: 'RSVP by 1st Feb 2026',
    },
  },
  'amit-sneha': {
    id: 'inv_002',
    slug: 'amit-sneha',
    templateId: 'modern-geometric-002',
    isPremium: true,
    createdAt: '2026-06-05T14:30:00Z',
    data: {
      brideName: 'Sneha',
      groomName: 'Amit',
      weddingDate: 'Sunday, 20th December 2026',
      weddingTime: '6:30 PM',
      venueName: 'ITC Grand Chola',
      venueAddress: 'Mount Road, Guindy, Chennai – 600032',
      contactNumber: '+91 99887 76655',
      additionalMessage: 'Join us to celebrate our new beginning',
      familyDetails: 'Daughter of Mr. & Mrs. Verma',
      rsvpDetails: 'RSVP by 5th Dec 2026',
    },
  },
  'arjun-kavya': {
    id: 'inv_003',
    slug: 'arjun-kavya',
    templateId: 'romantic-vintage-003',
    isPremium: false,
    createdAt: '2026-06-06T09:00:00Z',
    data: {
      brideName: 'Kavya',
      groomName: 'Arjun',
      weddingDate: 'Friday, 27th March 2026',
      weddingTime: '5:30 PM',
      venueName: 'The Leela Palace',
      venueAddress: 'Diplomatic Enclave, New Delhi – 110023',
      contactNumber: '+91 91234 56789',
      additionalMessage: 'Together is a beautiful place to be',
      familyDetails: 'Daughter of Mr. & Mrs. Menon',
      rsvpDetails: 'RSVP by 10th March 2026',
    },
  },
  'vikram-ananya': {
    id: 'inv_004',
    slug: 'vikram-ananya',
    templateId: 'traditional-indian-004',
    isPremium: false,
    createdAt: '2026-06-06T11:00:00Z',
    data: {
      brideName: 'Ananya',
      groomName: 'Vikram',
      weddingDate: 'Wednesday, 8th April 2026',
      weddingTime: '11:00 AM',
      venueName: 'Umaid Bhawan Palace',
      venueAddress: 'Circuit House Road, Jodhpur, Rajasthan – 342006',
      contactNumber: '+91 98111 22233',
      additionalMessage: 'With the blessings of Lord Ganesha',
      familyDetails: 'Son of Mr. & Mrs. Iyer',
      rsvpDetails: 'RSVP by 25th March 2026',
    },
  },
  'karan-meera': {
    id: 'inv_005',
    slug: 'karan-meera',
    templateId: 'royal-purple-005',
    isPremium: true,
    createdAt: '2026-06-06T13:00:00Z',
    data: {
      brideName: 'Meera',
      groomName: 'Karan',
      weddingDate: 'Saturday, 16th May 2026',
      weddingTime: '8:00 PM',
      venueName: 'Taj Falaknuma Palace',
      venueAddress: 'Engine Bowli, Falaknuma, Hyderabad – 500053',
      contactNumber: '+91 90001 23456',
      additionalMessage: 'A love story written in the stars',
      familyDetails: 'Son of Mr. & Mrs. Kapoor',
      rsvpDetails: 'RSVP by 1st May 2026',
    },
  },
};

export async function getInvitationBySlug(slug: string): Promise<InvitationRecord | null> {
  // Simulate network delay for realistic testing
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockInvitations[slug] || null;
}
