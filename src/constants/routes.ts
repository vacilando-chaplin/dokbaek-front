// 절대 경로 route
export const absoluteRoutePaths = {
  profile: (handleName: string) =>
    `${process.env.NEXT_PUBLIC_BASEURL}/@${handleName}`,
  profilePDF: (loginProfileId: number) =>
    `https://dokbaek.com/api/pdf/v1/profile/${loginProfileId}`
};

// 상대 경로 route
export const routePaths = {
  home: () => "/",
  login: () => "/login",
  likes: () => "/likes",
  profiles: () => "/profiles",
  account: () => "/account",

  accountWithdrawal: () => "/account/withdrawal",
  accountWithdrawalComplete: () => "/account/withdrawal/complete",

  profile: (handleName: string) => `/@${handleName}`,
  profileEditInfo: (handleName: string) => `/@${handleName}/edit/info`,
  profileEditPhoto: (handleName: string) => `/@${handleName}/edit/photo`,
  profileEditFilmo: (handleName: string) => `/@${handleName}/edit/filmo`,
  profileEditVideo: (handleName: string) => `/@${handleName}/edit/video`
};
