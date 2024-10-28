const addMinutes = (date: Date, minutes: number): string => {
    const finalDate = new Date(date.getTime() + minutes * 60000).toISOString();
    return finalDate
  };

  export {addMinutes}