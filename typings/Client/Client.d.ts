/// <reference types="node" />
import { EventEmitter } from "events";
import { ClientMember } from "..";
export declare class Client extends EventEmitter {
    private ws;
    token: string;
    private _member;
    init(token: string): Promise<void>;
    set member(member: ClientMember);
    get member(): ClientMember;
    getGuild(guild: string): Promise<void>;
    sendMessage(content: any, channelID: any, tts?: boolean): Promise<void>;
}