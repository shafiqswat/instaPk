/** @format */

export const HomeIcon = ({ className }) => {
  return (
    <svg
      aria-label='Home'
      className={`h-6 w-6 ${className}`}
      fill='currentColor'
      role='img'
      viewBox='0 0 24 24'>
      <path d='M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z'></path>
    </svg>
  );
};

export const unActiveHome = () => (
  <svg
    aria-label='Home'
    className='x1lliihq x1n2onr6 x5n08af'
    fill='currentColor'
    height='24'
    role='img'
    viewBox='0 0 24 24'
    width='24'>
    <title>Home</title>
    <path
      d='M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z'
      fill='none'
      stroke='currentColor'
      strokeLinejoin='round'
      strokeWidth='2'></path>
  </svg>
);
export const SearchIcon = ({ className }) => {
  return (
    <svg
      aria-label='Search'
      className={`${className}`}
      fill='currentColor'
      role='img'
      viewBox='0 0 24 24'>
      <path
        d='M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'></path>
      <line
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        x1='16.511'
        x2='22'
        y1='16.511'
        y2='22'></line>
    </svg>
  );
};
export const ExploreIcon = () => {
  return (
    <svg
      aria-label='Explore'
      className='w-6 h-6'
      fill='currentColor'
      role='img'
      viewBox='0 0 24 24'>
      <polygon
        fill='none'
        points='13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'></polygon>
      <polygon
        fillRule='evenodd'
        points='10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056'></polygon>
      <circle
        cx='12.001'
        cy='12.005'
        fill='none'
        r='10.5'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'></circle>
    </svg>
  );
};

export const ReelsIcon = ({ className }) => {
  return (
    <svg
      aria-label='Reels'
      className={`${className}`}
      fill='currentColor'
      role='img'
      viewBox='0 0 24 24'>
      <line
        fill='none'
        stroke='currentColor'
        strokeLinejoin='round'
        strokeWidth='2'
        x1='2.049'
        x2='21.95'
        y1='7.002'
        y2='7.002'></line>
      <line
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        x1='13.504'
        x2='16.362'
        y1='2.001'
        y2='7.002'></line>
      <line
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        x1='7.207'
        x2='10.002'
        y1='2.11'
        y2='7.002'></line>
      <path
        d='M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'></path>
      <path
        d='M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z'
        fillRule='evenodd'></path>
    </svg>
  );
};

export const MessengerIcon = ({ onClick, className }) => {
  return (
    <svg
      aria-label='Messenger'
      className={`w-6 h-6 ${className}`}
      fill='currentColor'
      role='img'
      viewBox='0 0 24 24'
      onClick={onClick}>
      <path
        d='M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z'
        fill='none'
        stroke='currentColor'
        strokeMiterlimit='10'
        strokeWidth='1.739'></path>
      <path
        d='M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z'
        fillRule='evenodd'></path>
    </svg>
  );
};

export const HurtIcon = ({ fill, onClick }) => {
  return (
    <svg
      aria-label={fill ? "Unlike" : "Like"}
      className={`w-6 h-6 fill-current cursor-pointer   ${
        fill ? "text-red-500" : "hover:text-gray-400"
      }`}
      role='img'
      viewBox={fill ? "0 0 48 48" : "0 0 24 24"}
      onClick={onClick}>
      <title>{fill ? "Unlike" : "Like"}</title>
      {fill ? (
        <path d='M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z'></path>
      ) : (
        <path d='M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z'></path>
      )}
    </svg>
  );
};

export const CreateIcon = () => {
  return (
    <svg
      aria-label='New post'
      className='w-6 h-6'
      fill='currentColor'
      role='img'
      viewBox='0 0 24 24'>
      <path
        d='M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'></path>
      <line
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        x1='6.545'
        x2='17.455'
        y1='12.001'
        y2='12.001'></line>
      <line
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        x1='12.003'
        x2='12.003'
        y1='6.545'
        y2='17.455'></line>
    </svg>
  );
};

export const MoreIcon = () => {
  return (
    <svg
      aria-label='Settings'
      className='w-6 h-6'
      fill='currentColor'
      height='24'
      role='img'
      viewBox='0 0 24 24'
      width='24'>
      <title>Settings</title>
      <line
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        x1='3'
        x2='21'
        y1='4'
        y2='4'></line>
      <line
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        x1='3'
        x2='21'
        y1='12'
        y2='12'></line>
      <line
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        x1='3'
        x2='21'
        y1='20'
        y2='20'></line>
    </svg>
  );
};

export const InstagramIcon = () => {
  return (
    <svg
      aria-label='Instagram'
      className='w-6 h-6'
      fill='currentColor'
      role='img'
      viewBox='0 0 24 24'>
      <path d='M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.043-.379 3.408 3.408 0 0 1-1.264-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1Zm0 5.351A5.649 5.649 0 1 0 17.649 12 5.649 5.649 0 0 0 12 6.351Zm0 9.316A3.667 3.667 0 1 1 15.667 12 3.667 3.667 0 0 1 12 15.667Zm5.872-10.859a1.32 1.32 0 1 0 1.32 1.32 1.32 1.32 0 0 0-1.32-1.32Z'></path>
    </svg>
  );
};
export const HashIcon = ({ className }) => {
  return (
    <svg
      aria-label='Hashtag'
      className={className}
      fill='currentColor'
      role='img'
      viewBox='0 0 24 24'>
      <line
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        x1='4.728'
        x2='20.635'
        y1='7.915'
        y2='7.915'></line>
      <line
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        x1='3.364'
        x2='19.272'
        y1='15.186'
        y2='15.186'></line>
      <line
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        x1='17.009'
        x2='13.368'
        y1='2'
        y2='22'></line>
      <line
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        x1='10.64'
        x2='7'
        y1='2'
        y2='22'></line>
    </svg>
  );
};

export const CrossIcon = ({ className, onClick }) => {
  return (
    <svg
      aria-label='Close'
      className={`${className} w-[16px] h-[16px] fill-current`}
      onClick={onClick}
      fill='currentColor'
      role='img'
      viewBox='0 0 24 24'>
      <title>Close</title>
      <polyline
        fill='none'
        points='20.643 3.357 12 12 3.353 20.647'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='3'></polyline>
      <line
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='3'
        x1='20.649'
        x2='3.354'
        y1='20.649'
        y2='3.354'></line>
    </svg>
  );
};

export const ThreeDotsIcon = ({
  onClick,
  direction = "horizontal",
  className,
}) => {
  const isVertical = direction === "vertical";

  return (
    <svg
      aria-label='More options'
      className={`cursor-pointer ${className}`}
      fill='currentColor'
      height='24'
      role='img'
      viewBox='0 0 24 24'
      width='24'
      onClick={onClick}>
      <title>More options</title>
      {isVertical ? (
        // Vertical dots
        <>
          <circle
            cx='12'
            cy='6'
            r='1.5'></circle>
          <circle
            cx='12'
            cy='12'
            r='1.5'></circle>
          <circle
            cx='12'
            cy='18'
            r='1.5'></circle>
        </>
      ) : (
        <>
          <circle
            cx='6'
            cy='12'
            r='1.5'></circle>
          <circle
            cx='12'
            cy='12'
            r='1.5'></circle>
          <circle
            cx='18'
            cy='12'
            r='1.5'></circle>
        </>
      )}
    </svg>
  );
};

export const CommentsIcon = ({ className, onClick }) => {
  return (
    <svg
      aria-label='Comment'
      fill='currentColor'
      onClick={onClick}
      className={`cursor-pointer ${className}`}
      height='24'
      role='img'
      viewBox='0 0 24 24'
      width='24'>
      <title>Comment</title>
      <path
        d='M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z'
        fill='none'
        stroke='currentColor'
        strokeLinejoin='round'
        strokeWidth='2'></path>
    </svg>
  );
};

export const ShareIcon = ({ className, onClick }) => {
  return (
    <svg
      aria-label='Share'
      fill='currentColor'
      className={`cursor-pointer ${className}`}
      onClick={onClick}
      height='24'
      role='img'
      viewBox='0 0 24 24'
      width='24'>
      <title>Share</title>
      <line
        fill='none'
        stroke='currentColor'
        strokeLinejoin='round'
        strokeWidth='2'
        x1='22'
        x2='9.218'
        y1='3'
        y2='10.083'></line>
      <polygon
        fill='none'
        points='11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334'
        stroke='currentColor'
        strokeLinejoin='round'
        strokeWidth='2'></polygon>
    </svg>
  );
};

export const FavoriteIcon = ({ fill, className, onClick }) => {
  return (
    <svg
      aria-label='Save'
      className={`cursor-pointer ${className}`}
      fill='currentColor'
      height='24'
      role='img'
      viewBox='0 0 24 24'
      width='24'
      onClick={onClick}>
      <title>Save</title>
      {fill ? (
        <path d='M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z'></path>
      ) : (
        <polygon
          fill='none'
          points='20 21 12 13.44 4 21 4 3 20 3 20 21'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'></polygon>
      )}
    </svg>
  );
};
export const EmojiPickerIcon = ({ className }) => {
  return (
    <svg
      aria-label='Emoji'
      className={`${className} hover:text-gray-400`}
      fill='currentColor'
      height='13'
      role='img'
      viewBox='0 0 24 24'
      width='13'>
      <title>Emoji</title>
      <path d='M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z'></path>
    </svg>
  );
};

export const VerifyIcon = () => {
  return (
    <svg
      aria-label='Verified'
      className='x1lliihq x1n2onr6'
      fill='rgb(0, 149, 246)'
      height='12'
      role='img'
      viewBox='0 0 40 40'
      width='12'>
      <title>Verified</title>
      <path
        d='M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z'
        fillRule='evenodd'></path>
    </svg>
  );
};

export const StarIcon = () => {
  return (
    <svg
      aria-label='Favorited'
      fill='url(#favorite_icon_gradient)'
      height='16'
      role='img'
      viewBox='0 0 24 24'
      width='16'>
      <defs>
        <linearGradient
          gradientUnits='userSpaceOnUse'
          id='favorite_icon_gradient'
          x1='11.0831'
          x2='20.5113'
          y1='20.7141'
          y2='4.71407'>
          <stop stopColor='#FDCB5C'></stop>
          <stop
            offset='1'
            stopColor='#D10869'></stop>
        </linearGradient>
      </defs>
      <path d='M18.18 22.51a.99.99 0 01-.513-.142L12 18.975l-5.667 3.393a1 1 0 01-1.492-1.062l1.37-6.544-4.876-4.347a.999.999 0 01.536-1.737l6.554-.855 2.668-5.755a1 1 0 011.814 0l2.668 5.755 6.554.855a.999.999 0 01.536 1.737l-4.876 4.347 1.37 6.544a1 1 0 01-.978 1.205z'></path>
    </svg>
  );
};

export const CopyIcon = ({ className }) => {
  return (
    <svg
      aria-label='Copy link'
      className={className}
      fill='currentColor'
      height='20'
      role='img'
      viewBox='0 0 24 24'
      width='20'>
      <title>Copy link</title>
      <path
        d='m9.726 5.123 1.228-1.228a6.47 6.47 0 0 1 9.15 9.152l-1.227 1.227m-4.603 4.603-1.228 1.228a6.47 6.47 0 0 1-9.15-9.152l1.227-1.227'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'></path>
      <line
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        x1='8.471'
        x2='15.529'
        y1='15.529'
        y2='8.471'></line>
    </svg>
  );
};

export const WhatsappIcon = () => {
  return (
    <svg
      aria-label='WhatsApp'
      className=''
      fill='currentColor'
      height='20'
      role='img'
      viewBox='0 0 31 31'
      width='20'>
      <title>WhatsApp</title>
      <path
        clipRule='evenodd'
        d='M15.662.263A15.166 15.166 0 0 1 26.06 4.48a15.048 15.048 0 0 1 4.653 10.381 15.164 15.164 0 0 1-3.77 10.568 15.063 15.063 0 0 1-11.37 5.138c-2.273 0-4.526-.513-6.567-1.495l-7.93 1.764a.116.116 0 0 1-.138-.13l1.34-8.019a15.181 15.181 0 0 1-1.85-6.837A15.052 15.052 0 0 1 4.555 5.012 15.061 15.061 0 0 1 15.586.263h.075Zm-.085 2.629c-.12 0-.242.002-.364.005-6.902.198-12.356 5.975-12.158 12.877.06 2.107.654 4.176 1.717 5.982l.231.392-.993 5.441 5.385-1.271.407.212a12.527 12.527 0 0 0 6.13 1.402c6.901-.198 12.356-5.974 12.158-12.876-.195-6.78-5.773-12.164-12.513-12.164ZM10.34 8.095c.253.008.507.015.728.032.271.019.57.04.836.683.315.763.996 2.668 1.085 2.86.09.194.146.418.011.668-.134.25-.203.407-.4.623-.196.216-.414.484-.59.649-.197.184-.4.384-.19.771.21.388.934 1.657 2.033 2.7 1.413 1.34 2.546 1.783 2.996 1.993a.998.998 0 0 0 .415.112c.162 0 .292-.068.415-.193.237-.24.95-1.071 1.25-1.454.156-.2.299-.271.453-.271.123 0 .255.045.408.107.345.137 2.185 1.115 2.56 1.317.374.202.625.305.715.466.09.162.066.924-.278 1.803-.344.878-1.922 1.688-2.621 1.73-.205.012-.406.04-.668.04-.634 0-1.621-.166-3.865-1.133-3.817-1.643-6.136-5.683-6.318-5.942-.182-.26-1.489-2.111-1.432-3.983C7.94 9.8 8.951 8.91 9.311 8.54c.345-.355.74-.445.996-.445h.032Z'
        fill='currentColor'
        fillRule='evenodd'></path>
    </svg>
  );
};

export const EmailIcon = () => {
  return (
    <svg
      aria-label='Email'
      className='x1lliihq x1n2onr6 x5n08af'
      fill='currentColor'
      height='20'
      role='img'
      viewBox='0 0 24 24'
      width='20'>
      <title>Email</title>
      <rect
        fill='none'
        height='17.273'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        width='20'
        x='2'
        y='3.364'></rect>
      <polyline
        fill='none'
        points='2 7.155 12.002 13.81 22 7.157'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'></polyline>
    </svg>
  );
};

export const ThreadsIcon = () => {
  return (
    <svg
      aria-label='Threads'
      className=''
      fill='currentColor'
      height='20'
      role='img'
      viewBox='0 0 192 192'
      width='20'>
      <title>Threads</title>
      <path d='M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z'></path>
    </svg>
  );
};

export const XIcon = () => {
  return (
    <svg
      data-name='Icons'
      viewBox='0 0 24 24'
      width='1em'
      height='1em'
      fill='currentColor'
      className='x1qx5ct2 xw4jnvo'
      color='rgb(var(--ig-primary-text))'>
      <path d='m21.8 20.4-7.28-9.706 6.323-7.025a1 1 0 0 0-1.487-1.338l-6.058 6.733L8.3 2.4a.999.999 0 0 0-.8-.4H3a1 1 0 0 0-.8 1.6l7.28 9.706-6.323 7.025a1 1 0 0 0 1.487 1.338l6.058-6.733L15.7 21.6c.189.252.486.4.8.4H21a1 1 0 0 0 .8-1.6zM17 20 5 4h2l12 16h-2z'></path>
    </svg>
  );
};
export const OptionIcon = () => {
  return (
    <svg
      aria-label='Options'
      className=''
      fill='currentColor'
      height='24'
      role='img'
      viewBox='0 0 24 24'
      width='24'>
      <title>Options</title>
      <circle
        cx='12'
        cy='12'
        fill='none'
        r='8.635'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'></circle>
      <path
        d='M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096'
        fill='none'
        stroke='currentColor'
        strokeLinejoin='round'
        strokeWidth='2'></path>
    </svg>
  );
};
export const InstagramLogo = ({ onClick }) => {
  return (
    <svg
      aria-label='Instagram'
      className='cursor-pointer'
      fill='currentColor'
      height='29'
      role='img'
      viewBox='32 4 113 32'
      width='103'
      onClick={onClick}>
      <title>Instagram</title>
      <path
        clipRule='evenodd'
        d='M37.82 4.11c-2.32.97-4.86 3.7-5.66 7.13-1.02 4.34 3.21 6.17 3.56 5.57.4-.7-.76-.94-1-3.2-.3-2.9 1.05-6.16 2.75-7.58.32-.27.3.1.3.78l-.06 14.46c0 3.1-.13 4.07-.36 5.04-.23.98-.6 1.64-.33 1.9.32.28 1.68-.4 2.46-1.5a8.13 8.13 0 0 0 1.33-4.58c.07-2.06.06-5.33.07-7.19 0-1.7.03-6.71-.03-9.72-.02-.74-2.07-1.51-3.03-1.1Zm82.13 14.48a9.42 9.42 0 0 1-.88 3.75c-.85 1.72-2.63 2.25-3.39-.22-.4-1.34-.43-3.59-.13-5.47.3-1.9 1.14-3.35 2.53-3.22 1.38.13 2.02 1.9 1.87 5.16ZM96.8 28.57c-.02 2.67-.44 5.01-1.34 5.7-1.29.96-3 .23-2.65-1.72.31-1.72 1.8-3.48 4-5.64l-.01 1.66Zm-.35-10a10.56 10.56 0 0 1-.88 3.77c-.85 1.72-2.64 2.25-3.39-.22-.5-1.69-.38-3.87-.13-5.25.33-1.78 1.12-3.44 2.53-3.44 1.38 0 2.06 1.5 1.87 5.14Zm-13.41-.02a9.54 9.54 0 0 1-.87 3.8c-.88 1.7-2.63 2.24-3.4-.23-.55-1.77-.36-4.2-.13-5.5.34-1.95 1.2-3.32 2.53-3.2 1.38.14 2.04 1.9 1.87 5.13Zm61.45 1.81c-.33 0-.49.35-.61.93-.44 2.02-.9 2.48-1.5 2.48-.66 0-1.26-1-1.42-3-.12-1.58-.1-4.48.06-7.37.03-.59-.14-1.17-1.73-1.75-.68-.25-1.68-.62-2.17.58a29.65 29.65 0 0 0-2.08 7.14c0 .06-.08.07-.1-.06-.07-.87-.26-2.46-.28-5.79 0-.65-.14-1.2-.86-1.65-.47-.3-1.88-.81-2.4-.2-.43.5-.94 1.87-1.47 3.48l-.74 2.2.01-4.88c0-.5-.34-.67-.45-.7a9.54 9.54 0 0 0-1.8-.37c-.48 0-.6.27-.6.67 0 .05-.08 4.65-.08 7.87v.46c-.27 1.48-1.14 3.49-2.09 3.49s-1.4-.84-1.4-4.68c0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81-.01-.5-.87-.75-1.27-.85-.4-.09-.76-.13-1.03-.11-.4.02-.67.27-.67.62v.55a3.71 3.71 0 0 0-1.83-1.49c-1.44-.43-2.94-.05-4.07 1.53a9.31 9.31 0 0 0-1.66 4.73c-.16 1.5-.1 3.01.17 4.3-.33 1.44-.96 2.04-1.64 2.04-.99 0-1.7-1.62-1.62-4.4.06-1.84.42-3.13.82-4.99.17-.8.04-1.2-.31-1.6-.32-.37-1-.56-1.99-.33-.7.16-1.7.34-2.6.47 0 0 .05-.21.1-.6.23-2.03-1.98-1.87-2.69-1.22-.42.39-.7.84-.82 1.67-.17 1.3.9 1.91.9 1.91a22.22 22.22 0 0 1-3.4 7.23v-.7c-.01-3.36.03-6 .05-6.95.02-.94.06-1.63.06-1.8 0-.36-.22-.5-.66-.67-.4-.16-.86-.26-1.34-.3-.6-.05-.97.27-.96.65v.52a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.94-.05-4.07 1.53a10.1 10.1 0 0 0-1.66 4.72c-.15 1.57-.13 2.9.09 4.04-.23 1.13-.89 2.3-1.63 2.3-.95 0-1.5-.83-1.5-4.67 0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81 0-.5-.87-.75-1.27-.85-.42-.1-.79-.13-1.06-.1-.37.02-.63.35-.63.6v.56a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.93-.04-4.07 1.53-.75 1.03-1.35 2.17-1.66 4.7a15.8 15.8 0 0 0-.12 2.04c-.3 1.81-1.61 3.9-2.68 3.9-.63 0-1.23-1.21-1.23-3.8 0-3.45.22-8.36.25-8.83l1.62-.03c.68 0 1.29.01 2.19-.04.45-.02.88-1.64.42-1.84-.21-.09-1.7-.17-2.3-.18-.5-.01-1.88-.11-1.88-.11s.13-3.26.16-3.6c.02-.3-.35-.44-.57-.53a7.77 7.77 0 0 0-1.53-.44c-.76-.15-1.1 0-1.17.64-.1.97-.15 3.82-.15 3.82-.56 0-2.47-.11-3.02-.11-.52 0-1.08 2.22-.36 2.25l3.2.09-.03 6.53v.47c-.53 2.73-2.37 4.2-2.37 4.2.4-1.8-.42-3.15-1.87-4.3-.54-.42-1.6-1.22-2.79-2.1 0 0 .69-.68 1.3-2.04.43-.96.45-2.06-.61-2.3-1.75-.41-3.2.87-3.63 2.25a2.61 2.61 0 0 0 .5 2.66l.15.19c-.4.76-.94 1.78-1.4 2.58-1.27 2.2-2.24 3.95-2.97 3.95-.58 0-.57-1.77-.57-3.43 0-1.43.1-3.58.19-5.8.03-.74-.34-1.16-.96-1.54a4.33 4.33 0 0 0-1.64-.69c-.7 0-2.7.1-4.6 5.57-.23.69-.7 1.94-.7 1.94l.04-6.57c0-.16-.08-.3-.27-.4a4.68 4.68 0 0 0-1.93-.54c-.36 0-.54.17-.54.5l-.07 10.3c0 .78.02 1.69.1 2.09.08.4.2.72.36.91.15.2.33.34.62.4.28.06 1.78.25 1.86-.32.1-.69.1-1.43.89-4.2 1.22-4.31 2.82-6.42 3.58-7.16.13-.14.28-.14.27.07l-.22 5.32c-.2 5.37.78 6.36 2.17 6.36 1.07 0 2.58-1.06 4.2-3.74l2.7-4.5 1.58 1.46c1.28 1.2 1.7 2.36 1.42 3.45-.21.83-1.02 1.7-2.44.86-.42-.25-.6-.44-1.01-.71-.23-.15-.57-.2-.78-.04-.53.4-.84.92-1.01 1.55-.17.61.45.94 1.09 1.22.55.25 1.74.47 2.5.5 2.94.1 5.3-1.42 6.94-5.34.3 3.38 1.55 5.3 3.72 5.3 1.45 0 2.91-1.88 3.55-3.72.18.75.45 1.4.8 1.96 1.68 2.65 4.93 2.07 6.56-.18.5-.69.58-.94.58-.94a3.07 3.07 0 0 0 2.94 2.87c1.1 0 2.23-.52 3.03-2.31.09.2.2.38.3.56 1.68 2.65 4.93 2.07 6.56-.18l.2-.28.05 1.4-1.5 1.37c-2.52 2.3-4.44 4.05-4.58 6.09-.18 2.6 1.93 3.56 3.53 3.69a4.5 4.5 0 0 0 4.04-2.11c.78-1.15 1.3-3.63 1.26-6.08l-.06-3.56a28.55 28.55 0 0 0 5.42-9.44s.93.01 1.92-.05c.32-.02.41.04.35.27-.07.28-1.25 4.84-.17 7.88.74 2.08 2.4 2.75 3.4 2.75 1.15 0 2.26-.87 2.85-2.17l.23.42c1.68 2.65 4.92 2.07 6.56-.18.37-.5.58-.94.58-.94.36 2.2 2.07 2.88 3.05 2.88 1.02 0 2-.42 2.78-2.28.03.82.08 1.49.16 1.7.05.13.34.3.56.37.93.34 1.88.18 2.24.11.24-.05.43-.25.46-.75.07-1.33.03-3.56.43-5.21.67-2.79 1.3-3.87 1.6-4.4.17-.3.36-.35.37-.03.01.64.04 2.52.3 5.05.2 1.86.46 2.96.65 3.3.57 1 1.27 1.05 1.83 1.05.36 0 1.12-.1 1.05-.73-.03-.31.02-2.22.7-4.96.43-1.79 1.15-3.4 1.41-4 .1-.21.15-.04.15 0-.06 1.22-.18 5.25.32 7.46.68 2.98 2.65 3.32 3.34 3.32 1.47 0 2.67-1.12 3.07-4.05.1-.7-.05-1.25-.48-1.25Z'
        fill='currentColor'
        fillRule='evenodd'></path>
    </svg>
  );
};
export const ResetPasswordIcon = () => {
  return (
    <svg
      aria-label='Trouble logging in?'
      className='x1lliihq x1n2onr6 x5n08af'
      fill='currentColor'
      height='96'
      role='img'
      viewBox='0 0 96 96'
      width='96'>
      <title>Trouble logging in?</title>
      <circle
        cx='48'
        cy='48'
        fill='none'
        r='47'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'></circle>
      <path
        d='M60.931 70.001H35.065a5.036 5.036 0 0 1-5.068-5.004V46.005A5.036 5.036 0 0 1 35.065 41H60.93a5.035 5.035 0 0 1 5.066 5.004v18.992A5.035 5.035 0 0 1 60.93 70ZM37.999 39.996v-6.998a10 10 0 0 1 20 0v6.998'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'></path>
    </svg>
  );
};
export const CreatePostIcon = () => (
  <svg
    aria-label='Post'
    className='x1lliihq x1n2onr6 x5n08af'
    fill='currentColor'
    height='24'
    role='img'
    viewBox='0 0 24 24'
    width='24'>
    <title>Post</title>
    <path d='m18.509 14.757-4.285-2.474a.857.857 0 0 0-1.286.743v4.948a.857.857 0 0 0 1.286.742l4.285-2.474a.857.857 0 0 0 0-1.485ZM5.225 3.977a1.25 1.25 0 1 0 1.25 1.25 1.25 1.25 0 0 0-1.25-1.25ZM19.5 7.5h-3v-3a4.004 4.004 0 0 0-4-4h-8a4.004 4.004 0 0 0-4 4v8a4.004 4.004 0 0 0 4 4h3v3a4.004 4.004 0 0 0 4 4h8a4.004 4.004 0 0 0 4-4v-8a4.004 4.004 0 0 0-4-4Zm-12 7h-3a1.997 1.997 0 0 1-1.882-1.349l2.607-2.607L7.5 12.819Zm.23-4.28L6.41 8.9a1.679 1.679 0 0 0-2.37 0L2.5 10.44V4.5a2.003 2.003 0 0 1 2-2h8a2.003 2.003 0 0 1 2 2v3h-3a3.992 3.992 0 0 0-3.77 2.72ZM21.5 19.5a2.003 2.003 0 0 1-2 2h-8a2.003 2.003 0 0 1-2-2v-8a2.003 2.003 0 0 1 2-2h8a2.003 2.003 0 0 1 2 2Z'></path>
  </svg>
);

export const MediaIcon = () => {
  return (
    <svg
      aria-label='Icon to represent media such as images or videos'
      className='x1lliihq x1n2onr6 x5n08af'
      fill='currentColor'
      height='77'
      role='img'
      viewBox='0 0 97.6 77.3'
      width='96'>
      <title>Icon to represent media such as images or videos</title>
      <path
        d='M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z'
        fill='currentColor'></path>
      <path
        d='M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z'
        fill='currentColor'></path>
      <path
        d='M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z'
        fill='currentColor'></path>
    </svg>
  );
};

export const OpenGalleryIcon = ({ className }) => {
  return (
    <svg
      aria-label='Open media gallery'
      className={`text-white ${className}`}
      fill='currentColor'
      height='16'
      role='img'
      viewBox='0 0 24 24'
      width='16'>
      <title>Open media gallery</title>
      <path
        d='M19 15V5a4.004 4.004 0 0 0-4-4H5a4.004 4.004 0 0 0-4 4v10a4.004 4.004 0 0 0 4 4h10a4.004 4.004 0 0 0 4-4ZM3 15V5a2.002 2.002 0 0 1 2-2h10a2.002 2.002 0 0 1 2 2v10a2.002 2.002 0 0 1-2 2H5a2.002 2.002 0 0 1-2-2Zm18.862-8.773A.501.501 0 0 0 21 6.57v8.431a6 6 0 0 1-6 6H6.58a.504.504 0 0 0-.35.863A3.944 3.944 0 0 0 9 23h6a8 8 0 0 0 8-8V9a3.95 3.95 0 0 0-1.138-2.773Z'
        fillRule='evenodd'></path>
    </svg>
  );
};
export const ChatMessageIcon = () => {
  return (
    <svg
      aria-label=''
      className='x1lliihq x1n2onr6 x5n08af'
      fill='currentColor'
      height='96'
      role='img'
      viewBox='0 0 96 96'
      width='96'>
      <title></title>
      <path d='M48 0C21.532 0 0 21.533 0 48s21.532 48 48 48 48-21.532 48-48S74.468 0 48 0Zm0 94C22.636 94 2 73.364 2 48S22.636 2 48 2s46 20.636 46 46-20.636 46-46 46Zm12.227-53.284-7.257 5.507c-.49.37-1.166.375-1.661.005l-5.373-4.031a3.453 3.453 0 0 0-4.989.921l-6.756 10.718c-.653 1.027.615 2.189 1.582 1.453l7.257-5.507a1.382 1.382 0 0 1 1.661-.005l5.373 4.031a3.453 3.453 0 0 0 4.989-.92l6.756-10.719c.653-1.027-.615-2.189-1.582-1.453ZM48 25c-12.958 0-23 9.492-23 22.31 0 6.706 2.749 12.5 7.224 16.503.375.338.602.806.62 1.31l.125 4.091a1.845 1.845 0 0 0 2.582 1.629l4.563-2.013a1.844 1.844 0 0 1 1.227-.093c2.096.579 4.331.884 6.659.884 12.958 0 23-9.491 23-22.31S60.958 25 48 25Zm0 42.621c-2.114 0-4.175-.273-6.133-.813a3.834 3.834 0 0 0-2.56.192l-4.346 1.917-.118-3.867a3.833 3.833 0 0 0-1.286-2.727C29.33 58.54 27 53.209 27 47.31 27 35.73 36.028 27 48 27s21 8.73 21 20.31-9.028 20.31-21 20.31Z'></path>
    </svg>
  );
};
export const ChatGallery = () => {
  return (
    <svg
      aria-label='Add Photo or Video'
      className='x1lliihq x1n2onr6 x5n08af cursor-pointer hover:text-gray-400'
      fill='currentColor'
      height='24'
      role='img'
      viewBox='0 0 24 24'
      width='24'>
      <title>Add Photo or Video</title>
      <path
        d='M6.549 5.013A1.557 1.557 0 1 0 8.106 6.57a1.557 1.557 0 0 0-1.557-1.557Z'
        fillRule='evenodd'></path>
      <path
        d='m2 18.605 3.901-3.9a.908.908 0 0 1 1.284 0l2.807 2.806a.908.908 0 0 0 1.283 0l5.534-5.534a.908.908 0 0 1 1.283 0l3.905 3.905'
        fill='none'
        stroke='currentColor'
        strokeLinejoin='round'
        strokeWidth='2'></path>
      <path
        d='M18.44 2.004A3.56 3.56 0 0 1 22 5.564h0v12.873a3.56 3.56 0 0 1-3.56 3.56H5.568a3.56 3.56 0 0 1-3.56-3.56V5.563a3.56 3.56 0 0 1 3.56-3.56Z'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'></path>
    </svg>
  );
};

export const VoiceIcon = () => {
  return (
    <svg
      aria-label='Voice Clip'
      className='x1lliihq x1n2onr6 x5n08af hover:text-gray-400 cursor-pointer'
      fill='currentColor'
      height='24'
      role='img'
      viewBox='0 0 24 24'
      width='24'>
      <title>Voice Clip</title>
      <path
        d='M19.5 10.671v.897a7.5 7.5 0 0 1-15 0v-.897'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'></path>
      <line
        fill='none'
        stroke='currentColor'
        strokeLinejoin='round'
        strokeWidth='2'
        x1='12'
        x2='12'
        y1='19.068'
        y2='22'></line>
      <line
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        x1='8.706'
        x2='15.104'
        y1='22'
        y2='22'></line>
      <path
        d='M12 15.745a4 4 0 0 1-4-4V6a4 4 0 0 1 8 0v5.745a4 4 0 0 1-4 4Z'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'></path>
    </svg>
  );
};
export const GifIcon = () => {
  return (
    <svg
      aria-label='Choose a GIF or sticker'
      className='x1lliihq x1n2onr6 x5n08af hover:text-gray-400 cursor-pointer'
      fill='currentColor'
      height='24'
      role='img'
      viewBox='0 0 24 24'
      width='24'>
      <title>Choose a GIF or sticker</title>
      <path
        d='M13.11 22H7.416A5.417 5.417 0 0 1 2 16.583V7.417A5.417 5.417 0 0 1 7.417 2h9.166A5.417 5.417 0 0 1 22 7.417v5.836a2.083 2.083 0 0 1-.626 1.488l-6.808 6.664A2.083 2.083 0 0 1 13.11 22Z'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'></path>
      <circle
        cx='8.238'
        cy='9.943'
        r='1.335'></circle>
      <circle
        cx='15.762'
        cy='9.943'
        r='1.335'></circle>
      <path
        d='M15.174 15.23a4.887 4.887 0 0 1-6.937-.301'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'></path>
      <path
        d='M22 10.833v1.629a1.25 1.25 0 0 1-1.25 1.25h-1.79a5.417 5.417 0 0 0-5.417 5.417v1.62a1.25 1.25 0 0 1-1.25 1.25H9.897'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'></path>
    </svg>
  );
};
export const AudioCallIcon = () => {
  return (
    <svg
      aria-label='Audio call'
      className='w-6 h-6 cursor-pointer'
      fill='currentColor'
      role='img'
      viewBox='0 0 24 24'>
      <title>Audio call</title>
      <path d='M18.227 22.912c-4.913 0-9.286-3.627-11.486-5.828C4.486 14.83.731 10.291.921 5.231a3.289 3.289 0 0 1 .908-2.138 17.116 17.116 0 0 1 1.865-1.71 2.307 2.307 0 0 1 3.004.174 13.283 13.283 0 0 1 3.658 5.325 2.551 2.551 0 0 1-.19 1.941l-.455.853a.463.463 0 0 0-.024.387 7.57 7.57 0 0 0 4.077 4.075.455.455 0 0 0 .386-.024l.853-.455a2.548 2.548 0 0 1 1.94-.19 13.278 13.278 0 0 1 5.326 3.658 2.309 2.309 0 0 1 .174 3.003 17.319 17.319 0 0 1-1.71 1.866 3.29 3.29 0 0 1-2.138.91 10.27 10.27 0 0 1-.368.006Zm-13.144-20a.27.27 0 0 0-.167.054A15.121 15.121 0 0 0 3.28 4.47a1.289 1.289 0 0 0-.36.836c-.161 4.301 3.21 8.34 5.235 10.364s6.06 5.403 10.366 5.236a1.284 1.284 0 0 0 .835-.36 15.217 15.217 0 0 0 1.504-1.637.324.324 0 0 0-.047-.41 11.62 11.62 0 0 0-4.457-3.119.545.545 0 0 0-.411.044l-.854.455a2.452 2.452 0 0 1-2.071.116 9.571 9.571 0 0 1-5.189-5.188 2.457 2.457 0 0 1 .115-2.071l.456-.855a.544.544 0 0 0 .043-.41 11.629 11.629 0 0 0-3.118-4.458.36.36 0 0 0-.244-.1Z'></path>
    </svg>
  );
};

export const MoreInfoIcon = () => {
  return (
    <svg
      aria-label='Conversation information'
      className='w-6 h-6 cursor-pointer'
      fill='currentColor'
      role='img'
      viewBox='0 0 24 24'>
      <title>Conversation information</title>
      <circle
        cx='12.001'
        cy='12.005'
        fill='none'
        r='10.5'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'></circle>
      <circle
        cx='11.819'
        cy='7.709'
        r='1.25'></circle>
      <line
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        x1='10.569'
        x2='13.432'
        y1='16.777'
        y2='16.777'></line>
      <polyline
        fill='none'
        points='10.569 11.05 12 11.05 12 16.777'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'></polyline>
    </svg>
  );
};
