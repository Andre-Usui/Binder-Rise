// feedClasses.js

// ─────────────────────────────
// Feed base
// ─────────────────────────────

export const feedBox = `
  h-full w-full
  relative box-border
  flex flex-col items-center justify-evenly
  gap-0
  bg-main-2
`;

// ─────────────────────────────
// Page top
// ─────────────────────────────

export const pageTop = `
  flex flex-col 
  items-center justify-center
  w-full
  gap-4
  mt-4
`;

export const pageTopDisTitle = `
  my-2 p-0
  w-auto
  text-center
  text-6xl
  font-bold
  overflow-hidden whitespace-nowrap 
  text-ellipsis
`;

export const pageTopPageTitle = `
  my-2 p-0
  w-auto
  text-center
  text-2xl
  overflow-hidden whitespace-nowrap 
  text-ellipsis
`;
// ─────────────────────────────
// Page subtitle / actions
// ─────────────────────────────

export const pageBox = `
  flex w-auto
  items-center justify-end
  gap-4
  overflow-hidden
  lg:w-full lg:justify-center
  sm:justify-center
`;

export const pageBoxTitle = `
  m-0 p-0
  text-center
  text-[2.5rem]
  overflow-hidden whitespace-nowrap text-ellipsis
  lg:text-[1.5rem]
  sm:text-[1.5rem]
`;

export const pageIconBtn = `
  h-[1.3rem] w-[1.3rem]
  bg-center bg-cover bg-no-repeat
  border-none cursor-pointer
`;

// ─────────────────────────────
// Page container
// ─────────────────────────────

export const pageContainer = `
  w-full
  flex flex-col items-center justify-evenly
`;

// ─────────────────────────────
// Posts list
// ─────────────────────────────

export const postItemUl = `
  w-1/5
  m-0 p-0
  flex flex-col items-center
  lg:w-full lg:px-4
  sm:w-full sm:px-4
`;

export const postItemLi = `
  w-4/5 h-full
  mb-8
  py-8 px-8
  list-none
  bg-main-1
  rounded-[10px]
  flex flex-col justify-start
  
`;

export const postItemTitle = `
  w-full
  mb-0 pb-0
  text-[2.5rem]
`;

export const postItemReference = `
  mt-2
  text-sm
  list-none
`;

export const postItemContent = `
  w-full
  p-8
  whitespace-pre-wrap
  tracking-[0.07rem]
`;

export const postItemDate = `
  text-[0.8rem]
`;

// ─────────────────────────────
// Post buttons
// ─────────────────────────────

export const postItemBtnBox = `
  flex flex-row-reverse
  mt-8
`;

export const postItemBtn = `
  min-w-[5rem] w-[9rem]
  m-[1rem_1rem_1rem_0]
  p-[0.5rem]
  bg-main-4 text-main-1
  border-[0.25rem] border-main-2
  rounded-[13px]
  text-[0.9rem]
  cursor-pointer
  lg:w-[15rem] lg:m-[0.3rem]
  sm:m-[0.3rem] sm:text-[0.8rem]
`;

export const newPostBox= `
  w-9/10 h-full mb-12
`

// ─────────────────────────────
// Pagination
// ─────────────────────────────

export const pagesContainer = `
  w-full
  flex flex-wrap items-center justify-center
  gap-4 mt-4 mb-8
`;

export const pageButton = `
  min-w-[5rem] h-[2.1rem]
  px-4 py-0
  text-lg bg-main-1
  border-2 border-main-4
  rounded-sm
  cursor-pointer
  overflow-hidden whitespace-nowrap 
  text-ellipsis
`;

export const editPageBtn = `
  h-8 w-8 
  `;

// ─────────────────────────────
// Icon Buttons
// ─────────────────────────────

export const pageIconBtnBase = `
  h-6 w-6
  bg-center bg-cover bg-no-repeat
  bg-[url(/edit-icon.svg)] border-none
  cursor-pointer
`;