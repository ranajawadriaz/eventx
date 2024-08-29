// types.ts
export interface Chat {
    id: string;
    name: string;
    lastMessage: string;
    time: string;
    messages?: string[]; // Add messages property
}
