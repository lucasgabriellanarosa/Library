export interface OpenLibraryEdition {
  cover_i?: number;
  key: string;
  title: string;
  title_suggest?: string;
}

export interface BookType {
  author_key?: string[];
  author_name?: string[];
  cover_i?: number;
  editions?: {
    numFound: number;
    docs: OpenLibraryEdition[];
  };
  first_publish_year?: number;
  key: string;
  ratings_average?: number;
  subject?: string[];
  title: string;
  title_suggest: string;
  

}