import { ProfileInfoDataType } from "@/app/profile/[id]/create/types";
import { api } from "@/lib/axiosInstance";
import { EducationInitType } from "@/lib/types";

export const putInfoDraft = async (
  profileId: number,
  data: ProfileInfoDataType
) => {
  try {
    const res = await api.put(`/profile/${profileId}/draft/info`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

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
    const res = await api.post(`/profile/${profileId}/draft/specialty`, {
      specialtyId,
      mediaUrl
    });
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const postEducation = async (
  profileId: number,
  educationDto: EducationInitType
) => {
  try {
    const res = await api.post(
      `/profile/${profileId}/draft/education`,
      educationDto
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const putEducation = async (
  profileId: number,
  educationId: number,
  educationDto: EducationInitType
) => {
  try {
    const res = await api.put(
      `/profile/${profileId}/draft/education/${educationId}`,
      educationDto
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEducation = async (
  profileId: number,
  educationId: number
) => {
  try {
    const res = await api.delete(
      `/profile/${profileId}/draft/education/${educationId}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
