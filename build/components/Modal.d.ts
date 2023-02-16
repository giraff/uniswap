declare type TokenListType = {
    name: string;
    id: string;
    usd: number;
};
declare const Modal: ({ openModal, setOpenModal, isType, setDefaultBeforeSwap, setDefaultAfterSwap, }: {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
    isType: string;
    setDefaultBeforeSwap: (before: TokenListType) => void;
    setDefaultAfterSwap: (after: TokenListType) => void;
}) => JSX.Element;
export default Modal;
