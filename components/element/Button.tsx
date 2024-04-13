const Button = (props: any) => {
  const { title, type, onConfirm, bgDelete, mob } = props;
  const cssBtn = `
    ${bgDelete ? 'bg-[#E53348] text-[#FFFFFF]' : 'bg-[#00371D] text-[#CCEE24]'}
    rounded-lg p-4 ${mob ? 'w-full' : 'w-auto'} md:py-2 md:px-4 text-center text-sm cursor-pointer md:w-auto`;
  const mlSize = "ml-4";
  return (
    <>
      {type || onConfirm ? (
        <button className={`${cssBtn} ${onConfirm && mlSize}`} type={type} onClick={onConfirm}>
          {title}
        </button>
      ) : (
        <div className={cssBtn}>
          {title}
        </div>
      )}
    </>
  );
}

export default Button;
