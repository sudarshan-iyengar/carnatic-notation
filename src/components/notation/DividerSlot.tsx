type DividerSlotProps = {
  char: string;
  widthClass: string;
  isSwaraOnly: boolean;
};

export const DividerSlot = ({ char, widthClass, isSwaraOnly }: DividerSlotProps) => (
  <div
    className={`${widthClass} flex justify-center items-center text-2xl font-light text-gray-400 ${
      isSwaraOnly ? '' : 'pb-6'
    } shrink-0 transition-all`}
  >
    {char}
  </div>
);
