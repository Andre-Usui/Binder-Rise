export const footerBox = `
  absolute z-[1000]
  w-full min-h-[10rem]
  bg-main-3
  flex flex-col
  items-center justify-start

  lg:min-h-[5rem]
  lg:grid lg:grid-cols-3

  sm:min-h-[5rem]
  sm:grid sm:grid-cols-2
`;

export const footerTitle = `
  font-[Playwrite_CU,cursive]
  text-main-4
  mt-[1rem]

  lg:m-0 lg:p-0
  lg:text-center lg:text-[2rem]
  lg:col-[2] lg:row-[1/3]

  sm:mt-[.3rem]
  sm:pl-[.5rem]
  sm:text-[1.5rem]
`;

export const footerRights = `
  text-main
  text-[0.9rem]
  mb-[1rem]
  text-center

  lg:text-[1rem]
  lg:col-[1] lg:row-[1/3]
  lg:m-0 lg:pl-[2rem]
  lg:text-start

  sm:text-[0.9rem]
  sm:col-[1]
  sm:mb-[1rem]
  sm:pl-[.6rem]
  sm:text-start
`;

export const footerLinkContainer = `
  flex flex-row gap-[2rem]

  lg:mt-[3rem] lg:mr-[4rem]
  lg:flex-col lg:items-end
  lg:gap-[.3rem]
  lg:text-[1rem]
  lg:col-[3] lg:row-[1]
  lg:text-end

  sm:mt-[1rem] sm:mr-[2rem]
  sm:flex-col
  sm:gap-[.3rem]
  sm:text-[.6rem]
  sm:col-[2] sm:row-[1]
  sm:text-end
`;

export const footerLink = `
  no-underline
`;

export const footerVersion = `
  text-main
  text-[.7rem]
  self-end
  mr-[2rem] mb-[2rem]

  lg:col-[3]
  lg:text-[.8rem]
  lg:mr-[4rem] lg:mb-[1rem]
  lg:text-end

  sm:col-[2]
  sm:text-[.5rem]
  sm:mr-[2rem] sm:mb-[1rem]
  sm:text-end
`;
