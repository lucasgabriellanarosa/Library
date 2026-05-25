export interface AuthorDataType {
  name: string
  fuller_name?: string
  birth_date?: string
  photos?: number[]
  bio?: string | {
    value: string
  }
}