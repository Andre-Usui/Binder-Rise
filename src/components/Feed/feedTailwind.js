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
  flex w-[95%]
  items-baseline justify-center
  gap-[1rem]
  mt-[1rem]
  lg:flex-col lg:items-center lg:justify-center lg:m-0 lg:px-[2rem]
  sm:flex-col sm:items-center sm:justify-center sm:m-0 sm:px-[2rem]
`;

export const pageTopTitle = `
  m-0 p-0
  w-auto
  text-center
  text-[5rem]
  overflow-hidden whitespace-nowrap text-ellipsis
  lg:w-full lg:text-[2rem]
  sm:text-[2rem]
`;

// ─────────────────────────────
// Page subtitle / actions
// ─────────────────────────────

export const pageBox = `
  flex w-auto
  items-center justify-end
  gap-[1rem]
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
  w-[80%]
  m-0 p-0
  flex flex-col items-center
  lg:w-full lg:px-[1rem]
  sm:w-full sm:px-[1rem]
`;

export const postItemLi = `
  w-full h-full
  mb-[2rem]
  px-[3rem] pb-[1rem]
  list-none
  bg-main-1
  rounded-[10px]
  flex flex-col justify-start
  lg:w-[94%] lg:m-[0_2rem_2rem_2rem] lg:p-[1rem]
  sm:w-full sm:p-[1rem]
`;

export const postItemTitle = `
  w-[90%]
  mb-0 pb-0
  text-[2.5rem]
  lg:text-[1.8rem]
  sm:text-[1.8rem]
`;

export const postItemReference = `
  m-[0.5rem_0_0_0]
  text-[0.9rem]
  list-none
`;

export const postItemContent = `
  w-[90%]
  m-[2rem_0_2rem_2rem]
  whitespace-pre-wrap
  tracking-[0.07rem]
  lg:m-[2rem_0] lg:text-[1rem]
  sm:m-[2rem_0] sm:text-[1rem]
`;

export const postItemDate = `
  text-[0.8rem]
`;

// ─────────────────────────────
// Post buttons
// ─────────────────────────────

export const postItemBtnBox = `
  flex flex-row-reverse
  mt-[2rem]
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
  w-[80vw]
  flex flex-wrap items-center justify-center
  m-[1rem]
`;

export const pageButton = `
  min-w-[5rem] h-[2.1rem]
  px-[1rem]
  text-[1rem]
  bg-main-1
  border-[0.1rem] border-main-4
  rounded-[5px]
  cursor-pointer
  overflow-hidden whitespace-nowrap text-ellipsis
  lg:text-[0.9rem] lg:p-[0.5rem]
  sm:text-[0.8rem] sm:p-[0.3rem]
`;

export const editPageBtn = `
  h-[2rem] w-[2rem] 
  `;

// ─────────────────────────────
// Forms
// ─────────────────────────────

export const formPost = `
  w-[90%] mx-auto
  bg-main-3
  border-[0.3rem] border-main-4
  p-[3rem_2rem]
  rounded-[10px]
  lg:w-[95%] lg:p-[1rem_0.5rem]
  sm:w-[95%] sm:p-[1rem_0.5rem]
`;

export const formPostLabel = `
  my-[1rem]
  text-[1.3rem]
  lg:text-[1.1rem]
  sm:text-[1rem]
`;

export const formPostInput = `
  w-[90%] h-[3vh]
  my-[1rem]
  p-[1rem_0_1rem_0.3rem]
  bg-color-2
  rounded-[5px]
  border-[0.1rem] border-main-4
  text-[1rem]
  transition-all
  focus:outline-none focus:border-[0.2rem]
  lg:w-[95%]
  sm:w-full sm:text-[0.7rem] sm:my-[0.3rem]
`;

export const formPostText = `
  w-[90%] h-[50vh]
  my-[1rem]
  resize-y
  bg-color-2
  rounded-[5px]
  border-[0.1rem] border-main-4
  text-[1rem]
  whitespace-pre-wrap
  transition-all
  focus:outline-none focus:border-[0.2rem]
  lg:h-[30vh] lg:w-[95%]
  sm:h-[30vh] sm:w-full sm:text-[0.7rem] sm:my-[0.3rem]
`;

export const formPostBoxBtn = `
  w-[90%]
  flex flex-row-reverse
  ml-[2rem]
`;

export const formPostBtn = `
  h-[2rem] w-[5rem]
  p-[0.3rem]
  bg-main-1
  border-[0.2rem] border-main-4
  rounded-[6px]
  cursor-pointer
`;

// ─────────────────────────────
// Add page form
// ─────────────────────────────

export const addPageForm = `
  w-[80vw] h-full
  bg-main-1
  p-[2rem]
  my-[1rem_0_3rem_0]
  rounded-[10px]
  flex flex-col items-center justify-evenly
  gap-0
  lg:p-[1rem] lg:justify-center
`;


// ─────────────────────────────
// Icon Buttons
// ─────────────────────────────

export const pageIconBtnBase = `
  h-[1.3rem] w-[1.3rem]
  bg-center bg-cover bg-no-repeat
  border-none
  cursor-pointer
`;