export const getSavedChoreIds = () => {
    const savedChoreIds = localStorage.getItem('saved_chores')
      ? JSON.parse(localStorage.getItem('saved_chores'))
      : [];
  
    return savedChoreIds;
  };
  
  export const saveChoreIds = (choreIdArr) => {
    if (choreIdArr.length) {
      localStorage.setItem('saved_chores', JSON.stringify(choreIdArr));
    } else {
      localStorage.removeItem('saved_chores');
    }
  };
  
  export const removeChoreId = (choreId) => {
    const savedChoreIds = localStorage.getItem('saved_chores')
      ? JSON.parse(localStorage.getItem('saved_chores'))
      : null;
  
    if (!savedChoreIds) {
      return false;
    }
  
    const updatedSavedChoreIds = savedChoreIds?.filter((savedChoreId) => savedChoreId !== choreId);
    localStorage.setItem('saved_chores', JSON.stringify(updatedSavedChoreIds));
  
    return true;
  };
  