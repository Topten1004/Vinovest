export const uppercaseWordsInString = (str: string): string => {
    const words = str.split(" ");
    return words.map((s) => capitalizeWord(s)).join(" ");
};

export const capitalizeWord = (str: string = ""): string => str.charAt(0).toUpperCase() + str.slice(1);
