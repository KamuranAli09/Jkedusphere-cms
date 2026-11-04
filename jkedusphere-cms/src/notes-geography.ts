import type { Subject } from './notes';
import { GEOIN1 } from './notes-geo-india-1';
import { GEOIN2 } from './notes-geo-india-2';
import { GEOIN3 } from './notes-geo-india-3';
import { GEOIN4 } from './notes-geo-india-4';
import { GEOIN5 } from './notes-geo-india-5';

export const GEOGRAPHY: Subject = {
  slug: 'geography-of-india',
  short: 'Geography of India',
  h1: 'Geography of India Notes',
  title: 'Geography of India: Complete Free Notes with Maps | JKEdusphere',
  description: 'Complete Geography of India notes with 27 maps: Himalayas, rivers, climate, soils, agriculture, minerals, industry, population and 120 MCQs for JKPSC, JKSSB and UPSC.',
  intro: 'A complete, exam-oriented course on the Geography of India for JKPSC, JKSSB, J&K Police, SSC and UPSC: physiography, drainage, climate, soils, vegetation, agriculture, resources, industry, transport, population and revision, with maps and practice questions.',
  published: '2026-11-03',
  updated: '2026-11-05',
  source: [GEOIN1, GEOIN2, GEOIN3, GEOIN4, GEOIN5].join('\n'),
};
