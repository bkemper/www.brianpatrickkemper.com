const isSSR = (): boolean => typeof window === 'undefined';
export default isSSR;
