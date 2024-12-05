"use client";

import { FilmoResponseType } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";

interface FilmoItemProps {
  filmo: FilmoResponseType;
  filmoRepresentActive?: boolean;
  representativeCount?: number;
  canEdit: boolean;
  onEdit?: any;
  onDelete?: any;
  onCheck?: any;
  onLink?: any;
}

const FilmoItem = ({
  filmo,
  filmoRepresentActive,
  representativeCount,
  canEdit,
  onEdit,
  onDelete,
  onCheck,
  onLink
}: FilmoItemProps) => {
  const { id, role, customRole, character, is_featured, production } = filmo;

  const checkYoutube =
    (production.videoUrl &&
      production.videoUrl.includes("https://www.youtube.com")) ||
    production.videoUrl.includes("https://youtu.be/");

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (representativeCount && representativeCount >= 6) {
      if (is_featured) {
        setDisabled(false);
      }
      if (is_featured === false) {
        setDisabled(true);
      }
    } else {
      setDisabled(false);
    }
  }, [representativeCount]);

  return (
    <div className="flex h-[154px] w-full animate-enter gap-4 rounded-2xl border border-border-default-light p-5">
      {filmoRepresentActive && (
        <div className="flex gap-2">
          {/* checkbox */}
          <input
            type="checkbox"
            disabled={disabled}
            className={`absolute h-[18px] w-[18px] appearance-none rounded focus:outline-none ${!is_featured && "opacity-0"}`}
            onChange={() => onCheck(id)}
          />
          <div
            className={`flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded transition-all duration-100 ease-linear ${is_featured ? "bg-accent-primary-light" : "border-[1.5px] border-border-default-light bg-static-white"} ${disabled && "border-border-disabled-light bg-background-disabled-light"}`}
          >
            <svg
              className={`fill-current pointer-events-none h-[14px] w-[14px] ${!is_featured && "hidden"}`}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.2236 5.3098C22.6048 5.70945 22.5898 6.34244 22.1902 6.72362L8.86639 19.432L1.75865 11.5802C1.388 11.1708 1.41946 10.5384 1.8289 10.1677C2.23835 9.79709 2.87073 9.82854 3.24137 10.238L8.97146 16.568L20.8098 5.27638C21.2095 4.8952 21.8424 4.91016 22.2236 5.3098Z"
                fill="#ffffff"
              />
            </svg>
          </div>
          <label
            htmlFor="custom-checkbox"
            className={`select-none text-body2 font-regular leading-body2 tracking-body2 ${disabled ? "text-content-disabled-light" : "text-content-primary-light"}`}
          />
        </div>
      )}
      {!filmoRepresentActive && canEdit && (
        <div className="flex flex-col gap-1">
          {/* edit */}
          <button
            className="h-auto w-auto rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none"
            type="button"
            onClick={() => onEdit(filmo)}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.9142 1.99997C19.1332 1.21892 17.8668 1.21892 17.0858 1.99997L7.78167 11.3041C7.39841 11.6873 7.18712 12.2097 7.19616 12.7517L7.23096 14.8382C7.24895 15.9166 8.11887 16.7866 9.19733 16.8045L11.2838 16.8393C11.8258 16.8484 12.3482 16.6371 12.7314 16.2538L22.0355 6.94972C22.8166 6.16867 22.8166 4.90234 22.0355 4.12129L19.9142 1.99997ZM18.5 3.41418L20.6213 5.5355L11.3172 14.8396L9.23068 14.8048L9.19588 12.7183L18.5 3.41418Z"
                fill="#212529"
              />
              <path
                d="M4 4.99997C4 4.44769 4.44772 3.99997 5 3.99997H11C11.5523 3.99997 12 3.55226 12 2.99997C12 2.44769 11.5523 1.99997 11 1.99997H5C3.34315 1.99997 2 3.34312 2 4.99997V19C2 20.6568 3.34315 22 5 22H19C20.6569 22 22 20.6568 22 19V13C22 12.4477 21.5523 12 21 12C20.4477 12 20 12.4477 20 13V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V4.99997Z"
                fill="#212529"
              />
            </svg>
          </button>
          {/* delete */}
          <button
            className="h-auto w-auto rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none"
            type="button"
            onClick={() => onDelete(id)}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L12 10.5858L18.2929 4.29289C18.6834 3.90237 19.3166 3.90237 19.7071 4.29289C20.0976 4.68342 20.0976 5.31658 19.7071 5.70711L13.4142 12L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L12 13.4142L5.70711 19.7071C5.31658 20.0976 4.68342 20.0976 4.29289 19.7071C3.90237 19.3166 3.90237 18.6834 4.29289 18.2929L10.5858 12L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z"
                fill="#FB3E34"
              />
            </svg>
          </button>
        </div>
      )}
      <div className="flex h-full w-full flex-col justify-between">
        <div className="flex h-auto w-full flex-col gap-1.5">
          <div className="flex h-auto w-full flex-col gap-1">
            <label className="text-caption1 font-medium leading-caption1 tracking-caption1 text-content-tertiary-light">
              {production.productionYear >= 1
                ? `${production.productionYear + " | " + production.category.name}`
                : production.category.name}
            </label>
            <label className="text-body1 font-semibold leading-body1 tracking-body1 text-content-primary-light">
              {production.title}
            </label>
          </div>
          <div className="flex h-auto w-full flex-col gap-0.5 text-caption1 font-normal leading-caption1 tracking-caption1 text-content-secondary-light">
            <label>
              {customRole && role.id === 4 ? customRole : role.name}{" "}
              {character && `'${character}'`}
            </label>
            <label>{production.description}</label>
          </div>
        </div>
        {/* link */}
        {checkYoutube && (
          <button
            type="button"
            className="w-fit"
            onClick={() => onLink(production.videoUrl)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM10.53 16.0438L15.6432 12.848C16.2699 12.4563 16.2699 11.5437 15.6432 11.152L10.53 7.95625C9.86395 7.53997 9 8.01881 9 8.80425V15.1958C9 15.9812 9.86395 16.46 10.53 16.0438Z"
                fill={`${checkYoutube ? "#212529" : "#ADB5BD"}`}
              />
            </svg>
          </button>
        )}
      </div>
      <div className="flex min-h-[114px] min-w-[76px] items-center justify-center rounded-lg bg-gray-100">
        {production.thumbnailUrl ? (
          <Image
            src={production.thumbnailUrl}
            alt={production.title}
            width={76}
            height={114}
            className="h-[114px] w-[76px] rounded-lg bg-gray-100"
          />
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.8881 10.0862C14.9019 9.94892 14.9087 9.81164 14.9087 9.67435C14.9087 7.43197 13.9256 5 12.9425 5C11.9594 5 10.9763 5.93487 10 5.93487C9.01688 5.93487 8.03375 5 7.05063 5C6.0675 5 5.09125 7.38621 5.09125 9.67435C5.09125 9.81164 5.09125 9.94892 5.105 10.0862C6.71375 10.4327 8.35 10.6092 10 10.6027C11.6844 10.6027 13.3206 10.4262 14.8881 10.0862ZM4.12188 14.1787C7.9375 15.2705 12.035 15.277 15.8713 14.1787C16.16 14.0872 16.4144 13.9107 16.5931 13.6753C16.7719 13.44 16.875 13.1523 16.875 12.8647C16.875 12.5705 16.7788 12.2894 16.6069 12.0475C16.4281 11.8121 16.1875 11.6356 15.885 11.5375C14.0287 12.0998 12.0625 12.394 10 12.394C7.9375 12.394 5.96438 12.0998 4.10813 11.5375C3.8125 11.6356 3.57188 11.8187 3.39313 12.054C3.22125 12.2894 3.125 12.5705 3.125 12.8647C3.125 13.4792 3.54438 13.9957 4.12188 14.1787Z"
              fill="#ADB5BD"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default FilmoItem;
