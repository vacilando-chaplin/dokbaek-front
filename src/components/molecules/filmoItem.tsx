import { filmoInputsTypes } from "@/types/types";
import Image from "next/image";

interface FilmoItemProps {
  filmo: filmoInputsTypes;
  onDelete: React.MouseEventHandler<HTMLButtonElement>;
}

const FilmoItem = ({ filmo, onDelete }: FilmoItemProps) => {
  const {
    classification,
    production,
    title,
    cast,
    casting,
    description,
    link,
    thumbnail,
    representive,
    id
  } = filmo;

  return (
    <div className="flex h-[154px] w-full gap-4 rounded-2xl border border-border-default-light p-5">
      <div className="flex flex-col gap-1">
        {/* edit */}
        <button className="h-auto w-auto rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none">
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
          onClick={onDelete}
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
      <div className="flex h-full w-full flex-col justify-between">
        <div className="flex h-auto w-full flex-col gap-1.5">
          <div className="flex h-auto w-full flex-col gap-1">
            <label className="text-caption1 font-medium leading-caption1 tracking-caption1 text-content-tertiary-light">
              {production}
            </label>
            <label className="text-body1 font-semibold leading-body1 tracking-body1 text-content-primary-light">
              {title}
            </label>
          </div>
          <div className="flex h-auto w-full flex-col gap-0.5 text-caption1 font-normal leading-caption1 tracking-caption1 text-content-secondary-light">
            <label>
              {cast} {casting && `'${casting}'`}
            </label>
            <label>{description}</label>
          </div>
        </div>
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
            fill="#ADB5BD"
          />
        </svg>
      </div>
      {thumbnail && (
        <Image
          src={thumbnail}
          alt={title}
          width={76}
          height={114}
          className="rounded-lg bg-gray-100"
        />
      )}
    </div>
  );
};

export default FilmoItem;
