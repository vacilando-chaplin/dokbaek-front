import { api } from "@/lib/axiosInstance";

// 커리어넷 학교 검색 api
export const getSchoolName = async (search: string) => {
  const univ_res = await fetch(
    `https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=${process.env.NEXT_PUBLIC_CAREERNET_API_KEY}&svcType=api&svcCode=SCHOOL&contentType=json&gubun=univ_list&perPage=10&searchSchulNm=${search}`
  );

  const high_res = await fetch(
    `https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=${process.env.NEXT_PUBLIC_CAREERNET_API_KEY}&svcType=api&svcCode=SCHOOL&contentType=json&gubun=high_list&perPage=10&searchSchulNm=${search}`
  );

  const univ_list_data = await univ_res.json();
  const high_list_data = await high_res.json();

  const data = univ_list_data.dataSearch.content.concat(
    high_list_data.dataSearch.content
  );

  return await data;
};

export const putInfoDraft = async (id: number, data: any) => {
  try {
    const res = await api.put(`/profile/${id}/draft/info`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecialty = async (
  keyword: string,
  page: number,
  size: number
) => {
  try {
    const res = await api.get(
      `/specialty?keyword=${keyword}&page=${page}&size=${size}`
    );
    return res.data.data.content;
  } catch (error) {
    throw error;
  }
};

export const postSpecialty = async (specialtyName: string) => {
  try {
    const res = await api.post(`/specialty`, { specialtyName });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const postUserProfileSpecialty = async (
  profileId: number,
  specialtyId: number,
  mediaUrl: string
) => {
  try {
    const res = await api.post(`/profile/${profileId}/specialty`, {
      specialtyId,
      mediaUrl
    });
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
