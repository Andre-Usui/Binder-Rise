// ───────────────────────────────
// Tabs Container
// ───────────────────────────────

export const tabsContainer = `
  h-20 max-w-full
  flex flex-nowrap items-end
  pl-28
  overflow-x-auto
  z-3
  lg:overflow-y-hidden
`;

export const tabBtnOuterSettings = `
  h-16 w-16
  bg-main-4
  flex items-center justify-center
  absolute left-0
  px-[0.3rem] pr-[0.2rem]
  z-5
  [clip-path:polygon(0%_100%,0%_0%,60%_0%,78%_9%,84%_15%,94%_31%,96%_51%,98%_76%,100%_100%)]
`;

export const tabBtnSettings = `
  h-10 w-10
  bg-[url(/options-icon.svg)]
  bg-cover bg-center
  rounded-full
  border-none
  cursor-pointer
  text-main-3
`;

export const tabBtnOuterAddFolder = `
  h-16 w-16
  bg-main-4
  flex items-end
  ml-[-8]
  px-2 py-[0.2rem]
  whitespace-nowrap
  [clip-path:polygon(0%_100%,2%_76%,4%_51%,6%_37%,10%_25%,15%_20%,45%_20%,50%_18%,52%_15%,54%_5%,56%_0%,90%_0%,91%_2%,93%_5%,94%_10%,98%_86%,100%_100%)]
`;

export const tabBtnAddFolder = `
  h-12 w-12
  px-2
  bg-[url(/folder-icon.svg)]
  bg-main-3 bg-center
  border-none
  cursor-pointer
  font-bold
  font-main-font-1
  text-[1.7rem]
  font-bold
  [clip-path:polygon(0%_100%,2%_76%,4%_51%,6%_37%,10%_25%,15%_20%,55%_20%,60%_18%,62%_15%,64%_5%,66%_0%,90%_0%,91%_2%,93%_5%,94%_10%,98%_86%,100%_100%)]
`;

export const tabBtnOuterAddDis = `
  h-16 w-16
  bg-main-4
  flex items-end
  justify-self-end
  -ml-4 mr-20  
  px-2 
  [clip-path:polygon(0%_100%,4%_76%,8%_51%,16%_25%,32%_13%,40%_10%,60%_10%,68%_13%,84%_25%,92%_51%,96%_76%,100%_100%)]    
`;

export const tabBtnAddDis = `
  h-14 w-12
  px-4
  bg-main-3
  border-none
  cursor-pointer
  font-bold
  font-main-font-1
  text-[1.7rem]
  [clip-path:polygon(0%_100%,4%_76%,8%_51%,16%_25%,32%_13%,40%_10%,60%_10%,68%_13%,84%_25%,92%_51%,96%_76%,100%_100%)]
`;

// ───────────────────────────────
// Tabs Disciplines Buttons
// ───────────────────────────────

export const tabDisContainer = `
  flex flex-row-reverse items-center
  relative h-4
  right-[1.1rem] top-[0.2rem]
  gap-[0.2rem]
  overflow-visible 
`;

export const tabDisBtnDelete = `
  h-[1.3rem] w-[1.3rem]
  bg-[url(/trash-icon.svg)]
  bg-cover bg-center
  border-none
  cursor-pointer
  lg:h-[1.5rem] lg:w-[1.5rem]
`;

export const tabDisBtnEdit = `
  h-[1.3rem] w-[1.3rem]
  bg-[url(/edit-icon.svg)]
  bg-cover bg-center
  border-none
  cursor-pointer
  lg:h-[1.5rem] lg:w-[1.5rem]
`;

export const tabDisOuterBtn = `
  h-12 min-w-[3.3rem]
  bg-main-4
  flex items-end
  ml-4
  px-[0.3rem]
  whitespace-nowrap
  [clip-path:polygon(0%_100%,2%_76%,4%_51%,6%_30%,10%_10%,15%_0%,85%_0,90%_10%,94%_30%,96%_51%,98%_76%,100%_100%)]
`;

export const tabDisBtn = `
  h-10 min-w-[3rem]
  px-[3rem] pr-[4rem]
  bg-main-3
  border-none
  cursor-pointer
  font-bold
  font-main-1
  text-[1.3rem]
  [clip-path:polygon(0%_100%,2%_76%,4%_51%,6%_30%,10%_10%,15%_0%,85%_0,90%_10%,94%_30%,96%_51%,98%_76%,100%_100%)]
`;

export const option = "text-center p-2 hover:bg-main-4 hover:text-main-2 cursor-pointer";
