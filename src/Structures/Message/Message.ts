/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-mixed-spaces-and-tabs */

import { User, GuildMember, Guild, IMessage } from "../..";
import { TextChannel } from "../Channel/TextChannel";
import { EvolveClient } from "../../Client/EvolveClient";

export class Message {
  public sentAt!: string;
  public id!: string;
  public pinned!: boolean;
  public mentions: User[] = [];
  public rolementions?: Array<string>;
  public mentionEveryone!: boolean;
  public member!: GuildMember | undefined;
  public author!: User;
  public editedTimestamp!: number | null;
  public attachments!: Array<string>;
  public content!: string;
  public guild!: Guild;
  public channel!: TextChannel;
  public delete!: (time: number) => Promise<NodeJS.Timeout>;

  constructor(public data: IMessage, private client: EvolveClient, channel: TextChannel, guild?: Guild) {
  	if (!this.data) return;
  	if (this.data.mentions)
  		for (const it of this.data.mentions) {
  			this.mentions.push(new User(it));
  		}
  	this.channel = channel;
  	if (guild)
  		this.guild = guild;
  	if (this.data.guild_id) this.client.rest.getGuild(this.data.guild_id);
  	this.sentAt = this.data.sent_at;
  	this.id = this.data.id;
  	this.pinned = this.data.pinned;
  	this.rolementions = this.data.mention_roles;
  	this.mentionEveryone = this.data.mention_everyone;
  	if (this.data.member) this.member = new GuildMember(this.data.member);
  	this.author = new User(this.data.author);
  	if (this.member) this.member.user = this.author;
  	this.editedTimestamp = this.data.edited_timestamp;
  	this.attachments = this.data.attachments;
  	this.content = this.data.content;
	
  	this.delete = (time = 0) => {
  		return this.client.rest.deleteMessage(this.id, this.channel.id, time);
  	};
  	return this;
  }

  static async handle(data: IMessage, client: EvolveClient): Promise<Message> {
	  let message: Message;
		  let guild: Guild;
		  const channel: TextChannel = await client.rest.getChannel(data.channel_id) as TextChannel;
		  if(data.guild_id) {
			  guild = await client.rest.getGuild(data.guild_id);
			  message = new Message(data, client, channel, guild);
		  } else message = new Message(data, client, channel);
	  return message;
  }
  	
}
