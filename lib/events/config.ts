import type { EventType } from './types';

export interface EventFieldConfig {
  step1Label: string;
  step1Description: string;
  primaryNameLabel: string;
  primaryNamePlaceholder: string;
  secondaryNameLabel: string;
  secondaryNamePlaceholder: string;
  photoLabel: string;
  familyDetailsLabel: string;
  familyDetailsPlaceholder: string;
  dateLabel: string;
  summaryConnector: string;
}

export const EVENT_FIELD_CONFIG: Record<EventType, EventFieldConfig> = {
  wedding: {
    step1Label: 'Couple',
    step1Description: 'Names & photo',
    primaryNameLabel: 'Bride / Partner 1',
    primaryNamePlaceholder: 'e.g. Priya',
    secondaryNameLabel: 'Groom / Partner 2',
    secondaryNamePlaceholder: 'e.g. Rahul',
    photoLabel: 'Couple Photo (Optional)',
    familyDetailsLabel: 'Family Details (Optional)',
    familyDetailsPlaceholder: 'e.g. Son of Mr. & Mrs. Sharma',
    dateLabel: 'Wedding Date',
    summaryConnector: '&',
  },
  birthday: {
    step1Label: 'Guest of Honor',
    step1Description: 'Name & photo',
    primaryNameLabel: 'Birthday Person',
    primaryNamePlaceholder: 'e.g. Aarav',
    secondaryNameLabel: 'Age / Tagline',
    secondaryNamePlaceholder: 'e.g. Turning 25',
    photoLabel: 'Photo (Optional)',
    familyDetailsLabel: 'Hosted By (Optional)',
    familyDetailsPlaceholder: 'e.g. Hosted by the Sharma Family',
    dateLabel: 'Party Date',
    summaryConnector: '·',
  },
  engagement: {
    step1Label: 'Couple',
    step1Description: 'Names & photo',
    primaryNameLabel: 'Partner 1',
    primaryNamePlaceholder: 'e.g. Ananya',
    secondaryNameLabel: 'Partner 2',
    secondaryNamePlaceholder: 'e.g. Vikram',
    photoLabel: 'Couple Photo (Optional)',
    familyDetailsLabel: 'Family Details (Optional)',
    familyDetailsPlaceholder: 'e.g. Daughter of Mr. & Mrs. Patel',
    dateLabel: 'Engagement Date',
    summaryConnector: '&',
  },
  'baby-shower': {
    step1Label: 'Parents',
    step1Description: 'Names & photo',
    primaryNameLabel: 'Parent / Host Name',
    primaryNamePlaceholder: 'e.g. Sarah & James',
    secondaryNameLabel: 'Baby Name / Theme',
    secondaryNamePlaceholder: 'e.g. Baby Shower',
    photoLabel: 'Photo (Optional)',
    familyDetailsLabel: 'Registry / Gift Note (Optional)',
    familyDetailsPlaceholder: 'e.g. Registry at Amazon',
    dateLabel: 'Shower Date',
    summaryConnector: '·',
  },
  housewarming: {
    step1Label: 'Hosts',
    step1Description: 'Names & photo',
    primaryNameLabel: 'Host Name(s)',
    primaryNamePlaceholder: 'e.g. The Mehta Family',
    secondaryNameLabel: 'Occasion Tagline',
    secondaryNamePlaceholder: 'e.g. Griha Pravesh',
    photoLabel: 'Home / Host Photo (Optional)',
    familyDetailsLabel: 'Address Note (Optional)',
    familyDetailsPlaceholder: 'e.g. Flat 402, Tower B',
    dateLabel: 'Event Date',
    summaryConnector: '·',
  },
  anniversary: {
    step1Label: 'Couple',
    step1Description: 'Names & photo',
    primaryNameLabel: 'Partner 1',
    primaryNamePlaceholder: 'e.g. Ravi',
    secondaryNameLabel: 'Partner 2',
    secondaryNamePlaceholder: 'e.g. Meera',
    photoLabel: 'Couple Photo (Optional)',
    familyDetailsLabel: 'Anniversary Milestone (Optional)',
    familyDetailsPlaceholder: 'e.g. Celebrating 25 Years Together',
    dateLabel: 'Celebration Date',
    summaryConnector: '&',
  },
  corporate: {
    step1Label: 'Event',
    step1Description: 'Title & company',
    primaryNameLabel: 'Event Title',
    primaryNamePlaceholder: 'e.g. Annual Tech Summit 2026',
    secondaryNameLabel: 'Company / Organizer',
    secondaryNamePlaceholder: 'e.g. Acme Corp',
    photoLabel: 'Logo / Banner (Optional)',
    familyDetailsLabel: 'Dress Code / Agenda Note (Optional)',
    familyDetailsPlaceholder: 'e.g. Business casual · Keynote at 10 AM',
    dateLabel: 'Event Date',
    summaryConnector: '·',
  },
};
