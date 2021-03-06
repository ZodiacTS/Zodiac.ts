import { EvolveClient, EVENTS, Payload } from "../../..";
import { ChannelEvents } from "../../Events/ChannelEvents";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		(async () => {
			const o = await client.rest.getChannel(payload.d.id);
			client.emit(EVENTS.CHANNEL_CREATE, new ChannelEvents(client, o, shard));
		})();
	}
}
