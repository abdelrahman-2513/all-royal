export interface SubLink {
  title: string;
  subLinks: string[];
}

export interface Links {
  [key: string]: SubLink[];
}
