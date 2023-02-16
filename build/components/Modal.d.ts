declare type TokenListType = {
    name: string;
    id: string;
    usd: number;
};
declare const Modal: ({ openModal, setOpenModal, isType, defaultBeforeSwap, defaultAfterSwap, setDefaultBeforeSwap, setDefaultAfterSwap, }: {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
    isType: string;
    defaultBeforeSwap: TokenListType;
    defaultAfterSwap: TokenListType;
    setDefaultBeforeSwap: (before: TokenListType) => void;
    setDefaultAfterSwap: (after: TokenListType) => void;
}) => JSX.Element;
export default Modal;
