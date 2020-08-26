// https://gist.github.com/martinbean/2bf88c446be8048814cf02b2641ba276
export default (seconds: number): string => {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
};
