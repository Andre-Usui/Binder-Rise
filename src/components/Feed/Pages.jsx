import React from 'react';
import Button from '../Button';
import { pagesContainer, pageButton } from "./feedTailwind";

export default function Pages({ pages, handleSetPage, handleNewPageForm }) {

  const sortedPages = pages.sort((a, b) => a.num - b.num);

  return (
    <>
      <div className={pagesContainer}>
        {sortedPages.map((item) => ( 
          <React.Fragment key={item.num}>
            <button className={pageButton} onClick={(e) => handleSetPage(e.target.value)} value={item.num}>
              {item.name}
            </button>
          </React.Fragment>
        ))}
      
          <Button
            buttonClick={handleNewPageForm}
            buttonClass={pageButton}
            style={{ backgroundColor: '#FF4C4C', color: "#F3FEB8" }}
            buttonName="New Page"
          />
    
      </div>
    </>
  )
}