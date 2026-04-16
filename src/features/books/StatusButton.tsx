import { FaCheckCircle, FaRegBookmark, FaBookmark, FaRegCheckCircle } from "react-icons/fa";

interface Props {
  bookStatus: 'Read' | 'To Read' | null;
  isUpdating: boolean;
  activeAction: 'Read' | 'To Read' | null;
  onUpdate: (type: 'Read' | 'To Read') => void;
}

export const StatusButton = ({ bookStatus, isUpdating, activeAction, onUpdate }: Props) => {
  
  const buttonConfigs = [
    {
      type: 'Read' as const,
      label: bookStatus === 'Read' ? 'Read' : 'Mark as Read',
      icon: bookStatus === 'Read' ? <FaCheckCircle /> : <FaRegCheckCircle /> ,
      activeClass: 'bg-emerald-600 text-white border-emerald-700',
    },
    {
      type: 'To Read' as const,
      label: bookStatus === 'To Read' ? 'To Read' : 'Read Later',
      icon: bookStatus === 'To Read' ? <FaBookmark /> : <FaRegBookmark /> ,
      activeClass: 'bg-orange-700 text-white border-orange-800',
    }
  ];
  return (
    <div className="flex flex-row gap-3 w-full">
      {buttonConfigs.map((btn) => (
        <button
          key={btn.type}
          disabled={isUpdating}
          onClick={() => onUpdate(btn.type)}
          className={`w-full py-2 font-bold rounded-md border shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 
            ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}
            ${bookStatus === btn.type 
              ? btn.activeClass 
              : 'bg-[#E9DCC0] text-[#8B5C14] border-[#D9C8A9] hover:bg-[#dcd0b3]'
            }`}
        >
          {isUpdating && activeAction === btn.type ? (
            <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
          ) : (
            btn.icon
          )}
          {btn.label}
        </button>
      ))}
    </div>
  );
};