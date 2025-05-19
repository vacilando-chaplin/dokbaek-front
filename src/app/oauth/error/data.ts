const loginErrorMessages: Record<string, { title: string; message: string }> = {
  "1000": {
    title: "내부 오류",
    message: "서버에서 인증 처리 중 문제가 발생했습니다. 다시 시도해 주세요."
  },
  "1001": {
    title: "인증 취소됨",
    message: "사용자가 인증을 취소했습니다."
  },
  "1002": {
    title: "잘못된 요청",
    message: "요청 정보가 잘못되었습니다."
  },
  "1003": {
    title: "인증 실패",
    message:
      "세션이 만료되었거나 인증 정보가 유효하지 않습니다. 다시 로그인해 주세요."
  },
  "1004": {
    title: "접근 권한 없음",
    message: "해당 리소스에 접근할 수 없습니다. 권한을 확인하세요."
  },
  "9999": {
    title: "외부 서비스 오류",
    message:
      "OAuth 제공자 쪽에서 문제가 발생했습니다. 잠시 후 다시 시도해 주세요."
  }
};
