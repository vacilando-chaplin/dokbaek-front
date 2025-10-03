export interface ProfileShowcaseResponseType {
  id?: number | null;
  handleId: string;
  status?: string | null;
  name?: string | null;
  bornYear?: number | null;
  height?: number | null;
  weight?: number | null;
  photoPreviewPaths?: string | null;
  mainPhotoPath?: string | null;
  mainPhotoPreviewPath?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  likesCount?: number | null;
  likedByMe?: boolean | null;
  viewCount?: number | null;
}
export interface ProfilesResponseType {
  content?: ProfileShowcaseResponseType[] | null;
  totalPages?: number | null;
  totalElements?: number | null;
  last?: boolean | null;
  size?: number | null;
  number?: number | null;
  sort?: any | null;
  first?: boolean | null;
  pageable?: any | null;
  empty?: boolean | null;
}
