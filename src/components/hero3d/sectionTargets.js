// Single source of truth for every interactive object in the 3D desk scene.
// `position` doubles as both the mesh placement and the camera focus point.
export const OBJECTS = [
  {
    id: 'laptop',
    label: 'About',
    hint: 'Click to boot',
    kind: 'boot',
    position: [-0.55, 0.06, 0.35],
  },
  {
    id: 'books',
    label: 'Publications',
    hint: 'Open publications',
    kind: 'route',
    to: '/publications',
    position: [-1.5, 0.045, 0.25],
  },
  {
    id: 'monitor',
    label: 'Projects',
    hint: 'Open terminal',
    kind: 'terminal',
    position: [0.55, 0.35, -0.55],
  },
  {
    id: 'shelf',
    label: 'Achievements',
    hint: 'View achievements',
    kind: 'route',
    to: '/achievements',
    position: [0, 1.7, -0.95],
  },
  {
    id: 'plant',
    label: 'Research Interests',
    hint: 'See research interests',
    kind: 'anchor',
    to: 'research-interests',
    position: [1.55, 0.225, -0.35],
  },
  {
    id: 'notes',
    label: 'News & Updates',
    hint: 'See latest news',
    kind: 'anchor',
    to: 'news-updates',
    position: [0.95, 0.62, -0.42],
  },
  {
    id: 'mug',
    label: 'Contact',
    hint: 'Say hi',
    kind: 'mug',
    position: [1.15, 0.125, 0.5],
  },
  {
    id: 'github',
    label: 'GitHub',
    hint: 'Open GitHub',
    kind: 'external',
    href: 'https://github.com/thangdv509',
    position: [-1.0, 0.045, 0.68],
  },
  {
    id: 'scholar',
    label: 'Google Scholar',
    hint: 'Open Google Scholar',
    kind: 'external',
    href: 'https://scholar.google.com/citations?view_op=list_works&hl=en&hl=en&user=Oi6ma9wAAAAJ&sortby=pubdate',
    position: [-0.05, 0.045, 0.68],
  },
  {
    id: 'ticket',
    label: 'Travel',
    hint: 'View travel map',
    kind: 'route',
    to: '/travel',
    position: [0.2, 0.056, 0.15],
  },
];

export const getObject = (id) => OBJECTS.find((o) => o.id === id);
