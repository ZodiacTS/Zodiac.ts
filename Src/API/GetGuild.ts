import fetch from "node-fetch"
import { Client } from ".."

export async function GetGuild(client: Client, guildID: string) {
let API = "https://discord.com/api/v6"


let fetched = await fetch(`${API}/guilds/${guildID}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bot ${client.token}`
    },
})

console.log(await fetched.json())
}